import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./attendanceModalItem.css";
import AttendanceTableMember from "./attendaceTableMembers.js";
import { CSVLink, CSVDownload } from "react-csv";
import { useState, useEffect, useRef } from "react";
import { Accordion } from "react-bootstrap";

const AttendanceModalItem = (props) => {
  let csvDat = [];
  let newCSVData = [];
  let valLargeObj = {};
  let i = 0;
  let attendance_status = props.attendanceStatus;
  console.log("attendanceStatusArr:" + attendance_status);
  let coursedata = JSON.parse(localStorage.getItem("course"));
  let managerdata = JSON.parse(localStorage.getItem("github_username"));
  //   let newVal = useRef('');

  let getcsvData = async (dateitem) => {
    //call this in dateItem forEach
    let newdata = { date: dateitem, course: coursedata, manager: managerdata };

    fetch("/api/getAllAttendanceByDate", {
      method: "POST",
      body: JSON.stringify(newdata), // data can be `string` or {object}!
      headers: { "Content-Type": "application/json" },
    })
      .then((responsenext) => responsenext.json())
      .then(async (responseJSONnext) => {
        console.log("csvData: " + responseJSONnext);
        csvDat = [["Last Name", "First Name", "Email Address", "", "Attend"]];
        responseJSONnext.forEach((item) => {
          console.log("csvitem2: " + item["teammemberinfo"]);
          //csv.push(["hello", "goodbye", "lastnight", "e", "a"]);
          let nameArr = "";
          let firstName = "";
          let lastName = "";
          if (item["fullname"].length != 0) {
            nameArr = item["fullname"].split(" ");
            firstName = nameArr[0];
            lastName = nameArr[1];
          }
          csvDat.push([
            lastName,
            firstName,
            item["email"],
            "",
            item["status"].charAt(0).toUpperCase(),
          ]);
        });
        console.log("csvIS2: " + csvDat);
        newCSVData.push(csvDat);
        console.log("newCSVData: " + newCSVData);
        localStorage.setItem("csvdata2", JSON.stringify(newCSVData));
      });
  };

  let returnVal = (val) => {
    return val;
  };

  let getChildPresent = (val) => {
    returnVal(val);
  };

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

  let dates = JSON.parse(localStorage.getItem("attendance_dates"));
  let count = 1;
  let attendanceStatusArr = [];
  let statusForAttendance = "";

  console.log("dates: " + dates);
  if (dates != null) {
    dates.forEach((dateitem) => {
      getcsvData(dateitem);
      for (let i = 0; i < attendance_status.length; i++) {
        console.log("attendanceobj:" + attendance_status[i]);
        console.log("flag: " + (attendance_status[i]["date"] == dateitem));
        if (attendance_status[i]["date"] == dateitem) {
          statusForAttendance = attendance_status[i]["status"];
          console.log("statusForAttendance:" + statusForAttendance);
          break;
        } else {
          continue;
        }
      }

      let recordedData = [];
      let newDataSaved = JSON.parse(localStorage.getItem("csvdata2"));
      if (newDataSaved != null) {
        recordedData = newDataSaved[parseInt(count - 1)];
      }

      console.log("newDataSaved: " + newDataSaved);
      element = (
        // <Collapsible id="meeting-list" trigger={"MEETING " + count + ": " + dateitem + "  |  " + statusForAttendance}>
        //   <br/>
        //   <CSVLink className="csvlink" data={recordedData}>Download Attendance Sheet</CSVLink>
        //   <br/>
        //   <br/>
        //   <Table striped bordered hover variant="dark" className="attendanceTable">
        //     <thead>
        //       <tr id="tableBorder">
        //         <th>#</th>
        //         <th>Github Username</th>
        //         <th>Course</th>
        //         <th>Attendance</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {/* data sends the date to the child component */}
        //       <AttendanceTableMember
        //         data={dateitem}
        //         sendData={getData}
        //         sendCheckedPresent={getChildPresent}
        //         checkPresent = {returnVal}
        //       ></AttendanceTableMember>
        //     </tbody>
        //   </Table>
        // </Collapsible>
        <Accordion defaultActiveKey="0" className="attendanceAccordion">
          <Accordion.Item eventKey={count - 1}>
            <Accordion.Header className="accordionTitle">
              {"MEETING " +
                count +
                ": " +
                dateitem +
                "  |  " +
                statusForAttendance}
            </Accordion.Header>
            <Accordion.Body>
              <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#a53860"
                class="bi bi-download"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
              </svg>
              &nbsp;
              <CSVLink className="csvlink" data={recordedData}>
                Download Attendance Sheet
              </CSVLink>
              <br />
              <br />
              <Table
                striped
                bordered
                hover
                variant="dark"
                className="attendanceTable"
              >
                <thead>
                  <tr id="tableBorder">
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
                    checkPresent={returnVal}
                  ></AttendanceTableMember>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
      elementArr.push(element);
      count++;
      console.log(elementArr);
    });
  }

  return elementArr;
};

export default AttendanceModalItem;
