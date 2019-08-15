import React, { Component } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
import './app.css';

import main from './components/main';
import upload from './components/upload';
import math from './components/math';
import retailers from './components/retailers';


class app extends Component {

    render() {
        return (
            <Router basename="/" history={history}>
                    <Switch>
                        <Route path='/' exact component={main} />
                        <Route path='/upload' exact component={upload} />
                        <Route path='/math' exact component={math} />
                        <Route path='/retailers' exact component={retailers} />
                    </Switch>
            </Router>
        );
    }
}

export default app;
/**/
