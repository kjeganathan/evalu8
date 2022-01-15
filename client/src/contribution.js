import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./contribution.css";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import logo from "./logo.png";
am4core.useTheme(am4themes_animated);
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import SideNav from "./sideNav";

class contributionPage extends Component {
  render() {
    return (
      <div>
        {/* <ProSidebar collapsed="true">
  <Menu iconShape="square">
    <MenuItem icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gem" viewBox="0 0 16 16">
  <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/>
</svg>}>Dashboard</MenuItem>
    <SubMenu title="Components" icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>}>
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
  </Menu>
</ProSidebar> */}

        <div className="App-header">
          <div className="flex-contribution-page"></div>
          <div>
            <SideNav />
          </div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="contributionPage">
          <div className="engagementPage-content">
            <div className="flex-engagement-header">
              <h1 className="contribution-header">Contribution </h1>

              <div id="team-member-profile-cp">
                Jane Doe &nbsp;
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
                id="engagement-header-button-contributionpage"
                className="btn btn-dark"
              >
                Engagement
              </button>
              <button
                id="contribution-header-button-contributionpage"
                className="btn btn-dark"
              >
                Contribution
              </button>
              <button
                id="progress-header-button-contributionpage"
                className="btn btn-dark"
              >
                Progress
              </button>
              <button
                id="additional-metrics-button-contributionpage"
                className="btn btn-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </button>
            </div>
            <hr className="header-line"></hr>
            <div className="container">
              <div className="row">
                <div id="commit-box" className="col-sm">
                  <div className="commit-table">
                    <h1 className="commit-info-number">10</h1>
                    <h4 className="commit-info-text">TOTAL COMMITS</h4>
                  </div>

                  <div className="commit-table">
                    <h1 className="commit-info-number">70</h1>
                    <h4 className="commit-info-text">TOTAL LINES OF CODE</h4>
                  </div>
                </div>

                <div id="tasks-box" className="col-sm">
                  <div id="numTasks">
                    Number of Tasks
                    <br />
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col-sm">
                          <div className="tasks">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="80"
                              height="81"
                              fill="#bd5d80"
                              class="bi bi-clipboard-data"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                            </svg>
                            <br />
                            <br />
                            Assigned
                            <hr className="task-line"></hr>
                            <div id="task-number">9</div>
                          </div>
                        </div>
                        <div className="col-sm">
                          <div className="tasks">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="80"
                              height="81"
                              fill="#f2afc8"
                              class="bi bi-clipboard-check"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                              />
                              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                            </svg>
                            <br />
                            <br />
                            Completed
                            <hr className="task-line"></hr>
                            <div id="task-number">1</div>
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

export default contributionPage;
