// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
const text = {
  name: 'CO2estimeter',
  resultsTab: {
    co2e: (
      <span>
        CO<sub>2</sub>e in g
      </span>
    ),
    comparisons: (co2eTotalGrams: number) => {
      return (
        <span>
          {`${co2eTotalGrams}`} gCO<sub>2</sub>e are roughly equivalent to
          emissions from
        </span>
      );
    },
    energy: 'Energy in kWh',
    fallbackActive: (
      <span>
        No data available yet.
        <br />
        Start browsing to see results.
      </span>
    ),
    fallbackNeverStarted: (
      <span>
        No data available yet.
        <br />
        Press the Play button to start monitoring.
      </span>
    ),
    time: 'Duration',
    transferSize: 'MB',
  },
  configurationTab: {
    dataCenter: 'Data Center',
    device: 'User Device',
    greenHostingFactor: 'Green hosting percentage',
    gridIntensities: (
      <span>
        Grid intensity (gCO<sub>2</sub>e/kWh) for segment
      </span>
    ),
    inputDefault: 'Grid intensity or country',
    network: 'Network',
    pieChartCutoff: (cutoff: number) => `Show top ${cutoff} domains`,
    title: (
      <span>
        Configuration options for CO<sub>2</sub>e estimation
      </span>
    ),
    validationError: 'Enter a number, like 531.2, or select a country',
  },
  tooltips: {
    co2e: (
      <span>
        Estimated CO<sub>2</sub>e in grams that accumulated during monitored
        browsing activity. For more details check the "Methodology" tab.
      </span>
    ),
    comparisonBananas:
      'Bananas for scale: here we use Ecudorian bananas consumed in Spain.',
    comparisonChocolate: 'Chocolate',
    comparisonCoffee:
      'Number of Espressos with an equivalent carbon footprint (Vietnamese and Brazilian coffee exported to Great Britain).',
    comparisonDistance:
      'Distance a single passenger can travel by plane. Based on numbers from the IEA.',
    energy: 'Estimated energy consumption of the monitored browsing activity',
    greenHostingFactor:
      'Assumed percentage of renewable or zero-carbon energy used by data centers.',
    gridIntensities: (
      <span>
        The grid intensity is the amount of CO<sub>2</sub>e emitted per kWh of
        electricity produced. It can be configured for the different segments of
        the SWD v4 model. If no value is provided, the model's default for the
        global grid intensity is used (494 g/kWh). Grid intensities shown, are
        from the co2.js library.
      </span>
    ),
    pauseMonitoring: 'Pause monitoring',
    pieChartCutoff: (
      <span>
        Set a cutoff value for the pie chart. All domains below the cutoff are
        categorized into "other". Sorted by CO<sub>2</sub>e
      </span>
    ),
    resetData: 'Reset. Deletes all collected browsing data.',
    startMonitoring: 'Start monitoring',
    transferSize: (
      <span>
        Data downloaded in MB (10<sup>6</sup> bytes) during the monitored
        browsing activity
      </span>
    ),
  },
};

export default text;
