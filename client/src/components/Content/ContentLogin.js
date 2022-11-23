import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FormTransference from '../FormTransference/FormTransference'

export default function ContentLogin({ userToken }) {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dashboard'>
          <Dashboard userToken={userToken}/>
        </Route>
        <Route path='/transference'>
          <FormTransference userToken={userToken}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}