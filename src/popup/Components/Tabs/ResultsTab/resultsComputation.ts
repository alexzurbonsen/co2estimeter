// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
// SPDX-FileCopyrightText: co2.js authors (https://github.com/thegreenwebfoundation/co2.js)
//
// SPDX-License-Identifier: Apache-2.0
import { co2 } from '@tgwf/co2';
import { Bananas, Chocolate, Coffee, Distance } from 'grasp';

import { colors } from './colors';
import { CO2jsOptions } from './ResultsTab';

export type PieChartDatumBase = {
  id: string;
  value: number;
};

export type PieChartDatum = PieChartDatumBase & {
  color: string;
};

export type ProcessedStats = {
  pieChartData: Array<PieChartDatum>;
  transferSizeTotalMB: number;
  totalEnergykWh: number;
  co2eTotalGrams: number;
  comparisonBananas: ComparisonBananas;
  comparisonChocolate: ComparisonChocolate;
  comparisonCoffee: ComparisonCoffee;
  comparisonDistance: ComparisonDistance;
};

export type ComparisonBananas = {
  bananas: number;
};

export type ComparisonChocolate = {
  'bars-of-chocolate/dark': number;
  'bars-of-chocolate/milk': number;
  'bars-of-chocolate/white': number;
};

export type ComparisonCoffee = {
  'cups-of-coffee/espresso': number;
  'cups-of-coffee/flat-white': number;
  'cups-of-coffee/cappuccino': number;
  'cups-of-coffee/latte': number;
};

export type ComparisonDistance = {
  'distance/air': number;
  'distance/rail': number;
  'distance/bus': number;
  'distance/large-car': number;
  'distance/medium-car': number;
  'distance/motorcycle': number;
};

// copied from
// https://github.com/thegreenwebfoundation/co2.js/blob/454131905c0684f3192dd776be994204040bc59f/src/constants/index.js#L27
const SWDV4 = {
  OPERATIONAL_KWH_PER_GB_DATACENTER: 0.055,
  OPERATIONAL_KWH_PER_GB_NETWORK: 0.059,
  OPERATIONAL_KWH_PER_GB_DEVICE: 0.08,
  EMBODIED_KWH_PER_GB_DATACENTER: 0.012,
  EMBODIED_KWH_PER_GB_NETWORK: 0.013,
  EMBODIED_KWH_PER_GB_DEVICE: 0.081,
  GLOBAL_GRID_INTENSITY: 494,
};

export async function processDomainStats(
  domainStats: Record<string, Record<string, number>>,
  co2jsOptions: CO2jsOptions,
  pieChartCutoff: number,
): Promise<ProcessedStats> {
  const swd = new co2({ model: 'swd', version: 4, results: 'segment' });

  const pieChartDataUnsorted: Array<PieChartDatumBase> = [];
  let transferSizeTotalBytes = 0;
  for (const [domain, stats] of Object.entries(domainStats)) {
    let co2eDomain = swd.perByteTrace(
      stats['transferSize'],
      undefined,
      co2jsOptions,
    ).co2;
    if (typeof co2eDomain !== 'number') {
      co2eDomain = co2eDomain.total;
    }
    pieChartDataUnsorted.push({
      id: domain,
      value: roundNumber(co2eDomain, 2),
    });
    transferSizeTotalBytes += stats['transferSize'];
  }

  const pieChartData = getSortedDataWithColors(
    pieChartDataUnsorted,
    pieChartCutoff,
  );

  const co2eResult = swd.perByteTrace(
    transferSizeTotalBytes,
    undefined,
    co2jsOptions,
  ).co2;
  if (typeof co2eResult === 'number') {
    throw new Error('co2eResult is not an object');
  }
  const co2eTotalGrams = roundNumber(co2eResult.total, 2);
  const comparisonBananas = (
    await Bananas({}).execute([{ carbon: co2eTotalGrams }])
  )[0] as ComparisonBananas;
  const comparisonChocolate = (
    await Chocolate({}).execute([{ carbon: co2eTotalGrams }])
  )[0] as ComparisonChocolate;
  const comparisonCoffee = (
    await Coffee({}).execute([{ carbon: co2eTotalGrams }])
  )[0] as ComparisonCoffee;
  const comparisonDistance = (
    await Distance({}).execute([{ carbon: co2eTotalGrams }])
  )[0] as ComparisonDistance;

  const energykWhPerSegment = computeEnergyConsumptionPerSegment(
    transferSizeTotalBytes,
  );
  const totalEnergykWh = roundNumber(
    energykWhPerSegment.dataCenter +
      energykWhPerSegment.network +
      energykWhPerSegment.device,
    3,
  );

  const transferSizeTotalMB = roundNumber(
    bytesToMegaBytes(transferSizeTotalBytes),
    2,
  );

  return {
    pieChartData,
    transferSizeTotalMB,
    totalEnergykWh,
    co2eTotalGrams,
    comparisonBananas,
    comparisonChocolate,
    comparisonCoffee,
    comparisonDistance,
  };
}

