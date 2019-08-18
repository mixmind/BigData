import React, { Component, Fragment } from 'react';
import Ripples from 'react-ripples';
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
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 25,
                overflow: 'hidden',
              }}
            >
              <Ripples color={'yellow'}>
                <button onClick={this.uploadFile} className="button-invoice">העלת קובץ</button>
              </Ripples>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 25,
                overflow: 'hidden',
              }}
            >
              <Ripples color={'yellow'}>
                <button onClick={this.mathprice} className="button-two">מחיר ברשת</button>
              </Ripples>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 25,
                overflow: 'hidden',
              }}
            >
              <Ripples color={'yellow'}>
                <button onClick={this.mathbuy} className="button-two">כמות קניות</button>
              </Ripples>

            </div>
            &nbsp;&nbsp;&nbsp;
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 25,
                overflow: 'hidden',
              }}
            >
              <Ripples color={'yellow'}>
                <button onClick={this.retailers} className="button-three">רשתות מזון</button>
              </Ripples>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default main;
