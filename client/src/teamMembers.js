import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./teamMembers.css";
import logo from "./logo.png";
import SideNav from "./sideNav";
import { ResizeSensor } from "@amcharts/amcharts4/.internal/core/utils/ResizeSensor";
import TeamMembersCol from "./teamMembersCol";
import TeamSideNav from "./teamMemberSideNav";

class teamMembers extends Component {

  constructor(){
    super();

    this.state = {
      teamMember_count:0,
      token:""
      };
  }

  getTeamMembers = async () => {

    let jsoncourse = JSON.parse(localStorage.getItem('course'));
    let github_username = JSON.parse(localStorage.getItem('github_username'));

    await fetch('/api/getAllTeamMembersByManagerAndCourse',{ 
      method:'POST', 
      body: JSON.stringify({manager_name:github_username, course:jsoncourse}), 
      headers:{ 'Content-Type': 'application/json' } 
    }).then(async (response) => 
    {
      let resp = await response.json();
      console.log(resp);
      
      let team_github_username_arr = [];
      let team_member_arr = [];
      let team_member_name = [];
      // response.json();
      resp.forEach((item) => {
        team_member_arr.push(item);
        team_github_username_arr.push(item['github_username']);
        team_member_name.push(item['name']);
      })
      localStorage.setItem('team_member_github_username', JSON.stringify(team_github_username_arr));
      localStorage.setItem('team_member_name', JSON.stringify(team_member_name)); 
      localStorage.setItem('team_member_arr', JSON.stringify(team_member_arr)); 

    });
  }

  getAttendanceDates = () => {
    let admin_name = JSON.parse(localStorage.getItem('admin'));
    let admin_course = JSON.parse(localStorage.getItem('course'));
  // const [newdates, setDates] = useState([]);
    let data2 = {name:admin_name, course:admin_course}
  fetch('/api/getAttendanceByAdmin',{ 
    method:'POST', 
    body: JSON.stringify(data2), // data can be `string` or {object}!
    headers:{ 'Content-Type': 'application/json' } 
  }).then((responsenext) => responsenext.json())
  .then(async (responseJSONnext) => {
    console.log("res " + responseJSONnext[0]['attendancedates']); //this should be the dates
    // setDates(responseJSONnext[0]['attendancedates'])
    localStorage.setItem('attendance_dates', JSON.stringify(responseJSONnext[0]['attendancedates']))
  });
  }

  getEvaluationArray = () => {
    //DATA STORED IN DB
  //get the dates from the db
  let admin_name = JSON.parse(localStorage.getItem('admin'));
    let admin_course = JSON.parse(localStorage.getItem('course'));
  // const [newdates, setDates] = useState([]);
  let data2 = {name:admin_name, course:admin_course}
  fetch('/api/getEvalMetricsByAdmin',{ 
    method:'POST', 
    body: JSON.stringify(data2), // data can be `string` or {object}!
    headers:{ 'Content-Type': 'application/json' } 
  }).then(async (response) => 
  {
    let resp = await response.json();
    console.log("resp:" + resp[0]['evalmetrics']);
    
    let eval_arr = [];
    // response.json();
    resp[0]['evalmetrics'].forEach((item) => {
      eval_arr.push(JSON.parse(item));
    })
    console.log(eval_arr);
    localStorage.setItem('eval_arr', JSON.stringify(eval_arr))
  });
  }
  
  async componentDidMount(){
    //get number of team members under a manager
    console.log("hello");
    let manager = localStorage.getItem("github_username");
    let course = localStorage.getItem("course");
    let jsonManager = JSON.parse(manager);
    let jsonCourse = JSON.parse(course);
    console.log(manager);
    console.log(course);

    this.getTeamMembers();
    this.getAttendanceDates();
    this.getEvaluationArray();
    
  }
  
  //maybe: if number of managers under a person has n%3==0 make it 3 cols
  //if number of managers under a person has n%4 == 0 make it 4 cols
  //else make it 5 cols
  render() {
    return (
      <div>
        <div className="App-header">
        <div>
            <TeamSideNav />
          </div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="teamMembersPage">
          <div className="teamMembers-header">
            <div className="container">
              <TeamMembersCol></TeamMembersCol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default teamMembers;
