import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from 'react-router-dom';


import App from './App';
import Nav from './components/Nav';
import Home from './components/Home';
import Tipo from './components/Tipo';
import ScanQR from './components/ScanQR';
import scrutinio from './components/scrutinio';

import * as serviceWorker from './serviceWorker';



ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/nav" component={Nav} />
            <Route exact path="/tipo" component={Tipo} />
            <Route exact path="/scrutinio" component={scrutinio} />
            <Route exact path="/scan" component={ScanQR}></Route>

        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
