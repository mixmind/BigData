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
          <p className="title">מחיר ברשתות</p>
        </div>
        <div className="charts_container center">
          <Price />
        </div>
      </Fragment>
    );
  }
}

export default mathprice;
