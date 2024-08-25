// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import Browser from 'webextension-polyfill';

import { STORAGE_KEYS } from '../../constants/constants';
import Background from '../Components/Background';
import { MainPanel } from '../Components/MainPanel';
import { GridIntensityInput } from '../Components/Tabs/ConfigurationTab/SegmentGridIntensityConfig';
import TopBar from '../Components/TopBar';

export function Popup() {
  const width = 500;
  const height = 580;
  const [monitoringActive, setMonitoringActive] = useState<boolean | null>(
    null,
  );
  const [reset, setReset] = useState(false);
  const [configPieChartCutoff, setConfigPieChartCutoff] = useState(10);
  const [configGreenHostingInitialized, setConfigGreenHostingInitialized] =
    useState(false);
  const [
    configGridIntensitiesInitialized,
    setConfigGridIntensitiesInitialized,
  ] = useState(false);
  const [configGreenHostingFactor, setConfigGreenHostingFactor] = useState(0);
  const [configDeviceGridIntensity, setConfigDeviceGridIntensity] =
    useState<GridIntensityInput | null>(null);
  const [configDataCenterGridIntensity, setConfigDataCenterGridIntensity] =
    useState<GridIntensityInput | null>(null);
  const [configNetworkGridIntensity, setConfigNetworkGridIntensity] =
    useState<GridIntensityInput | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);

  useEffect(() => {
    (async () => {
      // intializing monitoring active state
      if (monitoringActive === null) {
        const monitoringActiveData = await Browser.storage.local.get(
          STORAGE_KEYS.MONITORING_ACTIVE,
        );
        if (
          monitoringActiveData[STORAGE_KEYS.MONITORING_ACTIVE] !== null &&
          monitoringActiveData[STORAGE_KEYS.MONITORING_ACTIVE] !== undefined
        ) {
          setMonitoringActive(
            monitoringActiveData[STORAGE_KEYS.MONITORING_ACTIVE],
          );
        } else {
          setMonitoringActive(false);
        }
      } else {
        await Browser.storage.local.set({
          [STORAGE_KEYS.MONITORING_ACTIVE]: monitoringActive,
        });
        // Content scripts are listening to changes of MONITORING_ACTIVE key. No need to send them anything.
      }
    })();
  }, [monitoringActive, setMonitoringActive]);

  useEffect(() => {
    (async () => {
      if (configGreenHostingInitialized) {
        await Browser.storage.local.set({
          [STORAGE_KEYS.GREEN_HOSTING_FACTOR]: configGreenHostingFactor,
        });
      } else {
        const greenHostingObject = await Browser.storage.local.get(
          STORAGE_KEYS.GREEN_HOSTING_FACTOR,
        );
        setConfigGreenHostingFactor(
          greenHostingObject[STORAGE_KEYS.GREEN_HOSTING_FACTOR] ?? 0,
        );
        setConfigGreenHostingInitialized(true);
      }
    })();
  }, [
    configGreenHostingFactor,
    setConfigGreenHostingFactor,
    configGreenHostingInitialized,
    setConfigGreenHostingInitialized,
  ]);

  useEffect(() => {
    (async () => {
      if (configGridIntensitiesInitialized) {
        await Browser.storage.local.set({
          [STORAGE_KEYS.GRID_INTENSITIES]: {
            device: configDeviceGridIntensity,
            dataCenter: configDataCenterGridIntensity,
            network: configNetworkGridIntensity,
          },
        });
      } else {
        const gridIntensities = (
          await Browser.storage.local.get(STORAGE_KEYS.GRID_INTENSITIES)
        )[STORAGE_KEYS.GRID_INTENSITIES];
        setConfigDeviceGridIntensity(
          (gridIntensities && gridIntensities['device']) ?? null,
        );
        setConfigDataCenterGridIntensity(
          (gridIntensities && gridIntensities['dataCenter']) ?? null,
        );
        setConfigNetworkGridIntensity(
          (gridIntensities && gridIntensities['network']) ?? null,
        );
        setConfigGridIntensitiesInitialized(true);
      }
    })();
  }, [
    configDeviceGridIntensity,
    setConfigDeviceGridIntensity,
    configDataCenterGridIntensity,
    setConfigDataCenterGridIntensity,
    configNetworkGridIntensity,
    setConfigNetworkGridIntensity,
    configGridIntensitiesInitialized,
    setConfigGridIntensitiesInitialized,
  ]);

  return (
    <>
      <div className="container">
        <Background
          width={width}
          height={height}
          on={monitoringActive ?? false}
        />
        <Box className="content">
          <TopBar
            monitoringActive={monitoringActive ?? false}
            setMonitoringActive={setMonitoringActive}
            setReset={setReset}
          />
          <Paper elevation={2} sx={{ borderRadius: '14px' }}>
            <MainPanel
              monitoringActive={monitoringActive}
              reset={reset}
              setReset={setReset}
              aboutVisible={aboutVisible}
              pieChartCutoff={configPieChartCutoff}
              setPieChartCutoff={setConfigPieChartCutoff}
              configGreenHostingFactor={configGreenHostingFactor}
              setConfigGreenHostingFactor={setConfigGreenHostingFactor}
              configDeviceGridIntensity={configDeviceGridIntensity}
              setConfigDeviceGridIntensity={setConfigDeviceGridIntensity}
              configDataCenterGridIntensity={configDataCenterGridIntensity}
              setConfigDataCenterGridIntensity={
                setConfigDataCenterGridIntensity
              }
              configNetworkGridIntensity={configNetworkGridIntensity}
              setConfigNetworkGridIntensity={setConfigNetworkGridIntensity}
            />
          </Paper>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              color: 'transparent',
              marginRight: '20px',
              marginTop: '5px',
            }}
          >
            <Link
              variant="caption"
              onClick={() => setAboutVisible(!aboutVisible)}
            >
              {aboutVisible ? 'Close' : 'About'}
            </Link>
          </Box>
        </Box>
      </div>
      <style>
        {`
        .container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            width: ${width}px;
            height: ${height}px;
            overflow: hidden;
            }
        .background {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            }
        .content {
            position: relative;
            width: 95%;
            height: 95%;
            margin: 20px;
            z-index: 1;
            }
        `}
      </style>
    </>
  );
}
