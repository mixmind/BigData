import React, { Component, Fragment } from 'react';
import history from '../history';
import RetailersChart from './RetailersChart';

import '../app.css';

class Retailers extends Component {
  onClickHandler = () => {
    history.push('/');
  };

  render() {
    return (
      <Fragment>
        <div className="retailers">
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="btn-back left" onClick={this.onClickHandler}>Back</button>
          <p className="title">Retailers</p>
        </div>
        <div className="charts_container center">
          <RetailersChart />
        </div>
      </Fragment>
    );
  }
}

export default Retailers;
