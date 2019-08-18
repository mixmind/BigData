import React, { Component, Fragment } from 'react';
import history from '../history';

import Buy from './prodbuy';

import '../app.css';

class mathbuy extends Component {
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
        <div className="mathbuy">
          <p className="title">קניות בכל רשת</p>
          <div className="uplButton" role="group">
            <button onClick={this.uploadFile} className="button-invoice">העלת קובץ</button>
            <button onClick={this.mathprice} className="button-two">מחיר ברשת</button>
            <button onClick={this.mathbuy} className="button-two">כמות קניות</button>
            <button onClick={this.retailers} className="button-three">רשתות מזון</button>
          </div>
        </div>
        <div className="charts_container center">
          <Buy />
        </div>
      </Fragment>
    );
  }
}

export default mathbuy;
