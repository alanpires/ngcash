import React, { useState } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function Content({ setToken, click, handleClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container style={{ padding: 80 }} item>
        <Grid />
        <Grid />
        {click ? (
          <Login
            handleClick={handleClick}
            setToken={setToken}
          />
        ) : (
          <Register handleClick={handleClick}/>
        )}

        <Grid />
        <Grid />
      </Grid>
    </div>
  );
}