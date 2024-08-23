// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Browser from 'webextension-polyfill';

import {
  RE_FETCH_INTERVAL,
  STORAGE_KEYS,
} from '../../../../constants/constants';
import text from '../../../text/text';
import { GridIntensityInput } from '../ConfigurationTab/SegmentGridIntensityConfig';
import { CO2EmissionsPieChart } from './CO2EmissionsPieChart';
import { ResultItem } from './ResultItem';
import {
  ComparisonBananas,
  ComparisonCoffee,
  ComparisonDistance,
  PieChartDatum,
  processDomainStats,
  roundNumber,
} from './resultsComputation';

type GridIntensityArg = number | { value: string };

export type CO2jsOptions = {
  greenHostingFactor: number;
  gridIntensities: {
    device: GridIntensityArg | null;
    dataCenter: GridIntensityArg | null;
    network: GridIntensityArg | null;
  };
};

interface ResultsTabProps {
  greenHostingFactor: number;
  deviceGridIntensity: GridIntensityInput | null;
  dataCenterGridIntensity: GridIntensityInput | null;
  networkGridIntensity: GridIntensityInput | null;
  reset: boolean;
  setReset: (value: boolean) => void;
  monitoringActive: boolean | null;
}

const initialBananas: ComparisonBananas = { bananas: 0 };
// const initialChocolate: ComparisonChocolate = {
//   'bars-of-chocolate/dark': 0,
//   'bars-of-chocolate/milk': 0,
//   'bars-of-chocolate/white': 0,
// }
const initialCoffee: ComparisonCoffee = {
  'cups-of-coffee/espresso': 0,
  'cups-of-coffee/flat-white': 0,
  'cups-of-coffee/cappuccino': 0,
  'cups-of-coffee/latte': 0,
};
const initialDistance: ComparisonDistance = {
  'distance/air': 0,
  'distance/rail': 0,
  'distance/bus': 0,
  'distance/large-car': 0,
  'distance/medium-car': 0,
  'distance/motorcycle': 0,
};

