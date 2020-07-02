import React from 'react';
import { Redirect, BrowserRouter, Switch, Route } from 'react-router-dom'; 

import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFoundPage from './pages/404';
import Repositorios from './pages/Repositorios';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/users/:username" exact component={Profile} />
                <Route path="/users/:username/repos" exact component={Repositorios} />
                <Route path="/404" exact component={NotFoundPage} />
                <Redirect to="/404"/>
            </Switch>
        </BrowserRouter>
    );
}