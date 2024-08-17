// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface DetailsCardProps {
  xsBreakpoint: number;
  tooltip: string | JSX.Element;
  elevation: number;
  value: string | number;
  description: string | JSX.Element;
}

export function ResultItem({
  xsBreakpoint,
  tooltip,
  elevation,
  value,
  description,
}: DetailsCardProps) {
  return (
    <Grid item xs={xsBreakpoint}>
      <Tooltip title={tooltip}>
        <Card elevation={elevation} sx={{ paddingLeft: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: -0.5 }}>
            {value}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: -0.5 }}
          >
            {description}
          </Typography>
        </Card>
      </Tooltip>
    </Grid>
  );
}
