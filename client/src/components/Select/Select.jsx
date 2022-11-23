import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({
  setSelect, select,
}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Filter"
          value={select}
          onChange={(e) => setSelect(e.target.value)}
          sx={{ width: 220 }}
        >
          <MenuItem value="cashIn">CashIn</MenuItem>
          <MenuItem value="cashOut">CashOut</MenuItem>
          <MenuItem value="both">Both</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
