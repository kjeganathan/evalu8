import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./attendanceModalItem.css";
import AttendanceTableMember from "./attendaceTableMembers.js";
import { CSVLink, CSVDownload } from "react-csv";
import { useState, useEffect, useRef } from "react";

const AttendanceModalItem = (props) => {
  let csvDat = [];
  let newCSVData = [];
  let valLargeObj = {};
  let i = 0;
  let attendance_status = props.attendanceStatus;
  console.log("attendanceStatusArr:" + attendance_status);
  let coursedata = JSON.parse(localStorage.getItem("course"));
//   let newVal = useRef('');

let getcsvData = async (dateitem) => { //call this in dateItem forEach
  let newdata = {date:dateitem, course:coursedata}
    
    fetch('/api/getAllAttendanceByDate',{ 
      method:'POST', 
      body: JSON.stringify(newdata), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' } 
    }).then((responsenext) => responsenext.json())
    .then(async (responseJSONnext) => {
      console.log("csvData: " + responseJSONnext);
    csvDat = [["Last Name", "First Name", "Email Address", "", "Attend"]]
    responseJSONnext.forEach((item) => {
      console.log("csvitem2: " + item['teammemberinfo']);
      //csv.push(["hello", "goodbye", "lastnight", "e", "a"]);
      let nameArr = "";
      let firstName = "";
      let lastName = "";
      if(item['fullname'].length != 0){
        nameArr = item['fullname'].split(" ");
        firstName = nameArr[0];
        lastName = nameArr[1];
      }
      csvDat.push([lastName, firstName, item['email'], "", item['status'].charAt(0).toUpperCase()])
    })
    console.log("csvIS2: " + csvDat);
    newCSVData.push(csvDat);
    localStorage.setItem("csvdata2", JSON.stringify(newCSVData));
    })

}

  let returnVal = (val) => {
      return val;
  }

  let getChildPresent = (val) => {
      returnVal(val);
  }
 
  let getData = (val) => {
    let flag = true;
    console.log("getData" + val); //val is the present status, name of the person, date from the child component
    let valDivideArr = val.split(",");
    let valObj = {};
    //These are the characteristics of a new element
    valObj.status = valDivideArr[0];
    valObj.name = valDivideArr[1];
    valObj.date = valDivideArr[2];
    valObj.fullname = valDivideArr[3];
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
    console.log("valLargeObj: " + JSON.stringify(valLargeObj));
    props.sendChildData(JSON.stringify(valLargeObj));
  };

  

  let element = "";
  let elementArr = [];

  let dates = JSON.parse(localStorage.getItem('attendance_dates'));
  let count = 1;
  let attendanceStatusArr = [];
  let statusForAttendance = "";
  dates.forEach((dateitem) => {
    getcsvData(dateitem);
    for(let i = 0; i<attendance_status.length; i++){
      console.log("attendanceobj:"+ attendance_status[i]);
      console.log("flag: "+ (attendance_status[i]['date'] == dateitem))
      if(attendance_status[i]['date'] == dateitem){
        statusForAttendance = attendance_status[i]['status'];
        console.log("statusForAttendance:" + statusForAttendance);
        break;
      }else{
        continue;
      }
    }
    let newDataSaved = JSON.parse(localStorage.getItem("csvdata2")); 
    console.log("newDataSaved: " + newDataSaved[0]);
    
    element = (
      <Collapsible id="meeting-list" trigger={"Meeting " + count + ": " + dateitem + "  |  " + statusForAttendance}>
        <CSVLink data={newDataSaved[parseInt(count-1)]}>Download me</CSVLink>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Github Username</th>
              <th>Course</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {/* data sends the date to the child component */}
            <AttendanceTableMember
              data={dateitem}
              sendData={getData}
              sendCheckedPresent={getChildPresent}
              checkPresent = {returnVal}
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
