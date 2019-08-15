import React, { Component, Fragment } from 'react';
import history from '../history';

import Buy from './prodbuy';
import Price from './prodprice';

import '../app.css';

class math extends Component {
  onClickHandler = () => {
    history.push('/');
  };

  render() {
    return (
      <Fragment>
        <div className="math">
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="btn-back left" onClick={this.onClickHandler}>Back</button>
          <p className="title">Math</p>
        </div>
        <div className="charts_container center">
          <Buy />
          <Price />
        </div>
      </Fragment>
    );
  }
}

export default math;
