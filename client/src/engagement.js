import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './engagement.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import logo from './logo.png';
am4core.useTheme(am4themes_animated);
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

class engagementPage extends Component {

    componentDidMount() {

    let root = am5.Root.new("chartdiv");

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push( 
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          innerRadius: am5.percent(80)
        }) 
      );
    
    
    // Define data
    let data = [{
        country: "Absent",
        sales: 10,
        sliceSettings: {
          fill: am5.color(0xA53860),
          stroke: am5.color(0xA53860)
        }
      }, {
        country: "Present",
        sales: 9,
        sliceSettings: {
          fill: am5.color(0x028FA3),
          stroke: am5.color(0x028FA3)
        }
      }, {
        country: "Excused",
        sales: 1,
        sliceSettings: {
          fill: am5.color(0xEDAE49),
          stroke: am5.color(0xEDAE49)
        }
      }];

    // Create series
    let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "sales",
          categoryField: "country",
          alignLabels:false
        })
      );
     
      series.labels.template.setAll({
        textType: "circular",
        inside: true,
        radius: 10,
        fontSize:12,
        fill: am5.color(0xffffff)
      });
    
      series.slices.template.setAll({
        tooltipText: "{country}",
        label:"{sales}",
        templateField: "sliceSettings"
      });

      series.data.setAll(data);

      series.slices.template.setAll({
        
      });

    
    
    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    this.root = root;

series.appear(1600);
chart.appear();

// Add legend
let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.percent(50),
  x: am5.percent(50),
  layout: root.verticalLayout,
  height: am5.percent(100)
  }));
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
    <div class="col-sm">
    <div className="attendance-table">
                        <div id="chartdiv" style={{ width: "100%", height: "40vmax" }}></div>
                    </div>
    </div>
    <div class="col-sm">
      One of three columns
      <div class="container">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>
</div>
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    
  </div>
</div>
                   
                
              </div>
           
        </div>
      </div>
    );
  }
}

export default engagementPage;
