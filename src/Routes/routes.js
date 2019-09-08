//Dependencias
import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

//Componentes
import Nav from '../components/Nav';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import App from '../App';



const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/nav" component={Nav} />
            <Route exact path="/navBar" component={Navbar} />
        </Switch>
    </BrowserRouter>




export default AppRoutes;
