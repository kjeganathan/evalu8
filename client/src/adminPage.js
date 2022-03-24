// Should have an option to choose the default evaluation metrics for their classroom

// Should display calendar to choose dates for attendance if attendance option
// Should have option to choose which evaluations are taking place if attendance option

//Contribution always shows everything

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./adminPage.css";
import logo from "./logo.png";
import "react-pro-sidebar/dist/css/styles.css";
import SideNav from "./sideNav";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const AdminPage = (props) => {
  //get this information from the admin login

  //ATTENDANCE CODE

  //change this to login information
  let admin_name = JSON.parse(localStorage.getItem('username'));
  let admin_course = JSON.parse(localStorage.getItem('course'));

  // end of information from admin login
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState([]);
  //set values to the values of the dates in the admin table
  console.log(values);
  if (values.length != 0) {
    let arrDates = [];
    values.forEach((item) => {
      let year = item["year"];
      let month = item["month"]["number"];
      let day = item["day"];
      let whole_date = year + "/" + month + "/" + day;
      arrDates.push(whole_date);
    });
    console.log("whole_date " + arrDates);

    //push values into the db of the admin
    let data = {
      name: admin_name,
      course: admin_course,
      attendancedates: arrDates,
    };

    fetch("/api/adminAttendance", {
      method: "POST",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: { "Content-Type": "application/json" },
    });
  }

  // EVALUATION CODE

  const [managerEval, setManagerEval] = useState('');
  const [peerEval, setPeerEval] = useState('');
  const [goalEval, setGoalEval] = useState('');

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log("hi");
    console.log("met " + managerEval['Manager Evaluations']);
    console.log("pe " + peerEval['Peer Evaluations']);
    console.log("ge " + goalEval['Goal Setting Evaluations']);

    let arr = [];
    if(managerEval["Manager Evaluations"] != 0){
      arr.push(managerEval);
    }
    if(peerEval["Peer Evaluations"] != 0){
      arr.push(peerEval);
    }
    if(goalEval["Goal Setting Evaluations"] != 0){
      arr.push(goalEval);
    }
    console.log("arr " + arr);

    let admin_name = JSON.parse(localStorage.getItem('username'));
    let admin_course = JSON.parse(localStorage.getItem('course'));


    let data = {name:admin_name, course:admin_course, evalmetrics:arr}
    
    fetch('/api/adminEvalMetrics',{ 
      method:'POST', 
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' } 
    });
    //send arr to backend admin db evalmetrics
  }

  let handleChange1 = (e) => {
    setManagerEval({
      [e.target.name]: e.target.value
    });
    console.log("bye");
  }

  let handleChange2 = (e) => {
    setPeerEval({
      [e.target.name]: e.target.value
    });
    console.log("bye");
  }

  let handleChange3 = (e) => {
    setGoalEval({
      [e.target.name]: e.target.value
    });
    console.log("bye");
  }


  return (
    <div>
      <div className="App-header">
        <div className="flex-admin-page"></div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="adminPage">
        <div className="adminPage-content">
          {/* Put all the code for admin here */}
          <div className="container">
            <div className="row">
              
              <div id="attendance-box" className="col-sm">
                {/* ADMIN CODE */}
                <h3 id="attendance-box-title">Attendance</h3>
                <h5 id="attendance-box-subtitle">Choose Attendance Dates</h5>
                <DatePicker
                  multiple
                  plugins={[<DatePanel />]}
                  value={values}
                  onChange={setValues}
                />
              </div>
              <div id="evaluation-box" className="col-sm">
                <h3 id="evaluation-box-title">Evaluation</h3>
                <h5 id="evaluation-box-subtitle">Choose Number of Evaluations</h5>
                <form onSubmit={handleSubmit}>

                  <label id="evaluation-box-eval" for="manager_eval">Manager Evaluations (0-15):</label>

                  <input
                    type="number"
                    onChange={handleChange1}
                    id="manager_eval"
                    name="Manager Evaluations"
                    min="0"
                    max="15"
                  />

                  <label id="evaluation-box-eval" for="peer_eval">Peer Evaluations (0-15):</label>

                  <input
                    type="number"
                    onChange={handleChange2}
                    id="peer_eval"
                    name="Peer Evaluations"
                    min="0"
                    max="15"
                  />

                  <label id="evaluation-box-eval" for="goal-setting_eval">
                    Goal-Setting Evaluations (0-15):
                  </label>

                  <input
                    type="number"
                    onChange={handleChange3}
                    id="goal-setting_eval"
                    name="Goal Setting Evaluations"
                    min="0"
                    max="15"
                  />
                  <div>
                  <button
                    id="EvalButton"
                    type="submit"
                    className="btn btn-dark"
                  >
                    Submit
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
