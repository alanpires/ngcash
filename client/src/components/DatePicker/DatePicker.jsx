import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function DatePicker({ setDate, label }) {
  return (
    <Stack component="form" noValidate spacing={3}>
      <TextField
        required
        id="date"
        label={label}
        type="date"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setDate(e.target.value)}
      />
    </Stack>
  );
}
