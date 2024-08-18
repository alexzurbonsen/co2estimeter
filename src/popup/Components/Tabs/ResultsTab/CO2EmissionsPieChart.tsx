// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import { Circle } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ComputedDatum, PieTooltipProps, ResponsivePie } from '@nivo/pie';

import { PieChartDatum } from './resultsComputation';

interface PieChartProps {
  data: PieChartDatum[];
}

export function CO2EmissionsPieChart({ data }: PieChartProps) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 10, bottom: 10, left: 10 }}
      startAngle={-90}
      endAngle={90}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={4}
      colors={({ data }) => data.color}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLabel={(datum) => `${datum.id}`}
      enableArcLinkLabels={false}
      tooltip={({ datum }: PieTooltipProps<PieChartDatum>) => (
        <PieChartTooltip datum={datum} />
      )}
    />
  );
}

function PieChartTooltip({ datum }: { datum: ComputedDatum<PieChartDatum> }) {
  return (
    <Paper>
      <Box
        sx={{ display: 'flex', alignItems: 'center', paddingX: 2, paddingY: 1 }}
      >
        <Circle sx={{ color: datum.color, marginRight: 1 }} fontSize="small" />
        <Typography variant="caption">
          <strong>{datum.id}</strong>: {datum.value} gCO<sub>2</sub>e
        </Typography>
      </Box>
    </Paper>
  );
}
