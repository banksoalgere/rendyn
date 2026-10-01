"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import IncreaseIcon from '@mui/icons-material/AddCircleOutlined';
import DecreaseIcon from '@mui/icons-material/RemoveCircleOutlined';
import {
  DispatchContext,
  ThemeOptionsContext,
} from '@/components/rendyn-libraries/mui/upstream/src/ThemeContext/index';
import { useTranslate } from '@/components/rendyn-libraries/mui/upstream/src/i18n/index';
import { setDocsSpacing, resetDocsSpacing } from '@/components/rendyn-libraries/mui/upstream/src/branding/index';

const minSpacing = 0;
const maxSpacing = 20;

export default function DensityTool() {
  const [spacingUnit, setSpacingUnit] = React.useState(8);
  const dispatch = React.useContext(DispatchContext);
  const themeOptions = React.useContext(ThemeOptionsContext);
  const handleDensityChange = (event) => {
    dispatch({
      type: 'SET_DENSE',
      payload: event.target.checked,
    });
  };

  const handleSpacingChange = (event, value) => {
    let spacing = value || +event.target.value;

    //  If the entered value is greater than maxSpacing, setting up maxSpacing as value
    if (spacing > maxSpacing) {
      spacing = maxSpacing;
    }
    //  If the entered value is less than minSpacing, setting up minSpacing as value
    if (spacing < minSpacing) {
      spacing = minSpacing;
    }

    setSpacingUnit(spacing);
    setDocsSpacing(spacing);
  };

  const resetDensity = () => {
    setSpacingUnit(8);
    resetDocsSpacing();
    dispatch({ type: 'RESET_DENSITY' });
  };

  const t = useTranslate();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={themeOptions.dense}
            onChange={handleDensityChange}
            value="dense"
            color="secondary"
          />
        }
        label={t('useHighDensity')}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography id="input-slider" gutterBottom>
          {t('spacingUnit')}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label={t('decreaseSpacing')}
            onClick={() => {
              setSpacingUnit(spacingUnit - 1);
              setDocsSpacing(spacingUnit - 1);
            }}
            disabled={spacingUnit === minSpacing}
          >
            <DecreaseIcon />
          </IconButton>
          <Input
            value={spacingUnit}
            margin="dense"
            onChange={handleSpacingChange}
            inputProps={{
              step: 1,
              min: minSpacing,
              max: maxSpacing,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          <IconButton
            aria-label={t('increaseSpacing')}
            onClick={() => {
              setSpacingUnit(spacingUnit + 1);
              setDocsSpacing(spacingUnit + 1);
            }}
            disabled={spacingUnit === maxSpacing}
          >
            <IncreaseIcon />
          </IconButton>
        </Box>
      </Box>
      <Button variant="contained" onClick={resetDensity}>
        {t('resetDensity')}
      </Button>
    </Box>
  );
}
