import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import AttendanceModalItem from "./attendanceModalItem";
import ReactDOM from 'react-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const AttendanceModal = (props) => {

  const [parsedVal, setStateParsedVal] = useState('');
  let valArr = [];
  let numChanges = 0;

  let handleSubmit = async () => {
    let slicedArr = valArr.slice(Math.max(valArr.length - numChanges, 0));
    let newArr = [];
    for(let i = 0; i<slicedArr.length;i++){
      let splitArr = slicedArr[i].split(",");
      newArr.push(splitArr);
    }
    
    newArr.forEach(async (element) => {
      console.log(element);
      let data = {status: element[0], teammemberinfo:element[1], date:element[2]};
        await fetch('/api/addAttendanceByDate',{ 
        method:'POST', 
        body: JSON.stringify({status:element[0], teammemberinfo:element[1], date:element[2]}), 
        headers:{ 'Content-Type': 'application/json' } 
      }).then((response) => response.json())
        .then((responseJSON) => {
        console.log(responseJSON)
      })
      .catch((error) => {
        console.log("reset client error-------",error);
   });
    });

  }
  

  let getChildData = (val) => {
    let parsed = JSON.parse(val);
    numChanges = Object.keys(parsed).length;
    Object.keys(parsed).forEach((key) => {
      valArr.push(parsed[key]['status'] + "," + parsed[key]['name'] + "," + parsed[key]['date']);
      console.log(parsed[key]['status'] + "," + parsed[key]['name'] + "," + parsed[key]['date']);
      //let data = {status: parsed[key]['status'], teammemberinfo:parsed[key]['name'], date:parsed[key]['date']};
  //     fetch('/api/addAttendanceByDate',{ 
  //       method:'POST', 
  //       body: JSON.stringify(data), // data can be `string` or {object}!
  //       headers:{ 'Content-Type': 'application/json' } 
  //     }).then((response) => response.json())
  //       .then((responseJSON) => {
  //       console.log(responseJSON)
  //     })
  //     .catch((error) => {
  //       console.log("reset client error-------",error);
  //  });
    });
  }



  
    // let parsedData = parsed[1];
    // console.log("getChildData" + parsedData.name); //val is the present status, name of the person, date from the child component


  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  let teamMembers = ["Sam Collins", "Derek Hawkins", "Chloe Knight"];

  const [values, setValues] = useState([]);

  // for each date we want to generate a new meeting WHICH IS a new collapsible trigger

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Attendance Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4>Centered Modal</h4> */}
        <DatePicker 
      multiple
      plugins={[
        <DatePanel />
       ]}
      value={values} 
      onChange={setValues}
    />
    <br/>
    <br/>
    <AttendanceModalItem sendChildData={getChildData}></AttendanceModalItem>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Done</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;
