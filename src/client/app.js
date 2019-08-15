import React, { Component } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
import './app.css';

import main from './components/main';
import upload from './components/upload';
import mathbuy from './components/mathbuy';
import mathprice from './components/mathprice';
import retailers from './components/retailers';


class app extends Component {

    render() {
        return (
            <Router basename="/" history={history}>
                    <Switch>
                        <Route path='/' exact component={main} />
                        <Route path='/upload' exact component={upload} />
                        <Route path='/mathbuy' exact component={mathbuy} />
                        <Route path='/mathprice' exact component={mathprice} />
                        <Route path='/retailers' exact component={retailers} />
                    </Switch>
            </Router>
        );
    }
}

export default app;
/**/
