import React, { useState, useEffect, useCallback } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, CardBody,Container,Row,Col } from "reactstrap";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample2
  } from "./variables/charts.js";

import axios from "axios";

import BarChart from './BarChart'
import { updateStatement } from "typescript";
import { update } from "lodash";

const DashboardView = ({stats}) => {

    const [locationsStats, setLocationsStats] = useState({
        locationsParMois : [],
        years:[],
        currentYear: 0
    })

    const monthList =["Jan","Feb","Mar","Apr","Mai","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    //const api_url="https://autolib-dz.herokuapp.com/api";
    const api_url="http://localhost:4000/api";

    useEffect(()=>{
        if (window.Chart) {
          parseOptions(Chart, chartOptions())
        }

        const getLocationsYears = async () => {
            const locationsYears = await fetchLocationsYears()
            let years = new Set()
            locationsYears.map((object)=>(
                years.add(parseInt(object.year))
            ))
            let yearsTab=[]
            years.forEach((value)=>(
                yearsTab.push(value)
            ))
            setLocationsStats({
                ...locationsStats,
                years:yearsTab
                
            })
        }

        const getCurrentYear = async () => {
            setLocationsStats({
                ...locationsStats,
                currentYear:locationsStats.years[0]
            })
            console.log(locationsStats.currentYear)
            console.log(locationsStats.years[0])
        }

        const getLocationsStats = async () => {
            const LocationsStatsFromServer = await fetchLocationsStats(locationsStats.currentYear)
            let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
            LocationsStatsFromServer.map((trajet)=>(
                transform[parseInt(trajet.month)-1]=parseInt(trajet.countTrajets)
            ))
            setLocationsStats({
                ...locationsStats,
                locationsParMois:transform
                
            })
        }

        const updateLocationsStats = async () =>{
            const preventDefault = event => event.preventDefault();
            getLocationsYears()
            getCurrentYear()
            getLocationsStats()
        }

        updateLocationsStats();
        


    },[])

    // fetch Locations Stats
    const fetchLocationsStats = useCallback(async (year) => {
        let stats = []
        await axios.get(`${api_url}/trajet/countByMonth/${year}`)
            .then(res => {
                stats = res.data
            })
        return stats
            
    }, [])

    // fetch Location Years
    const fetchLocationsYears = useCallback(async () => {
        let years = []
        await axios.get(`${api_url}/trajet/getYears`)
            .then(res => {
                years = res.data
            })
        return years
            
    }, [])
      

    return(
        <div className="main-content">
            <Container className="mt-5" fluid>
                <Row>
                    <BarChart
                        years={locationsStats.years}
                        labels={monthList}
                        data={locationsStats.locationsParMois}
                    />
                </Row>
            </Container>
        </div>
    )

}

export default DashboardView;