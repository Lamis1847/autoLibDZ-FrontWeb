import React from "react";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// reactstrap components
import { Card,CardTitle, CardBody,Row,Col,Button } from "reactstrap";
import StatsCard from './StatsCard';

  
const BarChart = ({ data , filters , currFilter , message , labels , onChangeFilter , col } ) => {

  let chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number",
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
        <Card>
          <Row>
            <Col xl="7">
              <CardTitle className="text-uppercase text-muted m-3">
                {message}
              </CardTitle>
              <div className="ml-5">
                <Row>
                  <Col>
                    {filters.map((filter)=>(
                      filter==currFilter ? (
                        <Button color="default" type="button" onClick={() => onChangeFilter(filter)}>
                          {filter}
                        </Button>
                      )
                      :
                      <Button color="secondary" type="button" onClick={() => onChangeFilter(filter)}>
                        {filter}
                      </Button>      
                    ))}
                  </Col>  
                </Row>
              </div>
            </Col>
            <Col className="mt-4" xl="3">
              <StatsCard  className=" float-end"
                          text={"Total : "}
                          value={calcSum(data)}
                          percentage={false}
                          textColor={"default"}
              />
            </Col>
          </Row>
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