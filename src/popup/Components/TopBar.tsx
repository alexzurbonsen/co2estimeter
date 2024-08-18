// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import { Tooltip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Browser from 'webextension-polyfill';

import { STORAGE_KEYS } from '../../constants/constants';
import text from '../text/text';

interface TopBarProps {
  monitoringActive: boolean;
  setMonitoringActive: (value: boolean) => void;
  setReset: (value: any) => void;
}

export default function TopBar({
  monitoringActive,
  setMonitoringActive,
  setReset,
}: TopBarProps) {
  const handleDataReset = async () => {
    await Browser.storage.local.remove(STORAGE_KEYS.DOMAIN_STATS);
    setReset(true);
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: 'transparent',
      }}
      elevation={0}
    >
      <Toolbar sx={{ color: '#384043' }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {text.name}
        </Typography>
        <Tooltip title={text.tooltips.startMonitoring}>
          <span>
            <IconButton
              onClick={() => setMonitoringActive(true)}
              disabled={monitoringActive}
              color="primary"
            >
              <PlayArrowIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={text.tooltips.pauseMonitoring}>
          <span>
            <IconButton
              onClick={() => setMonitoringActive(false)}
              disabled={!monitoringActive}
              color="primary"
            >
              <PauseIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={text.tooltips.resetData}>
          <span>
            <IconButton
              onClick={handleDataReset}
              disabled={monitoringActive}
              color="primary"
            >
              <ReplaySharpIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
