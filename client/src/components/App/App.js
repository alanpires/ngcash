import React, { useState } from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import useToken from './useToken';
import Register from '../Register/Register';
import Appbar from "../Appbar/Appbar";
import Content from "../Content/Content";
import { Grid } from "@material-ui/core";

function App() {
    const {token, setToken} = useToken();
    const [click, setClick] = useState(true);

    const handleClick = (value) => {
      setClick(value)
    };

    if (token) {
      return (
              <div>
                 <Appbar handleClick={handleClick} token={token} setToken={setToken}/>
                  <BrowserRouter>
                      <Switch>
                          <Route path='/dashboard'>
                              <Dashboard userToken={token}/>
                          </Route>
                          <Route path='/register'>
                              <Register/>
                          </Route>
                      </Switch>
                  </BrowserRouter>
              </div>
          )
      }
 
    return (
      <Grid container direction="column">
        <Grid item>
          <Appbar handleClick={handleClick} token={token} setToken={setToken}/>
        </Grid>

        <Content setToken={setToken} click={click} handleClick={handleClick}/>
      </Grid>)

    }

    

export default App;