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
          layout: root.verticalHorizontal,
          innerRadius: am5.percent(70)
        }) 
      );
    
    
    // Define data
    let data = [{
        country: "Absent",
        sales: 10
      }, {
        country: "Present",
        sales: 9
      }, {
        country: "Excused",
        sales: 1
      }];

    // Create series
    let series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "sales",
          categoryField: "country"
        })
      );
      series.data.setAll(data);
    
      series.slices.template.setAll({
        tooltipText: "{country}"
      });

    // Add legend
    
      
      

    // Add cursor
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    this.root = root;

// series.appear();
// chart.appear();

let legend = chart.children.push(am5.Legend.new(root, {
    centerX: am5.percent(50),
    x: am5.percent(80),
    y:am5.percent(80),
    layout: root.verticalLayout
  }));
legend.data.setAll(series.dataItems);

//radial label


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
                   
                        <div id="chartdiv" style={{ width: "100%", height: "600px" }}></div>

                
              </div>
           
        </div>
      </div>
    );
  }
}

export default engagementPage;
