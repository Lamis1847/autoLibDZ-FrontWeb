import { Container } from "reactstrap";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Link } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import car from "../../assets/img/cars/car.png";
import EtatVehiculeCol from './EtatVehiculeCol'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useParams } from 'react-router';
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import {getToken} from '../../scripts/Network.js'
import { NavLink } from 'react-router-dom'

export const DetailsVehicule = () => {

    //Relatif à l'API
    let idVehicule = useParams().id;

    const myServerBaseURL = "https://autolib-dz.herokuapp.com";

    const [vehicule, setVehicule] = useState([]);
    const [borne, setBorne] = useState(null);
    const [agent, setAgent] = useState(null);

    const loadVehicule = useCallback(async () => {
        const response1 = await axios.get(`${myServerBaseURL}/api/vehicules/${idVehicule}`, { headers : { authorization : `Basic ${getToken()}`}});
        const vehicule = response1.data;
        setVehicule(vehicule);
        console.log(vehicule)
        if(vehicule.idBorne != null){
            const response2 = await axios.get(`${myServerBaseURL}/api/bornes/${vehicule.idBorne}`, { headers : { authorization : `Basic ${getToken()}`}});
            const borne = response2.data[0];
            setBorne(borne);
            console.log(borne)
        }
        if(vehicule.idAgentMaintenance != null) {
            const response3 = await axios.get(`${myServerBaseURL}/api/agent/${vehicule.idAgentMaintenance}`, { headers : { authorization : `Basic ${getToken()}`}});
            const agent = response3.data;
            setAgent(agent);
            console.log(agent)
        }
        
    }, []);

    const onSupprimerVehicule = useCallback( async () => {
        const response = await axios.put(`${myServerBaseURL}/api/vehicules/${idVehicule}`, {
            numChassis: vehicule.numChassis,
            numImmatriculation: vehicule.numImmatriculation,
            modele: vehicule.modele,
            marque: vehicule.marque,
            couleur: vehicule.couleur,
            etat: "supprime",
            tempsDeRefroidissement: vehicule.tempsDeRefroidissement,
            pressionHuileMoteur: vehicule.pressionHuileMoteur,
            chargeBatterie: vehicule.chargeBatterie,
            anomalieCircuit: vehicule.anomalieCircuit,
            pressionPneus: vehicule.pressionPneus,
            niveauMinimumHuile: vehicule.niveauMinimumHuile,
            regulateurVitesse: vehicule.regulateurVitesse,
            limiteurVitesse: vehicule.limiteurVitesse,
            idAgentMaintenance: vehicule.idAgentMaintenance,
            idBorne: vehicule.idBorne,
            idCloudinary: vehicule.idCloudinary,
            secureUrl: vehicule.secureUrl,
            id: vehicule.id
                        },
            { headers : { authorization : `Basic ${getToken()}`}}
                        )
                        .then((response) => {
                            handleCloseSupprimer()
                            setSlide(true)
                            setSuccess(true)
                            console.log("supprimé")
                            console.log(response);
                            window.setTimeout( function(){
                                window.location = "http://localhost:3000/vehicules";
                            }, 3000 );
                            }, (error) => {
                            setSlide(true)
                            setSuccess(false)
                            console.log("erreur")
                            console.log(error);
                            });
        });
    
    const [slideSupp, setSlideSupp] = useState(null)
    const [success, setSuccess] = useState(false)
    const [supprimer, setSupprimer] = useState(null)
    const [slide, setSlide] = useState(null)

    const handleOpenSupprimer = () => {
        setSupprimer(true)
    }

    const handleCloseSupprimer = () => {
        setSupprimer(false)
    }

    const supprimerDialogue = (
        <div>
            <Dialog
                open={supprimer}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle style={{fontFamily:'Nunito-Regular', padding:'12px', margin:"8px", fontWeight:'bold', boxShadow:'none'}}>
                <Typography style={{fontWeight:'bold', fontSize:'22px', fontFamily:'Nunito-Regular'}}>
                Supprimer définitivement
                </Typography>
            </DialogTitle>
                <Typography style={{fontFamily:'Nunito-Regular', fontSize:'18px', padding:'14px 20px', boxShadow:'none'}}>
                Attention ! vous aller effectuer une operation irréversible
                <br></br>
                assurez-vous bien de cette étape avant de continuer
                </Typography>  
                <DialogActions>
                <Button onClick={onSupprimerVehicule} style={{textTransform:"capitalize", color:"#F5365C", fontFamily:'Nunito-Regular', margin:"12px 20px", fontWeight:"bold"}}>
                    Confirmer
                </Button>
                <Button onClick={handleCloseSupprimer} style={{textTransform:"capitalize", backgroundColor:"#252834", color:"white", fontFamily:'Nunito-Regular', padding:"6px 12px", margin:"12px 20px"}}>
                    Annuler
                </Button>
                </DialogActions>                  
                
            </Dialog>
        </div>
    )

    const successMessage = (
    <div style={{margin:'20px 0px'}}>
                {success && (
                <Slide direction="up" in={slide} mountOnEnter unmountOnExit>
                <Alert severity="success" onClose={() => {setSlide(false)}}>
                    <AlertTitle>Succés</AlertTitle>
                    Le véhicule a été supprimé <strong>avec succés</strong>
                </Alert>
                </Slide>
                ) } { !success && (
                <Slide direction="up" in={slide} mountOnEnter unmountOnExit timeout={2000}>
                <Alert severity="error">
                    <AlertTitle>Erreur!</AlertTitle>
                    <strong>Erreur lors de la suppression du véhicule</strong>
                </Alert>
                </Slide>
                ) }
    </div>
    )

    //Charger le véhicule
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

    const classes = useStyles();

    const colors = {
        "green": "#2DCE89",
        "yellow": "#FFCB00",
        "red": "#F5365C",
        "black": "#000000"
      }

    return (
        <div className="main-content">
            <div style={{marginTop:'40px'}}>
                <Container fluid>
                    <Card className={classes.root}>
                    <div style={{padding:"40px"}}>
                        <img src={vehicule.secureUrl == (null || "") ? car : vehicule.secureUrl} style={{height:"50%", width:"50%", display:"block", marginLeft:"auto", marginRight:"auto"}}> 
                        </img>
                    </div>
                    <CardContent>
                    <div className="flex-container" style={{display: "flex", flexFlow:'row wrap', justifyContent:'space-around', margin:'0px 40px'}}>
                    <div style={{padding:"30px 0", textAlign:"center", width:'150px'}} >
                        <EtatVehiculeCol
                        value={vehicule.etat}
                        className="flex-item"
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
                                            <h3>Temps de refroidissement : {vehicule.tempsDeRefroidissement} s</h3>
                                        </div>
                                        
                                    }
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Pression huile moteur : {vehicule.pressionHuileMoteur} Bar</h3>
                                        </div>
                                    }
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Charge batterie : {vehicule.chargeBatterie} %</h3>
                                        </div>
                                    }
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                        <div style={{textAlign:'center'}}>
                                            <h3>Borne : {borne ? borne.nomBorne : "Ce véhicule n'est affecté à aucune borne"}</h3>
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
                                        <h3>Regulateur de Vitesse : {vehicule.regulateurVitesse} KM/H</h3>
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
                                        <h3>Niveau Minimum Huile : {vehicule.niveauMinimumHuile} Litres</h3>
                                    </div>     
                                }
                                />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                <ListItemText
                                primary={
                                    <div style={{textAlign:'center'}}>
                                        <h3>Limiteur de vitesse : {vehicule.limiteurVitesse} KM/H</h3>
                                    </div>     
                                }
                                />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                <ListItemText
                                primary={
                                    <div style={{textAlign:'center'}}>
                                        <h3>Pression pneus : {vehicule.pressionPneus} Bar</h3>
                                    </div>
                                }
                                />
                                </ListItem>
                                <Divider/>
                                <ListItem alignItems="flex-start">
                                <ListItemText
                                primary={
                                    <div style={{textAlign:'center'}}>
                                        <h3>Agent de maintenance : {agent ? (agent.nom + " " + agent.prenom) : "Aucun agent n'est affecté à ce véhicule"}</h3>
                                    </div>
                                }
                                />
                                </ListItem>
                                </List>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        {successMessage}
                        <div className="flex-container" style={{display: "flex", flexWrap:'wrap', gap:'60px', justifyContent:'center', alignItems:'center'}}>
                            <div>
                            <button style={{padding:'0 30px', backgroundColor:'#F2F2F2', borderRadius:'4px', color:'black', fontWeight:'bold', height: 40, border:0}}>         
                            <NavLink to={"/vehicules/historique/" + idVehicule} variant="inherit" style={{fontFamily:'Nunito', color:'black'}}>
                                Historique des réservations
                            </NavLink> 
                            </button>
                            </div>
                            <div>
                            <button onClick={handleOpenSupprimer} style={{padding:'0 30px', backgroundColor:'#F5365C', borderRadius:'4px', color:'white', fontWeight:'bold', height: 40, border:0}}>
                                    Supprimer
                            </button>
                            </div>
                        </div>
                        </CardContent>
                        </Card>
                        {supprimerDialogue}
                    </Container>
            </div>
        </div>
    )
}

export default DetailsVehicule;