import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import useToken from './useToken';
import Appbar from '../Appbar/Appbar';
import Content from '../Content/Content';

function App() {
  const { token, setToken } = useToken();
  const [click, setClick] = useState(true);

  const handleClick = (value) => {
    setClick(value);
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <Appbar handleClick={handleClick} token={token} setToken={setToken} />
      </Grid>
      <Content
        userToken={token}
        click={click}
        token={token}
        handleClick={handleClick}
        setToken={setToken}
      />
    </Grid>
  );
}

export default App;
