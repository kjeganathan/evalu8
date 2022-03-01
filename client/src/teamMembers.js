import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./teamMembers.css";
import logo from "./logo.png";
import { ResizeSensor } from "@amcharts/amcharts4/.internal/core/utils/ResizeSensor";
import TeamMembersCol from "./teamMembersCol";

class teamMembers extends Component {

  constructor(){
    super();

    this.state = {
      teamMember_count:0,
      };
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
    
  }
  
  //maybe: if number of managers under a person has n%3==0 make it 3 cols
  //if number of managers under a person has n%4 == 0 make it 4 cols
  //else make it 5 cols
  render() {
    return (
      <div>
        <div className="App-header">
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
