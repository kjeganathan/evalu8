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
    <AttendanceModalItem></AttendanceModalItem>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;
