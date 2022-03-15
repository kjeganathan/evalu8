import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./engagement.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import logo from "./logo.png";
am4core.useTheme(am4themes_animated);
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import SideNav from "./sideNav";
import MetricsModal from "./metricsModal";

class engagementPage extends Component {

  constructor(){
    super();

    this.state = { 
      show:false,
      numDaysPresent:0,
      numDaysAbsent:0,
      numDaysExcused:0,
      teamMember:"",
      numManagerEvals:0,
      percentManagerEvals:0,
      percentPeerEvals:0,
      percentGoalEvals:0,
      numPeerEvals:0,
      numGoalEvals:0
    }
    
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  showPresent = () => {
    console.log(this.state.numDaysPresent);
    return this.state.numDaysPresent;
  }

  async componentDidMount() {

    //evaluation calculations
    let count = 0;
    // let evalTypeArr = [];
    // await fetch('/api/getDistinctEvalType',{ 
    //   method:'GET',  
    //   headers:{ 'Content-Type': 'application/json' } 
    // }).then((response) => response.json())
    // .then(async (responseJSON) => {
    //   responseJSON.forEach(async (item) => {
    //   console.log(item['evaltype']);
    //           if(item['evaltype' !=null]){
    //             evalTypeArr.push(item['evaltype']);
    //           }
    //         });
    // });
    // console.log(evalTypeArr);
    
    let numTotalEvals = 3; //CHANGE THIS TO BE DYNAMIC LATER and grabbed from db
    
        await fetch('/api/getEvalByMember',{ 
          method:'POST',
          body: JSON.stringify({teammemberinfo:'Jane Dore', ischecked:true}), 
          headers:{ 'Content-Type': 'application/json' } 
        }).then((responsenext) => responsenext.json())
        .then(async (responseJSONnext) => {
          console.log(responseJSONnext); //this is the result
          responseJSONnext.forEach((item) => {
            console.log(item['evaltype'] == 'Manager Evaluations');
            if(item['evaltype'] == 'Manager Evaluations'){
              let newState = this.state.numManagerEvals + 1;
              console.log("new" + newState);
              let newPercent = ((100 * newState) / numTotalEvals).toFixed(0);
               this.setState({
                numManagerEvals: newState,
                percentManagerEvals:newPercent
              });
            }
            if(item['evaltype'] == 'Peer Evaluations'){
              console.log(item['evaltype'] == 'Peer Evaluations');
              let newPeerState = this.state.numPeerEvals + 1;
              console.log("newPeerState" + newPeerState);
              let newPeerPercent = ((100 * newPeerState) / numTotalEvals).toFixed(0);
              this.setState({
               numPeerEvals: newPeerState,
               percentPeerEvals:newPeerPercent
             });
           }
           if(item['evaltype'] == 'Goal Setting Evaluations'){
            let newGoalState = this.state.numGoalEvals + 1;
            let newGoalPercent = ((100 * newGoalState) / numTotalEvals).toFixed(0);
            this.setState({
             numGoalEvals: newGoalState,
             percentGoalEvals:newGoalPercent
           });
         }
              
          });
          
          
        });
      
   
    

    //attendance calculations
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(85),
      })
    );

    chart.children.unshift(am5.Label.new(root, {
      text: "Attendance",
      fontSize: 25,
      fontWeight: "300",
      fill: am5.color(0xffffff),
      textAlign: "center",
      x: am5.percent(50),
      centerX: am5.percent(50),
      y:am5.percent(45),
      centerY: am5.percent(50),
      paddingTop: 0,
      paddingBottom: 0
    }));
    
    let team_member = JSON.parse(localStorage.getItem('team_member'));
    let github_username = team_member['github_username'];

    await fetch('/api/getMemberAttendanceByDate',{ 
      method:'POST', 
      body: JSON.stringify({teammemberinfo:github_username}), 
      headers:{ 'Content-Type': 'application/json' } 
    }).then((response) => response.json())
    .then(async (responseJSON) => {
      console.log(responseJSON); //this is the result
      responseJSON.forEach((item) => {
        if(item["status"] === "excused"){
          let newState = this.state.numDaysExcused + 1;
          this.setState({
            numDaysExcused: newState,
          });
        }
        if(item["status"] === "present"){
          let newState = this.state.numDaysPresent + 1;
          this.setState({
            numDaysPresent: newState,
          });
        }
        if(item["status"] === "absent"){
          let newState = this.state.numDaysAbsent+1;
          this.setState({
            numDaysAbsent: newState,
          });
        }
      })
    })
    .catch((error) => {
      console.log("reset client error-------",error);
 });

    // Define data
    let data = [
      {
        country: "Absent",
        sales: this.state.numDaysAbsent,
        sliceSettings: {
          fill: am5.color(0xa53860),
          stroke: am5.color(0xa53860),
        },
      },
      {
        country: "Present",
        sales: this.state.numDaysPresent,
        sliceSettings: {
          fill: am5.color(0x028fa3),
          stroke: am5.color(0x028fa3),
        },
      },
      {
        country: "Excused",
        sales: this.state.numDaysExcused,
        sliceSettings: {
          fill: am5.color(0xedae49),
          stroke: am5.color(0xedae49),
          
        },
      },
    ];

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "sales",
        categoryField: "country",
        alignLabels: false,
        // legendValueText: "[bold {sliceSettings.fill}]{value}[/]"
      })
    );

    series.labels.template.setAll({
      // text: "{sales}",
      textType: "circular",
      inside: true,
      radius: 10,
      fontSize: 16,
      fill: am5.color(0xffffff),
    });

    series.slices.template.setAll({
      tooltipText: "{country}",
      label: "{country}",
      templateField: "sliceSettings",
    });

    series.data.setAll(data);

    series.slices.template.setAll({});

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    this.root = root;

    series.appear(1600); //time for table automation
    chart.appear();

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        // centerX: am5.percent(50),
        // x: am5.percent(50),
        // layout: root.horizontalLayout,
        centerX: am5.percent(50),
      x: am5.percent(50),
    layout: root.verticalLayout
        // height: am5.percent(100)
      })
    );
    legend.data.setAll(series.dataItems);
    legend.labels.template.setAll({
      fontSize: 16,
      fontWeight: "300",
      fill: am5.color(0xffffff)
    });
    
    
    legend.valueLabels.template.setAll({
      fontSize: 16,
      fontWeight: "bold",
      fill: am5.color(0x028fa3)
    });
    legend.markerRectangles.template.setAll({
      cornerRadiusTL: 10,
      cornerRadiusTR: 10,
      cornerRadiusBL: 10,
      cornerRadiusBR: 10
    });
  }

  componentWillUnmount() {
    if (this.root) {
      this.root.dispose();
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
        <div className="engagementPage">
          <div className="engagementPage-content">
          <div className="flex-engagement-header">
          <h1 className="engagement-header">Engagement </h1>
          
          {/* <div id="team-member-profile">
            Jane Doe &nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="3vw" height="4vh" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            </div> */}
            </div>
          <hr className="header-line"></hr>
            <div className="dashboard-header-buttons-container">
              <button id="engagement-header-button" className="btn btn-dark">Engagement</button>
              <button id="contribution-header-button" className="btn btn-dark">Contribution</button>
              <button id="progress-header-button" className="btn btn-dark">Progress</button>
              <button onClick={this.showModal} id="additional-metrics-button" className="btn btn-dark"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              </button>
              <MetricsModal
                    show={this.state.show}
                    onHide={this.hideModal}
              />

            </div>
            <hr className="header-line"></hr>
            <div className="container">
              <div className="row">
                <div id="chart" className="col-md">
                  <div className="attendance-table">
                    <div
                      id="chartdiv"
                      // style={{ width: "100%", height: "40vmax" }}
                    ></div>
                  </div>
                </div>
                <div className="col-sm">
                  <div id="numDays">
                    Number of days
                    <br />
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col-sm">
                          <div className="attended">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="85"
                              height="86"
                              fill="#00798C"
                              class="bi bi-person-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <br />
                            Attended
                            <hr className="attended-line"></hr>
                            <div id="attendance-number">{this.state.numDaysPresent}</div>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="attended">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="85"
                              height="86"
                              fill="#2da6b8"
                              class="bi bi-person-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <br />
                            Absent
                            <hr className="attended-line"></hr>
                            <div id="attendance-number">{this.state.numDaysAbsent}</div>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="attended">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="85"
                              height="86"
                              fill="#7cebfc"
                              class="bi bi-person-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                            <br />
                            Excused
                            <hr className="attended-line"></hr>
                            <div id="attendance-number">{this.state.numDaysExcused}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="numEvals">
                    Number of evals completed
                    <br />
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col-sm">
                          <div className="attended">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="85"
                              height="86"
                              fill="#A53860"
                              class="bi bi-file-earmark-text-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                            </svg>
                            <br />
                            <br />
                            Manager
                            <hr className="attended-line"></hr>
                            <div id="attendance-number">{this.state.percentManagerEvals + "%"}</div>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="attended">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="85"
                              height="86"
                              fill="#bd5d80"
                              class="bi bi-file-earmark-text-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                            </svg>
                            <br />
                            <br />
                            Peer
                            <hr className="attended-line"></hr>
                            <div id="attendance-number">{this.state.percentPeerEvals + "%"}</div>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="attended">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="85"
                              height="86"
                              fill="#f2afc8"
                              class="bi bi-file-earmark-text-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                            </svg>
                            <br />
                            <br />
                            Goal Setting
                            <hr className="attended-line"></hr>
                            <div id="attendance-number">{this.state.percentGoalEvals + "%"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div class="col-sm">One of three columns</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default engagementPage;
