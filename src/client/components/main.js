import React, { Component, Fragment } from 'react';
import history from '../history';

import '../app.css';

class main extends Component {
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
        <div className="main-page">
          <p className="title top">מסדי ענק</p>
          <div className="buttons">
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={this.uploadFile} className="button-invoice">העלת קובץ</button>
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={this.mathprice} className="button-two">מחיר ברשתות</button>
            <button onClick={this.mathbuy} className="button-two">כמות קניות</button>
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={this.retailers} className="button-three">רשתות מזון</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default main;
