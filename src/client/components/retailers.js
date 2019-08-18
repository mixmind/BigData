import React, { Component, Fragment } from 'react';
import history from '../history';
import RetailersChart from './retailerschart';

import '../app.css';

class retailers extends Component {
  onClickHandler = () => {
    history.push('/');
  };
  uploadFile = () => {
    history.push('/upload');
  };

  mathprice = () => {
    history.push('/mathprice');
  };

  mathbuy = () => {
    history.push('/mathbuy');
  };

  retailers = () => {
    history.push('/retailers');
  };

  render() {
    return (
      <Fragment>
        <div className="retailers">
          <p className="title">רשתות מזון</p>
          <div className="btn-group-vertical left" role="group">
            <button onClick={this.uploadFile} className="button-invoice">העלת קובץ</button>
            <button onClick={this.mathprice} className="button-two">מחיר ברשת</button>
            <button onClick={this.mathbuy} className="button-two">כמות קניות</button>
            <button onClick={this.retailers} className="button-three">רשתות מזון</button>
          </div>
        </div>
        <div className="charts_container center">
          <RetailersChart />
        </div>
      </Fragment>
    );
  }
}

export default retailers;
