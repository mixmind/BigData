import React, { Component, Fragment } from 'react'
import axios from 'axios';
import history from '../history';
import '../app.css';



class upload extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
      done: false
    }
  }

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post("http://35.208.177.111:8080/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            done: true
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })
  }

  onClickHandler = () => {
      history.push("/");
  }
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
        <div className="upload">
        <p className="title top">העלת קובץ </p>
          <div className="uplButton" role="group">
            <button onClick={this.onClickHandler} className="button-invoice">עמוד הבית</button>
            <button onClick={this.uploadFile} className="button-invoice">העלת קובץ</button>
            <button onClick={this.mathprice} className="button-two">מחיר ברשת</button>
            <button onClick={this.mathbuy} className="button-two">כמות קניות</button>
            <button onClick={this.retailers} className="button-three">רשתות מזון</button>
          </div>
        </div>
        <div className="buttons1">
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
          rel="stylesheet"/>
        <span className="btn btn-primary btn-file">
           בחר קובץ<input type="file" onChange={this.handleselectedFile}/>
        </span>
        <button className="files-btn" onClick={this.handleUpload}>לשלוח</button>
        </div>
        <div className="buttons1">
          <div>
            {this.state.done ? <p> קובץ הועלה בהצלחה </p> : <p> </p>}
          </div>

        </div>

      </Fragment>
    )
  }
}

export default upload;
