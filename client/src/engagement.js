import React, { Component } from "react";
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

class engagementPage extends Component {
  componentDidMount() {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(80),
      })
    );

    // Define data
    let data = [
      {
        country: "Absent",
        sales: 10,
        sliceSettings: {
          fill: am5.color(0xa53860),
          stroke: am5.color(0xa53860),
        },
      },
      {
        country: "Present",
        sales: 9,
        sliceSettings: {
          fill: am5.color(0x028fa3),
          stroke: am5.color(0x028fa3),
        },
      },
      {
        country: "Excused",
        sales: 1,
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
      })
    );

    series.labels.template.setAll({
      textType: "circular",
      inside: true,
      radius: 10,
      fontSize: 12,
      fill: am5.color(0xffffff),
    });

    series.slices.template.setAll({
      tooltipText: "{country}",
      label: "{sales}",
      templateField: "sliceSettings",
    });

    series.data.setAll(data);

    series.slices.template.setAll({});

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    this.root = root;

    series.appear(1600);
    chart.appear();

    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.verticalLayout,
        height: am5.percent(100),
      })
    );
    legend.data.setAll(series.dataItems);
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
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="engagementPage">
          <div className="engagementPage-content">
            <div className="dashboard-header-buttons-container">
              <Button className="engagement-header-button">Engagement</Button>
              <Button className="contribution-header-button">
                Contribution
              </Button>
              <Button className="progress-header-button">Progress</Button>
            </div>
            <div class="container">
              <div class="row">
                <div id="chart" class="col-md">
                  <div className="attendance-table">
                    <div
                      id="chartdiv"
                      style={{ width: "100%", height: "40vmax" }}
                    ></div>
                  </div>
                </div>
                <div class="col-sm">
                  <div id="numDays">
                  Number of days
                  <br/>
                  <br/>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm">
                        <div className="attended">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="86"
                            fill="white"
                            class="bi bi-person-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          </svg>
                          <br />
                          Attended
                          <hr className="attended-line"></hr>
                          <div id="attendance-number">15</div>
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="attended">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="86"
                            fill="white"
                            class="bi bi-person-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          </svg>
                          <br />
                          Absent
                          <hr className="attended-line"></hr>
                          <div id="attendance-number">9</div>
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="attended">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="85"
                            height="86"
                            fill="white"
                            class="bi bi-person-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          </svg>
                          <br />
                          Excused
                          <hr className="attended-line"></hr>
                          <div id="attendance-number">1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>

                  <div id="numEvals">
                  Number of evals completed
                  <br/>
                  <br/>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm">
                        <div className="attended">
                        <svg xmlns="http://www.w3.org/2000/svg" width="85" height="86" fill="white" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
</svg>
                          <br/>
                          <br/>
                          Manager
                          <hr className="attended-line"></hr>
                          <div id="attendance-number">100%</div>
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="attended">
                        <svg xmlns="http://www.w3.org/2000/svg" width="85" height="86" fill="white" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
</svg>
<br/>
                          <br/>
                          Peer
                          <hr className="attended-line"></hr>
                          <div id="attendance-number">75%</div>
                        </div>
                      </div>
                      <div class="col-sm">
                        <div className="attended">
                        <svg xmlns="http://www.w3.org/2000/svg" width="85" height="86" fill="white" class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z"/>
</svg>
                          <br/>
                          <br/>
                          Goal Setting
                          <hr className="attended-line"></hr>
                          <div id="attendance-number">100%</div>
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
