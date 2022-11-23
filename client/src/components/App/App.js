import React, { useState } from 'react';
import useToken from './useToken';
import Appbar from "../Appbar/Appbar";
import ContentNoLogin from "../Content/ContentNoLogin";
import ContentLogin from "../Content/ContentLogin"
import { Grid } from "@material-ui/core";

function App() {
    const {token, setToken} = useToken();
    const [click, setClick] = useState(true);

    const handleClick = (value) => {
      setClick(value)
    };

    if (token) {
      return (
        <Grid container direction="column">
          <Grid item>
            <Appbar handleClick={handleClick} token={token} setToken={setToken}/>
          </Grid>
        <ContentLogin userToken={token}/>
        </Grid>
      )
    }

    return (
      <Grid container direction="column">
        <Grid item>
          <Appbar handleClick={handleClick} token={token} setToken={setToken}/>
        </Grid>

        <ContentNoLogin setToken={setToken} click={click} handleClick={handleClick}/>
      </Grid>)

    }

export default App;