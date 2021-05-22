import React, { useState, useEffect, useCallback } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, CardBody,Container,Row,Col } from "reactstrap";

import axios from "axios";

  
const BarChart = ({labels,data}) => {

  let chartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales",
        data: data,
        maxBarThickness: 10
      }
    ]
  };
      
      return (
        <>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card>
              <span className="m-3" > Les locations effectuées par saison :  </span>
              <CardBody>
                <div className="chart">
                  {/* Chart wrapper */}
                  <Bar
                    data={chartData}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </>
      )
}
      
  
  export default BarChart;