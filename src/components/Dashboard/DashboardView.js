import React, { useState, useEffect, useCallback,useLayoutEffect,forceUpdate } from "react";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, CardBody,Container,Row,Col } from "reactstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIDataTable from "mui-datatables";

// core components
import {
    chartOptions,
    parseOptions,
    chartExample1
  } from "./variables/charts.js";

import axios from "axios";

import BarChart from './BarChart';
import StatsCard from './StatsCard';

const DashboardView = () => {

    //const api_url="https://autolib-dz.herokuapp.com/api";
    const api_url="http://localhost:4000/api";

    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    const [locationsStats, setLocationsStats] = useState({
        locationsParMois : [],
        years:[],
        currentYear: 0,
        bySeason:false,
        labels: ["Jan","Feb","Mar","Apr","Mai","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    })

    const [abonnementsStats, setAbonnementsStats] = useState({
        abonnementsParMois : [],
        years:[],
        currentYear: 0,
        bySeason:false,
        labels: ["Jan","Feb","Mar","Apr","Mai","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    })

    const [transactionsStats, setTransactionsStats] = useState({
        transactionsParMois : [],
        years:[],
        currentYear: 0,
        bySeason:false,
        labels: ["Jan","Feb","Mar","Apr","Mai","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    })

    const [tauxDef,setTauxDef] = useState({
        total: 0 ,
        enPanne: 0,
        percent: 0
    })

    const [retards,setRetards] = useState({
        listeResRet: [],
        responsive: "vertical",
        bodyHeight:"400px",
        bodyMaxHeight:"800px"
    })

    const [loadingRetards,setLoadingRetards] = useState(null)

    const retardsTabOptions = {
        filter: true,
        download:false,
        print:false,
        viewColumns:false,
        filterType: "dropdown",
        elevation:0,
        responsive: retards.responsive,
        tableBodyHeight:retards.bodyHeight,
        tableBodyMaxHeight:retards.bodyMaxHeight,
        searchPlaceholder: 'Saisir un nom ou un ID..',
        onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
        onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
        onChangePage: currentPage => console.log('currentPage: ', currentPage),
        textLabels: {
          body: {
              noMatch: loadingRetards ?
                  <CircularProgress /> :
                  'Aucune donnée trouvée',
          },
      },
    
    }

    const retardsTabColumns = [
        {
            name:"ID Reservation",
            label: "idReservation"
        },
        {
            name:"ID Locataire",
            label: "id"
        },
        {
            name:"Nom Locataire",
            label: "nom"
        },
        {
            name:"Prenom Locataire",
            label: "prenom"
        },
        {
            name:"numChassis Vehicule",
            label: "numChassis"
        },
        {
            name:"Marque Vehicule",
            label: "marque"
        },
        {
            name:"Modele Vehicule",
            label: "modele"
        },
        {
            name:"DateFin Reservation",
            label: "dateFin"
        }
    ]

    useEffect(()=>{
        loadLocationsStatsAll();
        loadAbonnementsStatsAll();
        loadTransactionsStatsAll();
        loadTauxDef();
        loadRetardReservations();
    },[]);

    // Charger les locations par mois ou par saison
    const loadLocationsStats = useCallback(async (year,bySeason) => {
        try{
            const LocationsStatsFromServer = await fetchLocationsStats(year)
            let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
            LocationsStatsFromServer.map((trajet)=>(
                transform[parseInt(trajet.month)-1]=parseInt(trajet.countTrajets)
            ))
            if(bySeason){
                setLocationsStats((prevState)=>({
                    ...prevState,
                    bySeason:true,
                    labels : ["Winter","Spring","Summer","Fall"],
                    locationsParMois:[transform[0]+transform[1]+transform[2],
                    transform[3]+transform[4]+transform[5],
                    transform[6]+transform[7]+transform[8],
                    transform[9]+transform[10]+transform[11]]
                }))
            }
            else{
                setLocationsStats((prevState)=>({
                    ...prevState,
                    locationsParMois:transform,
                    bySeason:false,
                    labels : ["Jan","Feb","Mar","Apr","Mai","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]      
                }))
            }
            console.log(locationsStats)
        }
        catch(e){}
    })

    // Charger les abonnements par mois ou par saison
    const loadAbonnementsStats = useCallback(async (year,bySeason) => {
        try{
            const AbonnementsStatsFromServer = await fetchAbonnementsStats(year)
            let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
            AbonnementsStatsFromServer.map((trajet)=>(
                transform[parseInt(trajet.month)-1]=parseInt(trajet.countAbonnements)
            ))
            if(bySeason){
                setAbonnementsStats((prevState)=>({
                    ...prevState,
                    bySeason:true,
                    labels : ["Winter","Spring","Summer","Fall"],
                    abonnementsParMois:[transform[0]+transform[1]+transform[2],
                    transform[3]+transform[4]+transform[5],
                    transform[6]+transform[7]+transform[8],
                    transform[9]+transform[10]+transform[11]]
                }))
            }
            else{
                setAbonnementsStats((prevState)=>({
                    ...prevState,
                    abonnementsParMois:transform,
                    bySeason:false,
                    labels : ["Jan","Feb","Mar","Apr","Mai","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]      
                }))
            }
        }
        catch(e){}
    })

    // Charger les transactions par mois ou par saison
    const loadTransactionsStats = useCallback(async (year,bySeason) => {
        try{
            const transactionsStatsFromServer = await fetchTransactionsStats(year)
            let transform = [0,0,0,0,0,0,0,0,0,0,0,0]
            transactionsStatsFromServer.map((transaction)=>(
                transform[parseInt(transaction.month)-1]=parseInt(transaction.sumTransactions)
            ))
            if(bySeason){
                setTransactionsStats((prevState)=>({
                    ...prevState,
                    bySeason:true,
                    labels : ["Winter","Spring","Summer","Fall"],
                    transactionsParMois:[transform[0]+transform[1]+transform[2],
                    transform[3]+transform[4]+transform[5],
                    transform[6]+transform[7]+transform[8],
                    transform[9]+transform[10]+transform[11]]
                }))
            }
            else{
                setTransactionsStats((prevState)=>({
                    ...prevState,
                    transactionsParMois:transform,
                    bySeason:false,
                    labels : ["Jan","Feb","Mar","Apr","Mai","Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]      
                }))
            }
        }
        catch(e){}
    })

    // Charger les tous les statistiques pour les locations
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
                ...prevState,
                years:yearsTab,
                currentYear:yearsTab[0],
            }))
            loadLocationsStats(yearsTab[0],false)
        }
        catch(e){}
    }

    // Charger les tous les statistiques pour les abonnements
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
                ...prevState,
                years:yearsTab,
                currentYear:yearsTab[0],
            }))
            loadAbonnementsStats(yearsTab[0],false)
        }
        catch(e){}
    }

    // Charger les tous les statistiques pour les abonnements
    const loadTransactionsStatsAll = async () => {
        try{
            const transactionsYearsFromServer = await fetchTransactionsYears();
            let years = new Set()
            transactionsYearsFromServer.map((object)=>(
                years.add(parseInt(object.year))
            ));
            let yearsTab=[]
            years.forEach((value)=>(
                yearsTab.unshift(value)
            ))
            setTransactionsStats((prevState)=>({
                ...prevState,
                years:yearsTab,
                currentYear:yearsTab[0],
            }))
            loadTransactionsStats(yearsTab[0],false)
        }
        catch(e){}
    }

    // Charger le taux de deffaillance
    const loadTauxDef = useCallback(async () => {
        try{
            const resultFromServer = await fetchTauxDef()
            setTauxDef({
                total: parseInt(resultFromServer[0].countAll),
                enPanne:parseInt(resultFromServer[1].countHorsService),
                percent: parseInt((parseInt(resultFromServer[1].countHorsService) / 
                parseInt(resultFromServer[0].countAll)) * 100)
            })
        }
        catch(e){}
    })

    // Charger les tous les statistiques pour les retards de remise des vehicules
    const loadRetardReservations = async () => {
        try{
            setLoadingRetards(true)
            const retardsFromServer = await fetchRetardReservation()
            let tab = []
            retardsFromServer.forEach((value)=>{
                let newTab = []
                newTab.push(value.reservation.idReservation)
                newTab.push(value.reservation.locataire.idLocataire)
                newTab.push(value.reservation.locataire.nom)
                newTab.push(value.reservation.locataire.prenom)
                newTab.push(value.reservation.vehicule.numChassis)
                newTab.push(value.reservation.vehicule.marque)
                newTab.push(value.reservation.vehicule.modele)
                newTab.push(value.dateFin)
                tab.push(newTab)
            })
            setRetards((prevState)=>({
                ...prevState,
                listeResRet:tab,
            }))
            setLoadingRetards(false)
        }
        catch(e){}
    }

    // Changer l'année pour les locations (handle year change)
    const changeLocationsYear = async (id)=> {
        setLocationsStats({...locationsStats,currentYear:id})
        await loadLocationsStats(id,locationsStats.bySeason)
    }

    // Changer l'année pour les abonnements (handle year change)
    const changeAbonnementsYear = async (id)=> {
        setAbonnementsStats({...abonnementsStats,currentYear:id})
        await loadAbonnementsStats(id,abonnementsStats.bySeason)
    }

    // Changer l'année pour les transactions (handle year change)
    const changeTransactionsYear = async (id)=> {
        setTransactionsStats({...transactionsStats,currentYear:id})
        await loadTransactionsStats(id,transactionsStats.bySeason)
    }

    // Changer le filtre d'affichage pour les locations: affichage par saison ou par mois
    const changeLocationsShowBy = async (by) =>{
        if(by == "season" && !locationsStats.bySeason){
            loadLocationsStats(locationsStats.currentYear,true)
        }
        else
        if(by=="month" && locationsStats.bySeason){
            loadLocationsStats(locationsStats.currentYear,false)
        }
    }

    // Changer le filtre d'affichage pour les abonnements: affichage par saison ou par mois
    const changeAbonnementsShowBy = async (by) =>{
        if(by == "season" && !abonnementsStats.bySeason){
            loadAbonnementsStats(abonnementsStats.currentYear,true)
        }
        else
        if(by=="month" && abonnementsStats.bySeason){
            loadAbonnementsStats(abonnementsStats.currentYear,false)
        }
    }

    // Changer le filtre d'affichage pour les transactions: affichage par saison ou par mois
    const changeTransactionsShowBy = async (by) =>{
        if(by == "season" && !transactionsStats.bySeason){
            loadTransactionsStats(transactionsStats.currentYear,true)
        }
        else
        if(by=="month" && transactionsStats.bySeason){
            loadTransactionsStats(transactionsStats.currentYear,false)
        }
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

    // fetch transactions Stats
    const fetchTransactionsStats = async (year) => {
        let stats = []
        await axios.get(`${api_url}/transaction/stats/${year}`)
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

    // fetch Transactions Years
    const fetchTransactionsYears = async () => {
        let years = []
        await axios.get(`${api_url}/transaction/getYears`)
            .then(res => {
                years = res.data
            })
        return years
            
    }
 
    // fetch les données pour taux def
    const fetchTauxDef = async () => {
        let stats = []
        await axios.get(`${api_url}/vehicules/count`)
            .then(res => {
                stats = res.data
            })
        return stats     
    }

    // fetch les retard de remise des véhicules
    const fetchRetardReservation = async () => {
        let stats = []
        await axios.get(`${api_url}/reservation/lesRetards`)
            .then(res => {
                stats = res.data
            })
        return stats     
    }

      
    return(
        <div className="main-content">
            <Container className="mt-5 pb-5" fluid>
                <Row>
                    <BarChart
                        data={locationsStats.locationsParMois}
                        filters={locationsStats.years}
                        currFilter={locationsStats.currentYear}
                        message={"Les locations effectuées par "}
                        labels={locationsStats.labels}
                        onChangeFilter={changeLocationsYear}
                        changeShowBy ={changeLocationsShowBy}
                        bySeason={locationsStats.bySeason}
                        col={"9"}
                        dark={false}
                        icon={"fas fa-car"}
                        dataSetLabel={"Number"}
                    />
                    <StatsCard
                        text={"Taux de défaillance"}
                        value={tauxDef.percent}
                        percentage={true}
                        textColor={"danger"}
                        icon={"fas fa-car-crash"}
                    />
                </Row>
                <Row className="mt-3">
                    <BarChart
                        data={abonnementsStats.abonnementsParMois}
                        filters={abonnementsStats.years}
                        currFilter={abonnementsStats.currentYear}
                        message={"Nombre d'abonnements par "}
                        labels={abonnementsStats.labels}
                        onChangeFilter={changeAbonnementsYear}
                        changeShowBy ={changeAbonnementsShowBy}
                        bySeason={abonnementsStats.bySeason}
                        col={"12"}
                        dark={true}
                        icon={"fas fa-user-plus"}
                        dataSetLabel={"Number"}
                    />
                </Row>
                <Row className="mt-3">
                    <BarChart
                        data={transactionsStats.transactionsParMois}
                        filters={transactionsStats.years}
                        currFilter={transactionsStats.currentYear}
                        message={"Somme de transactions par "}
                        labels={transactionsStats.labels}
                        onChangeFilter={changeTransactionsYear}
                        changeShowBy ={changeTransactionsShowBy}
                        bySeason={transactionsStats.bySeason}
                        col={"12"}
                        dark={false}
                        icon={"fas fa-money-bill-alt"}
                        line={true}
                        dataSetLabel={"Sum"}
                    />
                </Row>
                <Row className="mt-3">
                    <Col className="mb-5 mb-xl-0" xl={8}>
                        <Card className="shadow">
                            <div className="bg-transparent card-header">
                                <div className="text-uppercase text-muted">
                                    {/*<h6 className="text-uppercase text-light ls-1 mb-1">
                                        overview
                                    </h6>*/}
                                    <h2 className="mb-0">
                                        Les retards de remise des vehicules
                                    </h2>
                                </div>
                            </div>
                            <CardBody>
                                <MUIDataTable
                                    data={retards.listeResRet}
                                    columns={retardsTabColumns}
                                    options={retardsTabOptions}
                                />
                            </CardBody>     
                        </Card>
                    </Col>   
                </Row>
            </Container>
        </div>
    )

}

export default DashboardView;
