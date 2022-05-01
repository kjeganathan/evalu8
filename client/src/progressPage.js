import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { ProgressBar } from "react-bootstrap";
import "./engagement.css";
import logo from "./logo.png";
import SideNav from "./sideNav";
import MetricsModal from "./metricsModal";
import "./progressPage.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { CSVReader } from 'react-papaparse'

const buttonRef = React.createRef()


class progressPage extends Component {

    constructor(){
        super();
        this.state = {
            isNewTeamMember:true,
            progress:0,
            pace:0,
            satisfaction:0,
            environment:0,
            team_member_username:" "

        }
    }

    routeChangeToEngagement=()=> {
        this.props.history.push("/engagement");
    }
    
    routeChangeToContribution=()=> {
      this.props.history.push("/contribution");
    }

    componentDidMount = async() => {

      //setting profile username

      let teamMember = JSON.parse(localStorage.getItem('team_member'));
    console.log("team " + teamMember);
    let teamMember_github_username = teamMember["github_username"];
    let teamMember_name = teamMember["name"];
    console.log(teamMember_github_username);
    console.log(teamMember_name);
    //Setting profile name
    if(teamMember_name == undefined){
      this.setState({
        team_member_username: teamMember_github_username,
      });
    }else{
      this.setState({
        team_member_username: teamMember_name,
      });
    }

        let team_member_info = JSON.parse(localStorage.getItem("team_member"));
        let team_member_email = team_member_info["email"];
        let coursedata = JSON.parse(localStorage.getItem("course"));
        await fetch('/api/getProgressByEmailAndCourse',{ 
            method:'POST', 
            body: JSON.stringify({email:team_member_email, course:coursedata}), 
            headers:{ 'Content-Type': 'application/json' } 
          }).then(async (response) => 
          {
            let resp = await response.json();

            if(resp.length == 0){ //if we get back nothing we know that there is no row of that team member in the db
                this.setState({ isNewTeamMember:true });
            }else{
                this.setState({ isNewTeamMember:false });
            }
            console.log("this.state: " + this.state.isNewTeamMember);
            if(this.state.isNewTeamMember == false){ //if the table is filled
                console.log("resp: " + JSON.stringify(resp[0]["progress"]));
                //set states for everything
                this.setState({ progress: (resp[0]["progress"]*20) });
                this.setState({ pace: (resp[0]["pacing"]*20) });
                this.setState({ environment: (resp[0]["environment"]*20) });
                this.setState({ satisfaction: (resp[0]["satisfaction"]*20) });
            }else{
                this.setState({ progress:0 });
                this.setState({ pace:0 });
                this.setState({ environment:0 });
                this.setState({ satisfaction:0 });
            }
            
            
            
          });

    }

    handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.open(e)
        }
      }

      handleOnFileLoad = (data) => {
        console.log('---------------------------')
        console.log(data[0]['data'])
        let dataTitle = data[0]['data'];
        let countHeader = 0; //countHeader is the index or col the email address header is found
        for(let i = 0; i<dataTitle.length; i++){ //iterating through csv headers/titles
            if(dataTitle[i] != "Email address"){
                countHeader++;
            }else{
                break;
            }
        }

        console.log(countHeader);
        console.log(data[1]);
        let team_member_info = JSON.parse(localStorage.getItem("team_member"));
        let team_member_email = team_member_info["email"];//got the team member we are looking at email 

        data.forEach((item) => {
            console.log(item["data"][countHeader]);
            if(item["data"][countHeader] == team_member_email){ //you are doing this for a single team member whose email matches the .csv email
                console.log("true: " + team_member_email);
                let required_data = item["data"];
                //SAVE ALL THE REQUIRED FIELDS TO THE DB FOR THIS TEAM MEMBER IF THEY DO NOT ALREADY EXIST OTHERWISE UPDATE
                //fields are progress, pacing, satisfaction, environment
                //add fields course (localStorage) and email (team_member)
                let coursedata = JSON.parse(localStorage.getItem("course"));
                const data = {
                    progress: parseInt(item["data"][13]),
                    pacing: parseInt(item["data"][15]),
                    satisfaction: parseInt(item["data"][14]),
                    environment:parseInt(item["data"][17]),
                    email: team_member_email,
                    course: coursedata
                  };
                  if(this.state.isNewTeamMember == true){
                    //Fetch request to create an account for a new manager
                    fetch("/api/addProgress", {
                        method: "POST",
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: { "Content-Type": "application/json" },
                      })
                  }else{
                      //update existing team member with different data
                      fetch("/api/updateProgress", {
                        method: "POST",
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: { "Content-Type": "application/json" },
                      })
                  }
                  
                 

            }

        })
      }

      handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
      }
    
      handleOnRemoveFile = (data) => {
        console.log('---------------------------')
        console.log(data)
        console.log('---------------------------')
      }
    
      handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.removeFile(e)
        }
      }


  render() {
    return (
      <div>
        <div className="App-header">
          <div>
            <SideNav />
          </div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="progressPage">
          <div className="progressPage-content">
            <div className="flex-progress-header">
              <h1 className="progress-header">Progress </h1>

              {/* <div id="team-member-profile">
            Jane Doe &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="3vw" height="4vh" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            </div> */}
              <div id="team-member-profile-cp">
                {this.state.team_member_username} &nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3vw"
                  height="4vh"
                  fill="currentColor"
                  class="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
              </div>
            </div>
            <hr className="header-line"></hr>
            <div className="dashboard-header-buttons-container">
              <button
                id="engagement-header-button-pb"
                onClick={this.routeChangeToEngagement}
                className="btn btn-dark"
              >
                Engagement
              </button>
              <button
                id="contribution-header-button-pb"
                onClick={this.routeChangeToContribution}
                className="btn btn-dark"
              >
                Contribution
              </button>
              <button id="progress-header-button-pb" className="btn btn-dark">
                Progress
              </button>
            </div>
            <hr className="header-line"></hr>

            <>
              <br />
              <h5 id="upload-title-text">Upload Goal Setting Survey CSV</h5>
              <br />
              <CSVReader
                ref={buttonRef}
                onFileLoad={this.handleOnFileLoad}
                onError={this.handleOnError}
                noClick
                noDrag
                onRemoveFile={this.handleOnRemoveFile}
                className="uploadbar"
              >
                {({ file }) => (
                  <aside
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 10,
                    }}
                  >
                    <button
                      type="button"
                      id="browse-button"
                      onClick={this.handleOpenDialog}
                      style={{
                        borderRadius: 0,
                        marginLeft: "20%",
                        marginRight: 0,
                        width: "10%",
                        paddingLeft: 0,
                        paddingRight: 0,
                      }}
                    >
                      Browse file
                    </button>
                    <button
                      id="remove-button"
                      style={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        // width:'10%'
                      }}
                      onClick={this.handleRemoveFile}
                    >
                      Remove file
                    </button>
                    &nbsp; &nbsp;
                    <div
                      id="loaderBar"
                      style={{
                        borderWidth: 1,
                        height: 45,
                        lineHeight: 2.5,
                        marginTop: 5,
                        marginBottom: 5,
                        paddingLeft: 13,
                        paddingTop: 3,
                        width: "40%",
                      }}
                    >
                      {file && file.name.slice(0, 50)}
                    </div>
                  </aside>
                )}
              </CSVReader>
            </>

            <div className="container">
              <div className="row">
                <div class="col-sm">
                  <div id="progress-box">
                    <div id="progress-header">Progress</div>
                    <div id="progress-box-level">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="206"
                        height="206"
                        fill="#00798C"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg> */}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="progress-icon"
                        width="206"
                        height="206"
                        fill="#00798C"
                        class="bi bi-bar-chart-line-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
                      </svg>
                      <div id="progress-percent">{this.state.progress}%</div>
                    </div>
                  </div>
                </div>
                <div class="col-sm">
                  <div id="progress-bar-box">
                    <div id="satisfaction-header">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="#00798C"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>{" "}
                      &nbsp; Satisfaction :{" "}
                      <span id="progressbar-percent">
                        {this.state.satisfaction}%{" "}
                      </span>
                      <br />
                      <br />
                      <ProgressBar
                        className="progressBar"
                        now={this.state.satisfaction}
                        variant="warning"
                      />
                    </div>
                    <br />

                    <div id="pace-header">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="#00798C"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>{" "}
                      &nbsp; Pacing :{" "}
                      <span id="progressbar-percent">{this.state.pace}% </span>
                      <br />
                      <br />
                      <ProgressBar
                        className="progressBar"
                        now={this.state.pace}
                        variant="warning"
                      />
                    </div>
                    <br />

                    <div id="environment-header">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="#00798C"
                        class="bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>{" "}
                      &nbsp; Environmental Impact :{" "}
                      <span id="progressbar-percent">
                        {this.state.environment}%{" "}
                      </span>
                      <br />
                      <br />
                      <ProgressBar
                        className="progressBar"
                        now={this.state.environment}
                        variant="warning"
                      />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default progressPage;
