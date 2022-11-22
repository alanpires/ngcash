import React from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dashboard';
import Preferences from '../Preferences/Preferences';
import useToken from './useToken';
import Register from '../Register/Register'

function App() {
    const {token, setToken} = useToken();
 
    if (!token) {
        return <Login setToken={setToken}/>
        // return <Register/>
    }

    return (
        <div className='wrapper'>
            <BrowserRouter>
                <Switch>
                    <Route path='/dashboard'>
                        <Dashboard userToken={token}/>
                    </Route>
                    <Route path='/preferences'>
                        <Preferences/>
                    </Route>
                    <Route path='/login'>
                        <Login/>
                    </Route>
                    <Route path='/register'>
                        <Register/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
        
    )
}

export default App;