export function ResultsTab({
  greenHostingFactor,
  deviceGridIntensity,
  dataCenterGridIntensity,
  networkGridIntensity,
  reset,
  setReset,
  monitoringActive,
}: ResultsTabProps) {
  const [pieChartData, setPieChartData] = useState<Array<PieChartDatum>>([]);
  const [transferSizeTotalMB, setTransferSizeTotalMB] = useState(0);
  const [co2eTotalGrams, setCo2eTotalgrams] = useState(0);
  const [totalEnergykWh, setTotalEnergykWh] = useState(0);
  const [comparisonBananas, setComparisonBananas] = useState(initialBananas);
  // const [comparisonChocolate, setComparisonChocolate] =
  //   useState(initialChocolate);
  const [comparisonCoffee, setComparisonCoffee] = useState(initialCoffee);
  const [comparisonDistance, setComparisonDistance] = useState(initialDistance);

  useEffect(() => {
    const fetchAndProcessData = async () => {
      const domainStats = (
        await Browser.storage.local.get(STORAGE_KEYS.DOMAIN_STATS)
      )[STORAGE_KEYS.DOMAIN_STATS];
      if (domainStats === undefined) {
        return;
      }

      const co2jsOptions: CO2jsOptions = {
        greenHostingFactor: greenHostingFactor,
        gridIntensities: {
          device: convertToGridIntensityArg(deviceGridIntensity),
          dataCenter: convertToGridIntensityArg(dataCenterGridIntensity),
          network: convertToGridIntensityArg(networkGridIntensity),
        },
      };

      const {
        pieChartData,
        transferSizeTotalMB,
        totalEnergykWh,
        co2eTotalGrams,
        comparisonBananas,
        // comparisonChocolate,
        comparisonCoffee,
        comparisonDistance,
      } = await processDomainStats(domainStats, co2jsOptions);
      setPieChartData(pieChartData);
      setTransferSizeTotalMB(transferSizeTotalMB);
      setTotalEnergykWh(totalEnergykWh);
      setCo2eTotalgrams(co2eTotalGrams);
      setComparisonBananas(comparisonBananas);
      // setComparisonChocolate(comparisonChocolate);
      setComparisonCoffee(comparisonCoffee);
      setComparisonDistance(comparisonDistance);
    };

    const resetData = () => {
      setPieChartData([]);
      setTransferSizeTotalMB(0);
      setTotalEnergykWh(0);
      setCo2eTotalgrams(0);
      setComparisonBananas(initialBananas);
      // setComparisonChocolate(initialChocolate);
      setComparisonCoffee(initialCoffee);
      setComparisonDistance(initialDistance);
      // setting reset to false does not trigger an immediate re-computation
      //  because domainStats is undefined at this point
      setReset(false);
    };

    reset === true ? resetData() : fetchAndProcessData();
    const interval = setInterval(() => {
      fetchAndProcessData();
    }, RE_FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, [
    reset,
    greenHostingFactor,
    deviceGridIntensity,
    dataCenterGridIntensity,
    networkGridIntensity,
  ]);

  return (
    <>
      <Paper elevation={0}>
        <Grid container spacing={0}>
          <ResultItem
            xsBreakpoint={4}
            tooltip={text.tooltips.transferSize}
            elevation={0}
            value={transferSizeTotalMB}
            description={text.resultsTab.transferSize}
          />
          <ResultItem
            xsBreakpoint={4}
            tooltip={text.tooltips.energy}
            elevation={0}
            value={totalEnergykWh}
            description={text.resultsTab.energy}
          />
          <ResultItem
            xsBreakpoint={4}
            tooltip={text.tooltips.co2e}
            elevation={0}
            value={co2eTotalGrams}
            description={text.resultsTab.co2e}
          />
        </Grid>
      </Paper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: 260,
        }}
      >
        {/*
          parent of reponsive PieChart needs to have a defined height,
          otherwise height will be zero an no chart is rendered
        */}
        {pieChartData.length === 0 ? (
          <Fallback monitoringActive={monitoringActive} />
        ) : (
          <CO2EmissionsPieChart data={pieChartData} />
        )}
      </Box>
      <Paper elevation={0}>
        <Typography variant="body2" sx={{ paddingLeft: 2, marginBottom: 0.5 }}>
          {text.resultsTab.comparisons(co2eTotalGrams)}
        </Typography>
        <Grid container spacing={0}>
          <ResultItem
            xsBreakpoint={4}
            tooltip={text.tooltips.comparisonBananas}
            elevation={0}
            value={roundNumber(comparisonBananas.bananas, 3)}
            description="Bananas"
          />
          <ResultItem
            xsBreakpoint={4}
            tooltip={text.tooltips.comparisonCoffee}
            elevation={0}
            value={roundNumber(comparisonCoffee['cups-of-coffee/espresso'], 3)}
            description="Espressos"
          />
          <ResultItem
            xsBreakpoint={4}
            tooltip={text.tooltips.comparisonDistance}
            elevation={0}
            value={roundNumber(comparisonDistance['distance/air'], 3)}
            description="km by Plane"
          />
        </Grid>
      </Paper>
    </>
  );
}

function Fallback({ monitoringActive }: { monitoringActive: boolean | null }) {
  return monitoringActive ? (
    <Typography variant="body1" align="center" color="text.secondary">
      {text.resultsTab.fallbackActive}
    </Typography>
  ) : (
    <Typography variant="body1" align="center" color="text.secondary">
      {text.resultsTab.fallbackNeverStarted}
    </Typography>
  );
}

function convertToGridIntensityArg(
  gridIntensity: GridIntensityInput | null,
): GridIntensityArg | null {
  if (typeof gridIntensity === 'number') {
    return gridIntensity;
  }
  if (gridIntensity && typeof gridIntensity === 'object') {
    return { value: gridIntensity.alpha3 };
  }
  return null;
}
