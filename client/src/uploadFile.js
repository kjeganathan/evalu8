import './uploadFile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse'
import logo from './logo.png';

const buttonRef = React.createRef()

class uploadFile extends Component {
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data) => {
    console.log('---------------------------')
    console.log(data)
    let stringTeamMembers = data[1]["data"][0] + " " + data[1]["data"][1]
    for(let i=2; i<11; i++){
      stringTeamMembers = stringTeamMembers + "," + data[i]["data"][0] + " " + data[i]["data"][1]
    }
    let stringEmail = localStorage.getItem("email");
    console.log(stringEmail);
    fetch('/api/addTeamMembers',{ 
      method:'POST', 
      body: JSON.stringify({
        email:JSON.parse(stringEmail),
        teammembers: stringTeamMembers
    }),
      headers:{ 'Content-Type': 'application/json' } 
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));

    console.log('---------------------------')
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      <div id="upload">
      <>
        <h5>Basic Upload</h5>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '40%',
                  paddingLeft: 0,
                  paddingRight: 0
                }}
              >
                Browse and Upload file
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%'
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                onClick={this.handleRemoveFile}
              >
                Remove
              </button>
            </aside>
          )}
        </CSVReader>
      </>
      </div>
      </div>
    )
  }
}

export default uploadFile;