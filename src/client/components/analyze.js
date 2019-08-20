import React, { Component, Fragment } from 'react';
import history from '../history';
// eslint-disable-next-line no-unused-vars

import '../app.css';


class analyze extends Component {
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
          <p className="title">הערכה</p>
          <div className="uplButton" role="group">
            <button onClick={this.onClickHandler} className="button-invoice">עמוד הבית</button>
            <button onClick={this.uploadFile} className="button-invoice">העלת קובץ</button>
            <button onClick={this.mathprice} className="button-two">מחיר ברשת</button>
            <button onClick={this.mathbuy} className="button-two">כמות קניות</button>
            <button onClick={this.retailers} className="button-three">רשתות מזון</button>
          </div>
          <button onClick="test()">Click me</button>
        </div>
      </Fragment>
    );
  }
}

export default analyze;
