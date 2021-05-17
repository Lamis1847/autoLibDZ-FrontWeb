import { Container } from "reactstrap";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import car from "../../assets/img/cars/car.png";
import EtatVehiculeCol from './EtatVehiculeCol'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useParams } from 'react-router';
import React, { useState, useEffect, useCallback, componentDidMount } from "react";
import axios from "axios";

export const DetailsVehicule = () => {

    //Relatif à l'API
    let idVehicule = useParams().id;

    const myServerBaseURL = "https://autolib-dz.herokuapp.com";

    const [vehicule, setVehicule] = useState([]);

    const loadVehicule = useCallback(async () => {
        const response = await axios.get(`${myServerBaseURL}/api/vehicules/${idVehicule}`);
        const vehicule = response.data;
        setVehicule(vehicule);
        console.log(vehicule)
    }, []);

    //Charger la liste des véhicules
    useEffect(() => {
        loadVehicule();
    }, [loadVehicule]);


    // Relatif aux components
    const useStyles = makeStyles((theme) => ({
        
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        inline: {
            display: 'inline',
        },
        
      })); 
      
    const StyledButton = withStyles({
        root: {
          background: '#2DCE89',
          borderRadius: 4,
          border: 0,
          color: 'white',
          height: 40,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
          textTransform: 'capitalize',
        },
      })(Button);

    const classes = useStyles();

    const colors = {
        "green": "#2DCE89",
        "yellow": "#FFCB00",
        "red": "#F5365C",
        "black": "#000000"
      }
    
    const buttonColor = vehicule.etat == 'hors service' ? colors.green : colors.yellow;
    const buttonText = vehicule.etat == 'hors service' ? 'Activer' : 'Bloquer'

    return (
        <div className="main-content">
            <div style={{marginTop:'40px'}}>
                <Container fluid>
                    <Card className={classes.root}>
                    <div style={{padding:"40px"}}>
                        <img src={car} style={{height:"50%", width:"50%", display:"block", marginLeft:"auto", marginRight:"auto"}}> 
                        </img>
                    </div>
                    <CardContent>
                    <div className="flex-container" style={{display: "flex", flexFlow:'row wrap', justifyContent:'space-around', margin:'0px 40px'}}>
                    <div style={{padding:"30px 0", textAlign:"center", width:'150px'}} >
                        <EtatVehiculeCol
                        value={vehicule.etat}
                        className="flex-item"
                        // index={tableMeta.columnIndex}
                        // change={event => updateValue(event)}
                        />
                    </div>
                        <Divider orientation="vertical" flexItem />
                        <div className="flex-item" style={{fontSize: '3em',textAlign:'center'}}>
                            <h1> {vehicule.marque} </h1>
                            <h1> {vehicule.modele} </h1>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div className="flex-item" style={{fontSize: '3em',textAlign:'center', width:'150px', padding:"30px 0"}}>
                            <h1> {vehicule.couleur} </h1>
                        </div>
                    </div>
                    <br></br>

                    <Divider />
                    <br></br>

                    <div className="flex-container" style={{display: "flex", flexFlow:'row wrap', justifyContent:'space-around'}}>
                        <div className="flex-item" style={{fontSize: '3em',textAlign:'center'}}>
                            <List className={classes.root}>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        
                                        <div style={{textAlign:'center'}}>
                                            <h3>Numéro de Chassis : {vehicule.numChassis}</h3>
                                        </div>
                                        
                                    }
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Numéro d'immatriculation : {vehicule.numImmatriculation}</h3>
                                        </div>
                                    }
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        
                                        <div style={{textAlign:'center'}}>
                                            <h3>Temps de refroidissement : {vehicule.tempsDeRefroidissement} min</h3>
                                        </div>
                                        
                                    }
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Pression huile moteur : {vehicule.pressionHuileMoteur}</h3>
                                        </div>
                                    }
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Charge batterie : {vehicule.chargeBatterie}</h3>
                                        </div>
                                    }
                                    />
                                </ListItem>                                
                                </List>
                        </div>
                        <Divider orientation="vertical" flexItem />
                        <div className="flex-item" style={{fontSize: '3em',textAlign:'center'}}>
                        <List className={classes.root}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Regulateur de Vitesse : {vehicule.regulateurVitesse}</h3>
                                        </div>
                                    }
                                />
                            </ListItem>
                            <Divider/>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <div style={{textAlign:'center', display: "flex", flexFlow:'row wrap', justifyContent:'center'}}>
                                            <h3>Anomalie circuit : </h3>
                                            <span style={{backgroundColor:'#2DCE89', padding:'1px 10px', marginLeft:'10px', borderRadius:'10px',color:'white', }}>
                                                {vehicule.anomalieCircuit}
                                            </span>
                                        </div>
                                    }
                                />
                            </ListItem>
                            <Divider/>
                            <ListItem alignItems="flex-start">
                            <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Niveau Minimum Huile : {vehicule.niveauMinimumHuile}</h3>
                                        </div>     
                                    }
                                />
                            </ListItem>
                            <Divider/>
                            <ListItem alignItems="flex-start">
                            <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Limiteur de vitesse : {vehicule.limiteurVitesse}</h3>
                                        </div>     
                                    }
                                />
                            </ListItem>
                            <Divider/>
                            <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Pression pneus : {vehicule.pressionPneus}</h3>
                                        </div>
                                    }
                                    />
                                </ListItem>
                            {/* <Divider/> */}
                            {/* <ListItem alignItems="flex-start">
                            <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Agent de maintenance : Romaissa Kessi</h3>
                                        </div>     
                                    }
                                />
                            </ListItem>
                            <Divider/> */}
                            {/* <ListItem alignItems="flex-start">
                            <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Borne : Borne de Bab El Oued</h3>
                                        </div>     
                                    }
                                />
                            </ListItem> */}
                            </List>
                        </div>
                    </div>
                    <br></br>
                    <br></br>

                    <div className="flex-container" style={{display: "flex", flexWrap:'wrap', gap:'60px', justifyContent:'center', alignItems:'center'}}>
                        <div>
                        <button style={{padding:'0 30px', backgroundColor:'#F2F2F2', borderRadius:'4px', color:'black', fontWeight:'bold', height: 40, border:0}}>         
                        <Link href="/vehicules" variant="inherit">
                             Historique des réservations
                        </Link> 
                        </button>
                        </div>
                        {/* <div>
                        <button style={{padding:'0 30px', backgroundColor:'#2DCE89', borderRadius:'4px', color:'white', fontWeight:'bold', height: 40, border:0}}>
                             Activer */}
                        {/* </button>
                        </div> */}
                        <div>
                        <button style={{padding:'0 30px', backgroundColor:'#F5365C', borderRadius:'4px', color:'white', fontWeight:'bold', height: 40, border:0}}>
                                Supprimer
                        </button>
                        </div>
                    </div>
                    </CardContent>
                    
                    </Card>
                </Container>
            </div>
        </div>
    )
}

export default DetailsVehicule;