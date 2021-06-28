import { Divider } from "@material-ui/core";
import React from "react";
// react plugin used to create charts
import { Line,Bar } from "react-chartjs-2";
// reactstrap components
import { Card,CardTitle, CardBody,Row,Col,Button } from "reactstrap";
import StatsCard from './StatsCard';

  
const BarChart = ({ data , filters , currFilter , message , labels , onChangeFilter ,changeShowBy,bySeason, col, dark,icon,line,dataSetLabel } ) => {

  let chartData = {
    labels: labels,
    datasets: [
      {
        label: dataSetLabel,
        data: data,
        maxBarThickness: 10
      }
    ]
  };
  const calcSum = (arr) => {
    try{
      return arr.reduce((a, b) => a + b, 0)
    }
    catch(e){

    }
  }

  return (
    <>
      <Col className="mb-5 mb-xl-0" xl={col}>
        <Card className={dark? "bg-dark shadow" : "shadow"}>
            <div className="bg-transparent card-header">
                <Row className="align-items-center">
                  <Col>
                    <div className="text-uppercase text-muted">
                      {/*<h6 className="text-uppercase text-light ls-1 mb-1">
                        overview
                      </h6>*/}
                      <h2 className={dark ? "mb-0 text-white" : "mb-0"}>
                      {message} {bySeason? "saison" :"mois"}
                      </h2>
                    </div>
                  </Col>
                  <Col>
                    <ul className="justify-content-end nav nav-pills">
                      <li className="nav-item">
                      {bySeason ?
                        <div>
                          <Button color={dark? "yellow": "dark"} type="button" onClick={() => changeShowBy("season")}>
                                  Par Saison
                          </Button>
                          <Button color="secondary" type="button" onClick={() => changeShowBy("month")}>
                                  Par Mois
                          </Button>
                        </div>
                        :
                        <div>
                          <Button color="secondary" type="button" onClick={() => changeShowBy("season")}>
                                  Par Saison
                          </Button>
                          <Button color={dark? "yellow": "dark"} type="button" onClick={() => changeShowBy("month")}>
                                  Par Mois
                          </Button>
                        </div>
                      }
                      </li>
                    </ul>
                  </Col>
                </Row>
            </div>
          <div className="ml-5 row justify-content-between">
                <ul className="nav nav-pills m-4">
                  <li>
                    {filters.map((filter)=>(
                      filter==currFilter ? (
                        <Button color={dark? "yellow": "dark"} type="button" onClick={() => onChangeFilter(filter)}>
                          {filter}
                        </Button>
                      )
                      :
                      <Button color="secondary" type="button" onClick={() => onChangeFilter(filter)}>
                        {filter}
                      </Button>      
                    ))}
                  </li>
                </ul>
                <div className="mr-5 mt-2">
                {<StatsCard  className=""
                                  text={"Total : "}
                                  value={calcSum(data)}
                                  percentage={false}
                                  textColor={"dark"}
                                  icon={icon}
                      />
                  }
                </div>
          </div>
          <CardBody>
            <div className="chart">
              {/* Chart wrapper */}
              {line ? (
                <Line
                data={chartData}
              />
              ) :
              (
                <Bar
                data={chartData}
              />
              )
              }   
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  )  
      
}
      
  
  export default BarChart;