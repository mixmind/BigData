import React, { Component, Fragment } from 'react';
import history from '../history';

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
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="btn-back left" onClick={this.onClickHandler}>Back</button>
          <p className="title">Buy Math</p>
        </div>
        <div className="charts_container center">
          <Buy />
        </div>
      </Fragment>
    );
  }
}

export default mathbuy;
