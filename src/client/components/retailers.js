import React, { Component, Fragment } from 'react';
import history from '../history';
import RetailersChart from './retailerschart';

import '../app.css';

class retailers extends Component {
  onClickHandler = () => {
    history.push('/');
  };

  render() {
    return (
      <Fragment>
        <div className="retailers">
          <p className="title">רשתות מזון</p>
        </div>
        <div className="charts_container center">
          <RetailersChart />
        </div>
      </Fragment>
    );
  }
}

export default retailers;
