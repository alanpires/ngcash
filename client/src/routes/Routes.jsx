import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import FormTransference from '../components/FormTransference/FormTransference';
// import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import App from '../components/App/App'

function Routes() {
  return (
    <BrowserRouter>
      <Route component={App} path="/" exact />
      <Route component={Register} path="/register" />
      <Route component={Dashboard} path="/dashboard" />
      <Route component={FormTransference} path="/transference" />
    </BrowserRouter>
  );
}

export default Routes;
