import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

async function newTransference(data, token) {
    return fetch('http://localhost:9000/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(data => data.json())
    .catch((err) => console.log(err))
}

const Form = ({ handleClose, userToken }) => {
  const classes = useStyles();
  const [usernameCashIn, setUsernameCashIn] = React.useState();
  const [value, setValue] = React.useState();

  const handleSubmit = async (e) => {
    console.log('criou nova transação')
    e.preventDefault();
    await newTransference({
        usernameCashIn,
        value
    }, userToken);
    handleClose();
}

  return (
    <div>
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Username"
        variant="filled"
        required
        onChange={e => setUsernameCashIn(e.target.value)}
      />
      <TextField
        label="Value"
        variant="filled"
        type="number"
        required
        onChange={e => setValue(Number(e.target.value))}
      />
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </div>
    </form>
    </div>
  );
};

export default Form;

