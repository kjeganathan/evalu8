import './uploadFile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse'

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
    console.log(stringTeamMembers);
    fetch('/api/addTeamMembers',{ 
      method:'POST', 
      body: JSON.stringify({
        email:"kjeganathan@umass.edu",
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
                Browse file
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
    )
  }



  //   state = {
  //       // Initially, no file is selected
  //       selectedFile: null
  //     };
      
  //     // On file select (from the pop up)
  //     onFileChange = event => {
  //       // Update the state
  //       this.setState({ selectedFile: event.target.files[0] });
      
  //     };
      
  //     // On file upload (click the upload button)
  //     onFileUpload = () => {
      
  //       // Create an object of formData
  //       const formData = new FormData();
      
  //       // Update the formData object
  //       formData.append(
  //         "myFile",
  //         this.state.selectedFile,
  //         this.state.selectedFile.name
  //       );
      
  //       // Details of the uploaded file
  //       console.log(this.state.selectedFile);
      
  //       // Request made to the backend api
  //       // Send formData object
  //       //axios.post("api/uploadfile", formData);
  //     };
      
  //     // File content to be displayed after
  //     // file upload is complete
  //     fileData = () => {
  //       console.log(this.state.selectedFile);
  //       if (this.state.selectedFile) {
           
  //         return (
  //           <div>
  //             <h2>File Details:</h2>
               
  // <p>File Name: {this.state.selectedFile.name}</p>
   
               
  // <p>File Type: {this.state.selectedFile.type}</p>
   
               
  // <p>
  //               Last Modified:{" "}
  //               {this.state.selectedFile.lastModifiedDate.toDateString()}
  //             </p>
   
  //           </div>
  //         );
  //       } else {
  //         return (
  //           <div>
  //             <br />
  //             <h4>Choose before Pressing the Upload button</h4>
  //           </div>
  //         );
  //       }
  //     };
      
  //     render() {
      
  //       return (
  //         <div>
  //             <h3>
  //               Upload Your Team .csv File
  //             </h3>
  //             <div>
  //                 <input type="file" onChange={this.onFileChange} />
  //                 <button onClick={this.onFileUpload}>
  //                   Upload!
  //                 </button>
  //             </div>
  //           {this.fileData()}
  //         </div>
  //       );
  //     }
}

export default uploadFile;