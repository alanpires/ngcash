import React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FeedbackUser from '../Feedback/FeedbackUser';

const useStyles = makeStyles((theme) => ({
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
    textAlign: 'center',
  },
}));

async function newTransference(data, token) {
  return fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json());
}

function Form({ userToken }) {
  const classes = useStyles();
  const [usernameCashIn, setUsernameCashIn] = React.useState('');
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await newTransference({
      usernameCashIn,
      value,
    }, userToken);
    setData(res);
    setUsernameCashIn('');
    setValue('');
  };

  const message = 'Transferência realizada com sucesso.';

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
          onChange={(e) => setUsernameCashIn(e.target.value)}
          value={usernameCashIn}
        />
        <TextField
          label="Value"
          variant="filled"
          type="number"
          id="value"
          name="value"
          required
          onChange={(e) => setValue(Number(e.target.value))}
          value={value}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </div>
        <FeedbackUser data={data} message={message} />
      </form>
    </div>
  );
}

export default Form;
