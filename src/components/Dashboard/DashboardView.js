import React, { useState, useEffect, useCallback,useLayoutEffect } from "react";
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

import BarChart from './BarChart';
import StatsCard from './StatsCard';

const DashboardView = () => {

    const [locationsStats, setLocationsStats] = useState({
        locationsParMois : [],
        years:[],
        currentYear: 0
    })

    const [abonnementsStats, setAbonnementsStats] = useState({
        abonnementsParMois : [],
        years:[],
        currentYear: 0
    })
    
    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    useEffect(()=>{
        loadLocationsStatsAll();
        loadAbonnementsStatsAll();
    },[]);

    const monthList =["Jan","Feb","Mar","Apr","Mai","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //const api_url="https://autolib-dz.herokuapp.com/api";
    const api_url="http://localhost:4000/api";

    const loadLocationsStats = useCallback(async (year) => {
        try{
            const LocationsStatsFromServer = await fetchLocationsStats(year)
            let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
            LocationsStatsFromServer.map((trajet)=>(
                transform[parseInt(trajet.month)-1]=parseInt(trajet.countTrajets)
            ));
            //setLocationsParMois(transform);
            setLocationsStats((prevState)=>({
                ...prevState,
                locationsParMois:transform           
            }))
        }
        catch(e){}
    })

    const loadAbonnementsStats = useCallback(async (year) => {
        try{
            const AbonnementsStatsFromServer = await fetchAbonnementsStats(year)
            let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
            AbonnementsStatsFromServer.map((trajet)=>(
                transform[parseInt(trajet.month)-1]=parseInt(trajet.countAbonnements)
            ));
            //setLocationsParMois(transform);
            setAbonnementsStats((prevState)=>({
                ...prevState,
                abonnementsParMois:transform           
            }))
        }
        catch(e){}
    })

    const loadLocationsStatsAll = async () => {
        try{
            const locationsYearsFromServer = await fetchLocationsYears();
            let years = new Set()
            locationsYearsFromServer.map((object)=>(
                years.add(parseInt(object.year))
            ));
            let yearsTab=[]
            years.forEach((value)=>(
                yearsTab.unshift(value)
            ))
            setLocationsStats((prevState)=>({
                ...prevState.locationsParMois,
                years:yearsTab,
                currentYear:yearsTab[0]
            }))
            loadLocationsStats(yearsTab[0])
        }
        catch(e){}
    }

    const loadAbonnementsStatsAll = async () => {
        try{
            const abonnementsYearsFromServer = await fetchAbonnemenetsYears();
            let years = new Set()
            abonnementsYearsFromServer.map((object)=>(
                years.add(parseInt(object.year))
            ));
            let yearsTab=[]
            years.forEach((value)=>(
                yearsTab.unshift(value)
            ))
            setAbonnementsStats((prevState)=>({
                ...prevState.abonnementsParMois,
                years:yearsTab,
                currentYear:yearsTab[0]
            }))
            loadAbonnementsStats(yearsTab[0])
        }
        catch(e){}
    }

    const changeLocationsYear = async (id)=> {
        setLocationsStats({...locationsStats,currentYear:id})
        loadLocationsStats(id)
    }

    const changeAbonnementsYear = async (id)=> {
        setAbonnementsStats({...abonnementsStats,currentYear:id})
        loadAbonnementsStats(id)
    }

    // fetch Locations Stats
    const fetchLocationsStats = async (year) => {
        let stats = []
        await axios.get(`${api_url}/trajet/countByMonth/${year}`)
            .then(res => {
                stats = res.data
            })
        return stats     
    }

    // fetch Abonnements Stats
    const fetchAbonnementsStats = async (year) => {
        let stats = []
        await axios.get(`${api_url}/abonnement/countByMonth/${year}`)
            .then(res => {
                stats = res.data
            })
        return stats     
    }

    // fetch Location Years
    const fetchLocationsYears = async () => {
        let years = []
        await axios.get(`${api_url}/trajet/getYears`)
            .then(res => {
                years = res.data
            })
        return years
            
    }

    // fetch Abonnements Years
    const fetchAbonnemenetsYears = async () => {
        let years = []
        await axios.get(`${api_url}/abonnement/getYears`)
            .then(res => {
                years = res.data
            })
        return years
            
    }
      

    return(
        <div className="main-content">
            <Container className="mt-5" fluid>
                <Row>
                    <BarChart
                        data={locationsStats.locationsParMois}
                        filters={locationsStats.years}
                        currFilter={locationsStats.currentYear}
                        message={"Les locations effectuées par saison :"}
                        labels={monthList}
                        onChangeFilter={changeLocationsYear}
                        col={"9"}
                    />
                    <StatsCard
                        text={"Taux de défaillance"}
                        value={98}
                        percentage={true}
                        textColor={"danger"}
                    />
                </Row>
                <Row className="mt-3">
                    <BarChart
                        data={abonnementsStats.abonnementsParMois}
                        filters={abonnementsStats.years}
                        currFilter={abonnementsStats.currentYear}
                        message={"Nombre d'abonnements par saison :"}
                        labels={monthList}
                        onChangeFilter={changeAbonnementsYear}
                        col={"12"}
                    />
                </Row>
            </Container>
        </div>
    )

}

export default DashboardView;