// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import { SET_CONFIG_DEBOUNCE_INTERVAL } from '../../../../constants/constants';
import text from '../../../text/text';
import {
  GridIntensityInput,
  SegmentGridIntensityConfig,
} from './SegmentGridIntensityConfig';

interface ConfigurationTabProps {
  pieChartCutoff: number;
  setPieChartCutoff: (value: number) => void;
  greenHostingFactor: number;
  setGreenHostingFactor: (value: number) => void;
  deviceGridIntensity: GridIntensityInput | null;
  setDeviceGridIntensity: (value: GridIntensityInput | null) => void;
  dataCenterGridIntensity: GridIntensityInput | null;
  setDataCenterGridIntensity: (value: GridIntensityInput | null) => void;
  networkGridIntensity: GridIntensityInput | null;
  setNetworkGridIntensity: (value: GridIntensityInput | null) => void;
}

export function ConfigurationTab({
  pieChartCutoff,
  setPieChartCutoff,
  greenHostingFactor,
  setGreenHostingFactor,
  deviceGridIntensity,
  setDeviceGridIntensity,
  dataCenterGridIntensity,
  setDataCenterGridIntensity,
  networkGridIntensity,
  setNetworkGridIntensity,
}: ConfigurationTabProps) {
  const [intermediateGreenHostingPercent, setIntermediateGreenHostingPercent] =
    useState(greenHostingFactor * 100);
  const [intermediatePieChartCutoff, setIntermediatePieChartCutoff] =
    useState(pieChartCutoff);

  // TODO known bug of this debounce: if you change the tab before the debounce is over, the value is not saved
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setGreenHostingFactor(intermediateGreenHostingPercent / 100);
    }, SET_CONFIG_DEBOUNCE_INTERVAL);
    return () => clearTimeout(timeoutId);
  }, [intermediateGreenHostingPercent]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPieChartCutoff(intermediatePieChartCutoff);
    }, SET_CONFIG_DEBOUNCE_INTERVAL);
    return () => clearTimeout(timeoutId);
  }, [intermediatePieChartCutoff]);

  const handleGreenHostingSliderChange = (
    _event: Event,
    newValue: number | Array<number>,
  ) => {
    setIntermediateGreenHostingPercent(newValue as number);
  };

  const handlePieChartCutoffSliderChange = (
    _event: Event,
    newValue: number | Array<number>,
  ) => {
    setIntermediatePieChartCutoff(newValue as number);
  };

  return (
    <Box sx={{ overflowY: 'auto' }}>
      <Grid container spacing={2} sx={{ maxHeight: '380px' }}>
        <Grid item xs={4}>
          <Typography fontSize={16} display="inline">
            {text.configurationTab.pieChartCutoff(intermediatePieChartCutoff)}
            <Tooltip title={text.tooltips.pieChartCutoff}>
              <InfoOutlinedIcon
                sx={{ fontSize: 16, verticalAlign: 'middle', marginLeft: 1 }}
              />
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              marginRight: '30px',
            }}
          >
            <Slider
              value={intermediatePieChartCutoff}
              onChange={handlePieChartCutoffSliderChange}
              valueLabelDisplay="off"
              shiftStep={1}
              step={1}
              marks
              min={5}
              max={20}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={4}>
          <Typography fontSize={16} display="inline">
            {text.configurationTab.greenHostingFactor}
            <Tooltip title={text.tooltips.greenHostingFactor}>
              <InfoOutlinedIcon
                sx={{ fontSize: 16, verticalAlign: 'middle', marginLeft: 1 }}
              />
            </Tooltip>
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              marginRight: '30px',
            }}
          >
            <Slider
              value={intermediateGreenHostingPercent}
              onChange={handleGreenHostingSliderChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              fontSize={16}
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
              {text.configurationTab.gridIntensities}
              <Tooltip title={text.tooltips.gridIntensities}>
                <InfoOutlinedIcon
                  sx={{ fontSize: 16, verticalAlign: 'middle', marginLeft: 1 }}
                />
              </Tooltip>
            </Typography>
          </Box>
        </Grid>
        <SegmentGridIntensityConfig
          label={text.configurationTab.device}
          segementGridIntensity={deviceGridIntensity}
          setSegmentGridIntensity={setDeviceGridIntensity}
        />
        <SegmentGridIntensityConfig
          label={text.configurationTab.dataCenter}
          segementGridIntensity={dataCenterGridIntensity}
          setSegmentGridIntensity={setDataCenterGridIntensity}
        />
        <SegmentGridIntensityConfig
          label={text.configurationTab.network}
          segementGridIntensity={networkGridIntensity}
          setSegmentGridIntensity={setNetworkGridIntensity}
        />
      </Grid>
    </Box>
  );
}
