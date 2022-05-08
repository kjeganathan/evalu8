import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CSVLink, CSVDownload } from "react-csv";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import AttendanceModalItem from "./attendanceModalItem";
import ReactDOM from 'react-dom';
import "./attendanceModal.css";

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const AttendanceModal = (props) => {

  let csv = [];
  let csvDat = [];
  let newCSVData = [];
  let valArr = [];
  let numChanges = 0;
  let coursedata = JSON.parse(localStorage.getItem("course"));
  let admindata = JSON.parse(localStorage.getItem("admin"));
  let managerdata = JSON.parse(localStorage.getItem("github_username"));

  

  // let getcsvData2 = async () => {

  //   fetch('/api/getAllAttendance',{ 
  //     method:'GET', 
  //     headers:{ 'Content-Type': 'application/json' } 
  //   }).then((responsenext) => responsenext.json())
  //   .then(async (responseJSONnext) => {
  //     console.log("csvData: " + responseJSONnext);
  //     csv = [["Last Name", "First Name", "Email Address", "", "Attend"]]
  //     responseJSONnext.forEach((item) => {
  //       console.log("csvitem: " + item['teammemberinfo']);
  //       //csv.push(["hello", "goodbye", "lastnight", "e", "a"]);
  //       let nameArr = "";
  //       let firstName = "";
  //       let lastName = "";
  //       let data = item['date'];
  //       if(item['fullname'].length != 0){
  //         nameArr = item['fullname'].split(" ");
  //         firstName = nameArr[0];
  //         lastName = nameArr[1];
  //       }
  //       csv.push([lastName, firstName, item['email'], "", item['status'].charAt(0).toUpperCase()], item['date'])
  //     })
  //     console.log("csvIS: " + csv);
  //     localStorage.setItem("csvdata", JSON.stringify(csv));
  //   });

  // }

  //getcsvData2();

  let getcsvData = async () => {
    let dates = JSON.parse(localStorage.getItem('attendance_dates'));
    //call this in dateItem forEach
    dates.forEach((dateitem) => {
    let newdata = { date: dateitem, course: coursedata, manager: managerdata };

    fetch("/api/getAllAttendanceByDate", {
      method: "POST",
      body: JSON.stringify(newdata), // data can be `string` or {object}!
      headers: { "Content-Type": "application/json" },
    })
      .then((responsenext) => responsenext.json())
      .then(async (responseJSONnext) => {
        console.log("csvData: " + responseJSONnext);
        csvDat = [["Last Name", "First Name", "Email Address", "", "Attend", dateitem]];
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
            dateitem
          ]);
        });
        console.log("csvIS2: " + csvDat);
        newCSVData.push(csvDat); //pushes in csvdata for each date
        console.log("newCSVData: " + newCSVData);
        localStorage.setItem("csvdata2", JSON.stringify(newCSVData));
      });
    });
  };

  let getAttendanceStatus = async () => {
    let dates = JSON.parse(localStorage.getItem('attendance_dates'));
    let attendanceStatusArr = [];
    dates.forEach((dateitem) => {
    let teamMembers = JSON.parse(localStorage.getItem('team_member_arr'));

    let newdata = {date:dateitem, course:coursedata, manager:managerdata}
    
    fetch('/api/getAllAttendanceByDate',{ 
      method:'POST', 
      body: JSON.stringify(newdata), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' } 
    }).then((responsenext) => responsenext.json())
    .then(async (responseJSONnext) => {
      console.log("res " + responseJSONnext);

      console.log("reslength:" + responseJSONnext.length);
      console.log("print:" + (responseJSONnext.length != teamMembers.length));
      console.log("teamMemberlength:" + teamMembers.length);
      let flag = (responseJSONnext.length != teamMembers.length);
      if(flag == true){
        attendanceStatusArr.push({date:dateitem, status:"Incomplete"});
      }
      else{
        attendanceStatusArr.push({date:dateitem, status:"Complete"});
      }
      localStorage.setItem('attendance_status', JSON.stringify(attendanceStatusArr));
      
    });

    // let attendance_status = JSON.parse(localStorage.getItem('attendance_status'));
    // console.log("attendanceStatusArr:" + attendance_status);
  })
}

  let handleSubmit = async () => {
   
    let slicedArr = valArr.slice(Math.max(valArr.length - numChanges, 0));
    console.log("slicedArr: " + slicedArr);
    let newArr = [];
    for(let i = 0; i<slicedArr.length;i++){
      let splitArr = slicedArr[i].split(",");
      newArr.push(splitArr);
    }
    console.log("newArr: " + newArr);

    newArr.forEach(async (element) => {
      console.log(element[3]);
      console.log("element" + element[3] + "teammemberinfo" + element[1]);
      let data = await fetch('/api/viewAttendanceByDate',{ 
        method:'POST', 
        body: JSON.stringify({teammemberinfo:element[1], date:element[2], course:coursedata}), 
        headers:{ 'Content-Type': 'application/json' } 
      }).then((response) => response.json())
        .then(async (responseJSON) => {
        console.log(responseJSON);
        await fetch('/api/emailByGitUsername',{ 
          method:'POST', 
          body: JSON.stringify({name:element[1], course:coursedata}), 
          headers:{ 'Content-Type': 'application/json' } 
        }).then((emailres) => emailres.json())
        .then(async (emailresJSON) => {
          let tm_email = "";
          if(emailresJSON != null){
            tm_email = emailresJSON[0]["email"];
          }
          console.log("email: " + tm_email);
          
          if(responseJSON.length === 0){ //if there is no entry for the attendance of that day for that person
            console.log("name: " + element[3] + " teammember: " + element[1]);
            await fetch('/api/addAttendanceByDate',{ 
              method:'POST', 
              body: JSON.stringify({status:element[0], teammemberinfo:element[1], date:element[2], email:tm_email, course:coursedata, fullname:element[3], admin:admindata, manager:managerdata}), 
              headers:{ 'Content-Type': 'application/json' } 
            }).then((response) => response.json())
            .catch((error) => {
              console.log("reset client error-------",error);
         });
          }else{
            await fetch('/api/updateAttendanceByDate',{ //if there is already an entry for the attendance of that day for that person
              method:'POST', 
              body: JSON.stringify({status:element[0], teammemberinfo:element[1], date:element[2], course:coursedata}), 
              headers:{ 'Content-Type': 'application/json' } 
            }).then((response) => response.json())
            .catch((error) => {
              console.log("reset client error-------",error);
         });
          }
        })
        
      })
      .catch((error) => {
        console.log("reset client error-------",error);
   });
      // let data = {status: element[0], teammemberinfo:element[1], date:element[2]};
        
    });
    // props.onHide;
    // window.location.reload(false);

  }
  

  let getChildData = (val) => {
    let parsed = JSON.parse(val);
    numChanges = Object.keys(parsed).length;
    Object.keys(parsed).forEach((key) => {
      valArr.push(parsed[key]['status'] + "," + parsed[key]['name'] + "," + parsed[key]['date'] + "," + parsed[key]['fullname']);
      console.log("parsedVal: " + parsed[key]['status'] + "," + parsed[key]['name'] + "," + parsed[key]['date'] + "," + parsed[key]['fullname']);
    });
  }



  
    // let parsedData = parsed[1];
    // console.log("getChildData" + parsedData.name); //val is the present status, name of the person, date from the child component

  /* ADMIN PAGE CODE*/

  //get this information from the admin login

  let admin_name = "Cindy Shah";
  let admin_course = "COMPSCI 320";

  // end of information from admin login
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  getAttendanceStatus();
  let attendance_status = JSON.parse(localStorage.getItem('attendance_status'));
  getcsvData();
  let csvData = JSON.parse(localStorage.getItem('csvdata2'));
  //CSV Data
  // getcsvData();
  // let newCSVData = JSON.parse(localStorage.getItem("csvdata"));

  //ADMIN CODE

  // const [values, setValues] = useState([]);
  // //set values to the values of the dates in the admin table
  // console.log(values);
  // if(values.length != 0){
  //   let arrDates = [];
  //   values.forEach((item)=> {
  //     let year = item['year'];
  //     let month = item['month']['number'];
  //     let day = item['day'];
  //     let whole_date = year + "/" + month + "/" + day;
  //     arrDates.push(whole_date);
  //   });
  //   console.log("whole_date " + arrDates);

  //   //push values into the db of the admin
  //   let data = {name:admin_name, course:admin_course, attendancedates:arrDates}
    
  //   fetch('/api/adminAttendance',{ 
  //     method:'POST', 
  //     body: JSON.stringify(data), // data can be `string` or {object}!
  //     headers:{ 'Content-Type': 'application/json' } 
  //   });
  // }

  //ADMIN CODE ENDS

  // for each date we want to generate a new meeting WHICH IS a new collapsible trigger
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="attendanceModal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="attendance-modal-header" id="contained-modal-title-vcenter">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-calendar2-week-fill" viewBox="0 0 16 16">
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/>
                  </svg>
                  &nbsp;
          <div id="attendance-modal-header-text">Attendance Modal</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
  
    <AttendanceModalItem sendChildData={getChildData} attendanceStatus={attendance_status} CSVDat={csvData}></AttendanceModalItem>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Done</Button> */}
        <Button className="attendanceSaveButton" onClick={handleSubmit}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceModal;
