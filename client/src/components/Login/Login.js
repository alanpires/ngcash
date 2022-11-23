import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
// import { Link } from 'react-router-dom';
import FeedbackUser from "../Feedback/FeedbackCreateUser";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form : {
      display: 'flex',
      flexDirection: 'column',

      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
      '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
    card: {
      padding: theme.spacing(2),
      background: '#f5f5f5',
    }
  }));

  async function loginUser(credentials) {
    return fetch('http://localhost:9000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .catch((err) => console.error(err))
}

export default function Login({setToken, handleClick}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginUser({
            username,
            password
        });
        setToken(data)
        setData(data)
    }

  const classes = useStyles();

  // const MyLink = (props) => <Link to="/transference" {...props} />

  return (
    <div className={classes.root}>
    <Card
      className={classes.card}
      variant="outlined"
     >
      <CardContent
      className={classes.card} >
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
            <TextField
            type="text"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            name="login-username"
            id="login-username"
          />
          <TextField
            type="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            name="login-password"
            id="login-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            value="Register"
            disabled={
              username.length === 0 ||
              password.length === 0
            }
          >
            Login
          </Button>
          <Button 
            variant="contained"
            onClick={e => {
                e.preventDefault();
                handleClick(false);
              }}>
            New User
          </Button>
          <FeedbackUser data={data}/>
        </form>
        </CardContent>
    </Card>
    </div>
  );
}

Login.prototype = {
    setToken: PropTypes.func.isRequired
}