import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./attendanceModalItem.css";
import AttendanceTableMember from "./attendaceTableMembers.js";

const AttendanceModalItem = (props) => {
  let valLargeObj = {};
  let i = 0;

  let getData = (val) => {
    let flag = true;
    console.log("getData" + val); //val is the present status, name of the person, date from the child component
    let valDivideArr = val.split(",");
    let valObj = {};
    //These are the characteristics of a new element
    valObj.status = valDivideArr[0];
    valObj.name = valDivideArr[1];
    valObj.date = valDivideArr[2];
    //Don't push those elements with the same date and team member into the array
    //DO A CHECK HERE
    Object.keys(valLargeObj).forEach((key) => {
      if (valLargeObj[key] != undefined) {
        console.log(valLargeObj[key]["name"]);

        if (
          valLargeObj[key]["name"] === valObj["name"] &&
          valLargeObj[key]["date"] === valObj["date"]
        ) {
          console.log("hi");
          //delete the old object with the match
          delete valLargeObj[key];
          flag = false; //means something was deleted
          console.log("flag is false");
        }
      }
    });

    //Add the new element to the large object whether or not anything has been deleted beforehand
    valLargeObj[i] = valObj; // add the new item where there are no matches
    i++;
    console.log(valLargeObj);
    props.sendChildData(JSON.stringify(valLargeObj));
  };

  

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
            {/* data sends the date to the child component */}
            <AttendanceTableMember
              data={date}
              sendData={getData}
            ></AttendanceTableMember>
          </tbody>
        </Table>
      </Collapsible>
    );
    elementArr.push(element);
    count++;
    console.log(elementArr);
  });

  return elementArr;
};

export default AttendanceModalItem;
