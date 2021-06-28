import React from "react";

import { Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import { chartOptions } from "./variables/charts";

const pieOptions = {
    maintainAspectRatio: false,
    responsive: false,
    legend: {
      position: 'left',
      labels: {
        boxWidth: 10
      }
    }
}

const PieChart = ({ text , value , percentage , textColor,icon }) => {
    const pieData = {
        labels: ['Defaillances %','En Circulations %'],
        datasets: [{
            label: 'Dataset 1',
            data: [value,100-value],
            backgroundColor: ['rgba(255, 99, 132)',
                            'rgba(54, 162, 235)']
        }]
    }
    return (
        <>
          <Col className="mb-5 mt-3 mb-xl-0 bt-xl-0 " style={{ width: "18rem" }}>
            <Card className="card-stats mb-5 mb-lg-0 shadow">
              <CardBody>
                <Row>
                    <div className="col">
                        <CardTitle className="text-uppercase text-muted mb-0">
                        {text}
                        </CardTitle>
                        <span className={ "h2 font-weight-bold mb-0 text-" + textColor }>{value} {percentage ? "%" : " "}</span>
                    
                    </div>
                    <Col className="col-auto">
                        <div className={"icon icon-shape bg-"+textColor+" text-white rounded-circle shadow"}>
                        <i className={icon}></i>
                        </div>
                    </Col>
                </Row>
                <div className="p-4">
                        <Pie    data={pieData}
                                options={chartOptions}
                                height={400}/>
                </div>
                {/*<p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-success mr-2">
                    <i className="fa fa-arrow-up" />
                    3.48%
                  </span>
                  <span className="text-nowrap">Since last month</span>
                </p>*/}
              </CardBody>
            </Card>
          </Col>
        </>
    );
}

export default PieChart;