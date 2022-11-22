import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Appbar({ handleClick, token, setToken }) {
  const classes = useStyles();

  if (token) {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
            Ng Cash
            </Typography>
            <Button 
              color="inherit" 
              value="Logout" 
              onClick={() => {
                localStorage.clear();
                setToken("")
              }}>
              Logout
      </Button>
            {/* <Logout token={token} setToken={setToken} /> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Ng Cash
            </Typography>
            <Button
              onClick={e => {
                e.preventDefault();
                handleClick(true);
              }}
              color="inherit"
            >
              Login
            </Button>
            <Button
              onClick={e => {
                e.preventDefault();
                handleClick(false);
              }}
              color="inherit"
            >
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
