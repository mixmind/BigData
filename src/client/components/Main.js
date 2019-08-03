import React, { Component, Fragment } from 'react';
import history from '../history';

import '../app.css';

class Main extends Component {
  uploadFile = () => {
    history.push('/upload');
  };

  math = () => {
    history.push('/math');
  };

  retailers = () => {
    history.push('/retailers');
  };

  render() {
    return (
      <Fragment>
        <div className="main-page">
          <p className="title top">Bigdata</p>
          <div className="buttons">
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={this.uploadFile} className="button-invoice">Upload invoice</button>
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={this.math} className="button-two">Some math</button>
            {/* eslint-disable-next-line react/button-has-type */}
            <button onClick={this.retailers} className="button-three">Retailers</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Main;