function getSortedDataWithColors(
  pieChartData: Array<PieChartDatumBase>,
  pieChartCutoff: number,
): Array<PieChartDatum> {
  const sortedData = pieChartData.sort((a, b) => b.value - a.value); // sort in ascending order
  if (sortedData.length > pieChartCutoff) {
    const other = sortedData.slice(pieChartCutoff);
    const otherTotal = other.reduce((acc, cur) => acc + cur.value, 0);
    sortedData.splice(pieChartCutoff);
    sortedData.push({ id: 'other', value: roundNumber(otherTotal, 2) });
  }
  return sortedData.map((datum, idx) => {
    const color = colors[idx];
    return { ...datum, color };
  });
}

type EnergykWhPerSegment = {
  dataCenter: number;
  network: number;
  device: number;
};

// this is not exposed by co2.js, so we need to implement it ourselves
function computeEnergyConsumptionPerSegment(
  transferSizeTotalBytes: number,
): EnergykWhPerSegment {
  const operationalEnergy = computeOperationalEnergyPerSegment(
    transferSizeTotalBytes,
  );
  const embodiedEnergy = computeEmbodiedEnergyPerSegment(
    transferSizeTotalBytes,
  );

  return {
    dataCenter: operationalEnergy.dataCenter + embodiedEnergy.dataCenter,
    network: operationalEnergy.network + embodiedEnergy.network,
    device: operationalEnergy.device + embodiedEnergy.device,
  };
}

// compute energy per segment as in
// https://github.com/thegreenwebfoundation/co2.js/blob/454131905c0684f3192dd776be994204040bc59f/src/sustainable-web-design-v4.js
function computeOperationalEnergyPerSegment(
  bytes: number,
): EnergykWhPerSegment {
  const transferedBytesGB = bytesToGigaBytes(bytes);
  const dataCenter =
    transferedBytesGB * SWDV4.OPERATIONAL_KWH_PER_GB_DATACENTER;
  const network = transferedBytesGB * SWDV4.OPERATIONAL_KWH_PER_GB_NETWORK;
  const device = transferedBytesGB * SWDV4.OPERATIONAL_KWH_PER_GB_DEVICE;

  return {
    dataCenter,
    network,
    device,
  };
}

function computeEmbodiedEnergyPerSegment(bytes: number): EnergykWhPerSegment {
  const transferedBytesGB = bytesToGigaBytes(bytes);
  const dataCenter = transferedBytesGB * SWDV4.EMBODIED_KWH_PER_GB_DATACENTER;
  const network = transferedBytesGB * SWDV4.EMBODIED_KWH_PER_GB_NETWORK;
  const device = transferedBytesGB * SWDV4.EMBODIED_KWH_PER_GB_DEVICE;

  return {
    dataCenter,
    network,
    device,
  };
}

// we are using the metric unit, not the binary here (MB instead of MiB)
function bytesToMegaBytes(bytes: number): number {
  return bytes / 1000 ** 2;
}

function bytesToGigaBytes(bytes: number): number {
  return bytes / 1000 ** 3;
}

// somehow there is no function in Math that can do this out of the box
export function roundNumber(number: number, digits: number): number {
  const multiple = Math.pow(10, digits);
  return Math.round(number * multiple) / multiple;
}
