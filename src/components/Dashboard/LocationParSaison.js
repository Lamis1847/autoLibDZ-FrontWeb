import React from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, CardBody } from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample2
  } from "./variables/charts.js";
  
  class LocationsParSaison extends React.Component {
    componentWillMount() {
      if (window.Chart) {
        parseOptions(Chart, chartOptions());
      }
    }
    render() {
      return (
        <div className="main-content">
          <Card>
            <CardBody>
              <div className="chart">
                {/* Chart wrapper */}
                <Bar
                  data={chartExample2.data}
                  options={chartExample2.options}
                />
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }
  }
  
  export default LocationsParSaison;