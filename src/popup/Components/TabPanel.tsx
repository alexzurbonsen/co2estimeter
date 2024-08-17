// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
// SPDX-FileCopyrightText: Copyright (c) 2014 Call-Em-All
//
// SPDX-License-Identifier: Apache-2.0 AND MIT
import Box from '@mui/material/Box';

// copied and adapted from https://github.com/mui/material-ui/blob/v5.16.7/docs/data/material/components/tabs/BasicTabs.tsx
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  currentTab: number;
}

export function TabPanel({
  children,
  currentTab,
  index,
  ...other
}: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={currentTab !== index}
      id={`${index}`}
      {...other}
    >
      {currentTab === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
