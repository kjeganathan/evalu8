import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import './attendanceModalItem.css';
import AttendanceTableMember from './attendaceTableMembers.js';

const AttendanceModalItem = (props) => {
    let element = "";
    let elementArr = [];
    let dates = ["2022/01/04", "2022/01/11", "2022/01/21"];
    let count = 1;
    dates.forEach((date) => {
        console.log(date);
        element = (
        <Collapsible id="meeting-list" trigger={"Meeting " + count + ": " + date}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
              <AttendanceTableMember></AttendanceTableMember>
          </tbody>
        </Table>
      </Collapsible>
      );
      elementArr.push(element);
      count++;
      console.log(elementArr);
    }
    );

    return (elementArr);
}

export default AttendanceModalItem;