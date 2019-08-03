import React, { Component } from 'react';
import {Router, Route, Switch} from "react-router-dom";
import history from "./history";
import './app.css';

import Main from './components/Main';
import Upload from './components/Upload';
import Math from './components/Math';
import Retailers from './components/Retailers';


class App extends Component {

    render() {
        return (
            <Router basename="/" history={history}>
                    <Switch>
                        <Route path='/' exact component={Main} />
                        <Route path='/upload' exact component={Upload} />
                        <Route path='/math' exact component={Math} />
                        <Route path='/retailers' exact component={Retailers} />
                    </Switch>
            </Router>
        );
    }
}

export default App;
/**/
