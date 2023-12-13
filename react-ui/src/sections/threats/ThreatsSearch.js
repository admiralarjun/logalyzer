import React from 'react';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

export const ThreatsSearch = ({ onSearch }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      fullWidth
      placeholder="Search Threats"
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
      onChange={(event) => onSearch(event.target.value)}
    />
  </Card>
);
