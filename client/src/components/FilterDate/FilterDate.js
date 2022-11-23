import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function NativePickers({setFilterDate}) {
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        required
        id="date"
        label="Birthday"
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setFilterDate(e.target.value)}
      />
    </Stack>
  );
}