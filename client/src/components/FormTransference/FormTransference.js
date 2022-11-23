import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import FormNewTransference from '../Feedback/FeedbackNewTransference'

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
  saldo: {
    textAlign: 'center'
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

const Form = ({ userToken }) => {
  const classes = useStyles();
  const [usernameCashIn, setUsernameCashIn] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [data, setData] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await newTransference({
        usernameCashIn,
        value
    }, userToken);
    setData(data)
    setUsernameCashIn("")
    setValue(0)
}

  return (
    <div>
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label="Username"
        variant="filled"
        type="text"
        required
        id="username"
        name="username"
        onChange={e => setUsernameCashIn(e.target.value)}
      />
      <TextField
        label="Value"
        variant="filled"
        type="number"
        id="value"
        name="value"
        required
        onChange={e => setValue(Number(e.target.value))}
      />
      <div>
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </div>
      <FormNewTransference data={data}/>
    </form>
    </div>
  );
};

export default Form;

