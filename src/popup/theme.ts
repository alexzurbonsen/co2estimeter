// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#08085E',
    },
    secondary: {
      main: '#424242',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          cursor: 'default',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          cursor: 'default',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
  },
});
