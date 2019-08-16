import React, { Component, Fragment } from 'react';
import history from '../history';
import Ripples from 'react-ripples'

import Buy from './prodbuy';

import '../app.css';

class mathbuy extends Component {
  onClickHandler = () => {
    history.push('/');
  };

  render() {
    return (
      <Fragment>
        <div className="mathbuy">
          <p className="title">קניות בכל רשת</p>
        </div>
        <div className="charts_container center">
          <Buy />
        </div>
      </Fragment>
    );
  }
}

export default mathbuy;
