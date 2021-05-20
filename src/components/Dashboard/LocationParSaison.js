import React, { useState, useEffect, useCallback } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, CardBody,Container,Row,Col } from "reactstrap";

import axios from "axios";

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
      const myServerBaseURL = "https://autolib-dz.herokuapp.com";
      const data = {
        labels: ["Jan","Feb","Mar","Apr","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Sales",
            data: [25,25,25,25,50,25,25, 20, 30, 22, 17, 29],
            maxBarThickness: 10
          }
        ]
      };
      
      return (
        <>
         <div className="main-content">
          <Container className="mt-5" fluid>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                  <Card>
                    <span className="m-3" > Les locations effectuées par saison :  </span>
                    <CardBody>
                      <div className="chart">
                        {/* Chart wrapper */}
                        <Bar
                          data={data}
                        />
                      </div>
                    </CardBody>
                  </Card>
              </Col>
              <Col className="mb-5 mb-xl-0" xl="4">
                  <Card>
                    <span className="m-3" > Les locations effectuées par saison :  </span>
                    <CardBody>
                      <div className="chart">
                        {/* Chart wrapper */}
                        <Bar
                          data={data}
                        />
                      </div>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
          </Container>
          </div>
        </>
      );
    }
  }
  
  export default LocationsParSaison;