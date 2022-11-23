import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Dashboard from '../Dashboard/Dashboard';
import FormTransference from '../FormTransference/FormTransference';
import Login from '../Login/Login';
import Register from '../Register/Register';

const useStyles = makeStyles(() => ({
  root: {
    padding: '1%',
  },
}));

export default function Content({
  userToken, click, token, handleClick, setToken,
}) {
  const classes = useStyles();

  if (token) {
    return (
      <div className={classes.root}>
        <Grid>
          {click ? (
            <Dashboard userToken={userToken} />
          ) : (
            <FormTransference userToken={userToken} />
          )}
        </Grid>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Grid container style={{ padding: 80 }} item>
        {click ? (
          <Login
            handleClick={handleClick}
            setToken={setToken}
          />
        ) : (
          <Register handleClick={handleClick} />
        )}
      </Grid>
    </div>
  );
}
