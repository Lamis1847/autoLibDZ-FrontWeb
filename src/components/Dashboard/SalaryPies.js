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
    maintainAspectRatio: true,
    responsive: true
}

const SalaryPies = ({ text , salaries, textColor,icon }) => {
    const pieDataSum = {
        labels: ['Administrateur (da)','Agent Maintenance (da)','Dirigeant (da)'],
        datasets: [
            {
                label: 'Sommes',
                data: [salaries.admin.sum,salaries.agent.sum,salaries.dirigeant.sum],
                backgroundColor: ['rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(244, 208, 63)'],
                hoverOffest:4
            }
        ]
    }
    const pieDataAvg = {
        labels: ['Administrateur (da)','Agent Maintenance (da)','Dirigeant (da)'],
        datasets: [
            {
                label: 'Sommes',
                data: [Math.round(salaries.admin.avg),Math.round(salaries.agent.avg),Math.round(salaries.dirigeant.sum)],
                backgroundColor: ['rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(244, 208, 63)'],
                hoverOffest:4
            }
        ]
    }
    return (
        <>
          <Col className="mb-5 mt-3 mb-xl-0 bt-xl-0 " style={{ width: "18rem" }}>
            <Card className="card-stats mb-5 mb-lg-0 shadow">
                <div className="card-header">
                    <Row>
                        <div className="col">
                            <div className="text-uppercase text-muted align-content-center">
                                <h2 className="mb-0">
                                    {text}
                                </h2>
                            </div>
                        </div>
                        <Col className="col-auto">
                            <div className={"icon icon-shape bg-"+textColor+" text-white rounded-circle shadow"}>
                            <i className={icon}></i>
                            </div>
                        </Col>
                    </Row>
                </div>
              <CardBody>
                <Row className="justify-content-around">
                    <div className="p-4">
                        <h2>Somme:</h2>
                        <Col>
                            <Pie    type={'pie'}
                                    data={pieDataSum}
                                    options={chartOptions}
                                    height={350}/>
                        </Col>
                    </div>
                    <div className="p-4">
                        <h2>Moyenne:</h2>
                        <Col>
                            <Pie    type={'pie'}
                                    data={pieDataAvg}
                                    options={chartOptions}
                                    height={350}/>
                        </Col>
                    </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </>
    );
}

export default SalaryPies;