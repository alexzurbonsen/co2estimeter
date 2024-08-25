import GitHubIcon from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import text from '../text/text';
import { TabPanel } from './TabPanel';
import { ConfigurationTab } from './Tabs/ConfigurationTab/ConfigurationTab';
import { GridIntensityInput } from './Tabs/ConfigurationTab/SegmentGridIntensityConfig';
import { MethodologyTab } from './Tabs/MethodologyTab';
import { ResultsTab } from './Tabs/ResultsTab/ResultsTab';

interface MainPanelProps {
  monitoringActive: boolean | null;
  reset: boolean;
  setReset: (value: boolean) => void;
  aboutVisible: boolean;
  configGreenHostingFactor: number;
  setConfigGreenHostingFactor: (value: number) => void;
  configDeviceGridIntensity: GridIntensityInput | null;
  setConfigDeviceGridIntensity: (value: GridIntensityInput | null) => void;
  configDataCenterGridIntensity: GridIntensityInput | null;
  setConfigDataCenterGridIntensity: (value: GridIntensityInput | null) => void;
  configNetworkGridIntensity: GridIntensityInput | null;
  setConfigNetworkGridIntensity: (value: GridIntensityInput | null) => void;
}

export function MainPanel({
  monitoringActive,
  reset,
  setReset,
  aboutVisible,
  configGreenHostingFactor: configGreenHostingFactor,
  setConfigGreenHostingFactor,
  configDeviceGridIntensity,
  setConfigDeviceGridIntensity,
  configDataCenterGridIntensity,
  setConfigDataCenterGridIntensity,
  configNetworkGridIntensity,
  setConfigNetworkGridIntensity,
}: MainPanelProps) {
  const [currentTab, setTab] = useState(0);

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTabValue: number,
  ) => {
    setTab(newTabValue);
  };

  return (
    <>
      {!aboutVisible ? (
        <Box sx={{ width: '100%', maxHeight: '472px', overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="secondary"
            >
              <Tab label="Results" id="0" />
              <Tab label="Configuration" id="1" />
              <Tab label="Methodology" id="2" />
            </Tabs>
          </Box>
          <TabPanel currentTab={currentTab} index={0}>
            <ResultsTab
              reset={reset}
              setReset={setReset}
              monitoringActive={monitoringActive}
              greenHostingFactor={configGreenHostingFactor}
              deviceGridIntensity={configDeviceGridIntensity}
              dataCenterGridIntensity={configDataCenterGridIntensity}
              networkGridIntensity={configNetworkGridIntensity}
            />
          </TabPanel>
          <TabPanel currentTab={currentTab} index={1}>
            <ConfigurationTab
              greenHostingFactor={configGreenHostingFactor}
              setGreenHostingFactor={setConfigGreenHostingFactor}
              deviceGridIntensity={configDeviceGridIntensity}
              setDeviceGridIntensity={setConfigDeviceGridIntensity}
              dataCenterGridIntensity={configDataCenterGridIntensity}
              setDataCenterGridIntensity={setConfigDataCenterGridIntensity}
              networkGridIntensity={configNetworkGridIntensity}
              setNetworkGridIntensity={setConfigNetworkGridIntensity}
            />
          </TabPanel>
          <TabPanel currentTab={currentTab} index={2}>
            <MethodologyTab />
          </TabPanel>
        </Box>
      ) : (
        <Box sx={{ width: '100%', maxHeight: '472px', overflow: 'hidden' }}>
          <Typography
            variant="h6"
            sx={{ paddingX: '20px', paddingTop: '20px' }}
          >
            About
          </Typography>
          <Typography
            variant="body2"
            sx={{ paddingX: '20px', paddingTop: '10px' }}
          >
            {text.name} is published under the{' '}
            <Link href="https://github.com/alexzurbonsen/co2estimeter/blob/main/LICENSE">
              Apache-2.0 license
            </Link>
            .
          </Typography>
          <Typography
            variant="body2"
            sx={{ paddingX: '20px', paddingTop: '10px' }}
          >
            The source code is available on GitHub. Contributions are welcome!
            If you find a bug or have a feature request, feel free to open an
            issue or pull request.
          </Typography>
          <Typography
            sx={{ paddingX: '20px', paddingTop: '10px', paddingBottom: '20px' }}
          >
            <IconButton
              href="https://github.com/alexzurbonsen/co2estimeter"
              sx={{ color: 'black' }}
            >
              <GitHubIcon />
            </IconButton>
          </Typography>
        </Box>
      )}
    </>
  );
}
