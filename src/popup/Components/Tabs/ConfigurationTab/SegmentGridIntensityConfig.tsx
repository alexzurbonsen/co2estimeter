// SPDX-FileCopyrightText: Alexander zur Bonsen <alexander.zur.bonsen@tngtech.com>
//
// SPDX-License-Identifier: Apache-2.0
import { Autocomplete, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import {
  COUNTRY_CODE_OPTIONS,
  CountryCode,
  SET_CONFIG_DEBOUNCE_INTERVAL,
} from '../../../../constants/constants';
import text from '../../../text/text';

const validNumberRegex = /^[0-9]*(?:[.,][0-9]+)?$/;

export type GridIntensityInput = number | CountryCode;

interface SegmentGridIntensityConfigProps {
  label: string;
  segementGridIntensity: GridIntensityInput | null;
  setSegmentGridIntensity: (value: GridIntensityInput | null) => void;
}

export function SegmentGridIntensityConfig({
  label,
  segementGridIntensity,
  setSegmentGridIntensity,
}: SegmentGridIntensityConfigProps) {
  const [value, setValue] = useState<number | CountryCode | string | null>(
    segementGridIntensity,
  );
  const [isValidInput, setIsValidInput] = useState(true);
  const [inputValue, setInputValue] = useState<string | undefined>('');
  const [validatedInputValue, setValidatedInputValue] = useState<string | undefined>(
    '',
  );

  // debounced update of segementGridIntensity
  // value is either null or an object of type CountryCode
  // validInputValue is either a undefined or the empty string or a
  // validated string, that is either a known country name or a
  // string that can be parsed to a number
  // if validInputValue is a string, like 'germany', and no drop down option
  // was selected, value will be null
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (typeof value === 'string') {
        console.error(
          'Unexpected string value (not inputValue): ${label} and value: ${value}',
        );
        return;
      }
      if (value !== null) {
        setSegmentGridIntensity(value);
        return;
      }
      if (validatedInputValue !== undefined && validatedInputValue !== '') {
        const parsedNumber = parseFloat(validatedInputValue);
        if (isNaN(parsedNumber)) {
          const countryCode = COUNTRY_CODE_OPTIONS.find((countryCode) => {
            return (
              countryCode.country.toLowerCase() ===
              validatedInputValue.toLowerCase()
            );
          });
          if (countryCode) {
            setSegmentGridIntensity(countryCode);
            return;
          } else {
            console.error(
              `Unexpectedly got a NaN number from a validated inputValue: ${label} and string inputValue: ${value}`,
            );
            return;
          }
        }
        setSegmentGridIntensity(parsedNumber);
        return;
      }
      setSegmentGridIntensity(null);
      return;
    }, SET_CONFIG_DEBOUNCE_INTERVAL);
    return () => clearTimeout(timeoutId);
  }, [value, validatedInputValue, setSegmentGridIntensity]);

  // debounced validation of inputValue
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const isValid = validateInput(inputValue);
      setIsValidInput(isValid);
      if (isValid) {
        setValidatedInputValue(inputValue);
      } else {
        setValidatedInputValue(undefined);
        setValue(null);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, setIsValidInput, setValidatedInputValue, setValue]);

  const validateInput = (newValue: string | undefined): boolean => {
    if (newValue === undefined || newValue === '') {
      return true;
    }
    if (
      COUNTRY_CODE_OPTIONS.find((countryCode) => {
        return (
          countryCode.country.toLowerCase() ===
          newValue.split(' (')[0].toLowerCase()
        );
      })
    ) {
      return true;
    }
    // check that the string can be parsed to a number
    // without surprises as e.g. in parseFloat('531.2.3 is number')
    const validNumberString = validNumberRegex.test(newValue);
    if (validNumberString) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {/* <Grid item xs={12}>{`value: ${value}, validated inputValue ${validInputValue}, gridIntensity ${segementGridIntensity}`}</Grid> */}
      <Grid item xs={3}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            {label}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={9}>
        <Autocomplete
          id="country-code-or-grid-intensity"
          options={COUNTRY_CODE_OPTIONS}
          autoHighlight
          freeSolo
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option;
            }
            if (typeof option === 'number') {
              return option.toString();
            }
            return `${option.country} (${option.gridIntensity})`;
          }}
          value={value}
          onChange={(
            _event: any,
            newValue: string | number | GridIntensityInput | null,
          ) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(_event: any, newValue: string | undefined) => {
            setInputValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!isValidInput}
              helperText={
                !isValidInput && text.configurationTab.validationError
              }
              label={text.configurationTab.inputDefault}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'search',
              }}
            />
          )}
        />
      </Grid>
    </>
  );
}
