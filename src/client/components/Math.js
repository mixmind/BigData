import React, { Component, Fragment } from 'react';
import history from '../history';

import ProductBuyChart from './ProductBuyChart';
import ProductPriceChart from './ProductPriceChart';

import '../app.css';

class Math extends Component {
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
          <ProductBuyChart />
          <ProductPriceChart />
        </div>
      </Fragment>
    );
  }
}

export default Math;
