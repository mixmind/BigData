import React, { Component, Fragment } from 'react'
import history from '../history';
import axios from 'axios'

import '../app.css'

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
      .post("http://35.128.177.111:8080/upload", data, {
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

  onClickHandler = (e) => {
      history.push("/");
  }

  render() {
    return (
      <Fragment>
        <p className="title">העלת קובץ </p>
        <div className="buttons1">
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
          rel="stylesheet"/>
        <span className="btn btn-primary btn-file">
           בחר קוזץ<input type="file" onChange={this.handleselectedFile}/>
        </span>
        <button className="files-btn" onClick={this.handleUpload}>לשלוח</button>
        <div>
          {this.state.done ? <p> קובץ הועלה בהצלחה </p> : <p> </p>}
        </div>
        </div>

      </Fragment>
    )
  }
}

export default upload
