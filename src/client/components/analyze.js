import React, { Component, Fragment } from 'react';
import axios from 'axios';
import history from '../history';
import Bigml from './bigmlchart';
// eslint-disable-next-line no-unused-vars

import '../app.css';
import Ripples from 'react-ripples';


class analyze extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
      done: false
    }
  }
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

  analyze = () => {
    history.push('/analyze');
  };

  createAss = () => {
    axios
      .get('http://35.208.177.111:8080/createAss').then((res) => {
        console.log(res.data);
      });
  };

  getAss = () => {
    axios
      .get('http://35.208.177.111:8080/getAss').then((res) => {
        console.log(res.data);
      });
  };

  createMod = () => {
    axios
      .get('http://35.208.177.111:8080/createMod').then((res) => {
        console.log(res.data);
      });
  };

  getPred = () => {
    axios
      .get('http://35.208.177.111:8080/getPred').then((res) => {
      console.log(res);
        this.setState({ done: true });
      });
  };


  render() {
    return (
      <Fragment>
        <div className="analyze">
          <p className="title top">הערכה</p>
          <div className="uplButton" role="group">
            <button onClick={this.onClickHandler} className="button-invoice">עמוד הבית</button>
            <button onClick={this.uploadFile} className="button-invoice">העלת קובץ</button>
            <button onClick={this.mathprice} className="button-two">מחיר ברשת</button>
            <button onClick={this.mathbuy} className="button-two">כמות קניות</button>
            <button onClick={this.retailers} className="button-three">רשתות מזון</button>
            <button onClick={this.analyze} className="button-three">חיזוי</button>
          </div>
          <div className="buttons">
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 25,
                overflow: 'hidden',
              }}
            >
              <Ripples color="yellow">
                <button onClick={this.getPred} className="button-three">לקבל חיזוי</button>
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
              <Ripples color="yellow">
                <button onClick={this.createMod} className="button-three">ליצור מודל</button>

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
              <Ripples color="yellow">
                <button onClick={this.getAss} className="button-three">ליצור דטאסט</button>
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
              <Ripples color="yellow">
                <button onClick={this.createAss} className="button-three">ליצור חיזוי</button>
              </Ripples>
            </div>
          </div>
          <div className="charts_container center">
            <div>
              {this.state.done ? <Bigml/> : <p> </p>}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default analyze;
