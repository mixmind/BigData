import React, { Component, Fragment } from 'react';
import history from '../history';

import Price from './prodprice';

import '../app.css';

class mathprice extends Component {
  onClickHandler = () => {
    history.push('/');
  };

  render() {
    return (
      <Fragment>
        <div className="mathprice">
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="btn-back left" onClick={this.onClickHandler}>Back</button>
          <p className="title">Price Math</p>
        </div>
        <div className="charts_container center">
          <Price />
        </div>
      </Fragment>
    );
  }
}

export default mathprice;
