import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FeedbackUser from '../Feedback/FeedbackUser';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  card: {
    padding: theme.spacing(2),
    background: '#f5f5f5',
  },
  div: {
    padding: theme.spacing(3),
  },
  divChild: {
    fontWeight: 'bold',
  },
}));

async function registerUser(credentials) {
  return fetch('/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => data.json());
}

export default function Register({ handleClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordrepeat] = useState('');
  const [data, setData] = useState({});

  const message = 'Usuário criado com sucesso. Faça o login.';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser({ username, password });
    setData(res);
    setUsername('');
    setPassword('');
    setPasswordrepeat('');
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card
        className={classes.card}
        variant="outlined"
      >

        <CardContent
          className={classes.card}
        >
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              type="text"
              label="Username"
              onChange={(e) => setUsername(e.target.value)}
              name="registeUsername"
              id="username"
              value={username}
            />
            <TextField
              required
              type="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="registerPassword"
              id="password"
              value={password}
            />
            <TextField
              required
              label="Repeat-password"
              type="password"
              onChange={(e) => setPasswordrepeat(e.target.value)}
              name="register-password-repeat"
              id="register-password-repeat"
              value={passwordRepeat}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              value="Register"
              disabled={
              username.length === 0
              || password.length === 0
              || password !== passwordRepeat
            }
            >
              Register
            </Button>
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                handleClick(true);
              }}
            >
              Log in
            </Button>
            <FeedbackUser data={data} message={message} />
          </form>
        </CardContent>
      </Card>
      <div className={classes.div}>
        <div className={classes.divChild}>
          Username:
        </div>
        <div>- mínimo 3 caracteres</div>
        <div className={classes.divChild}>
          Password:
        </div>
        <div>
          - mínimo 8 caracteres
        </div>
        <div>
          - deve conter ao menos 1 letra maíscula
        </div>
        <div>
          - deve conter ao menos 1 número
        </div>
      </div>
    </div>
  );
}
