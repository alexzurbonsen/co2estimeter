// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import { ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';

import { Popup } from './Popup/Popup';
import { theme } from './theme';

const anchor = document.getElementById('popup')!;
const root = createRoot(anchor);
root.render(
  <ThemeProvider theme={theme}>
    <Popup />
  </ThemeProvider>,
);
