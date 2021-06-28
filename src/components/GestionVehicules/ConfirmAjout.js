import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../assets/css/font.css"
import { Typography } from '@material-ui/core';
import axios from "axios";
import { NavLink } from 'react-router-dom'
import {getToken} from '../../scripts/Network.js'

export const ConfirmAjout = (props) => {

    const myServerBaseURL = "https://autolib-dz.herokuapp.com";
    
    const continuer = e => {
        e.preventDefault();
        props.nextStep();
    }

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }

    const [slide, setSlide] = useState(null)
    const [success, setSuccess] = useState(false)
    const [annuler, setAnnuler] = useState(null)

    const [openAnnuler, setOpenAnnuler] = useState(false);
    const handleCloseAjout = props.handleCloseAjout

    const handleConfirmAnnuler = () => {
        setAnnuler(true);
    };
    const handleCloseAnnuler = () => {
        setAnnuler(false);
    };

    const annulerDialogue = (
        <div>
            <Dialog
                open={annuler}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Typography style={{fontFamily:'Nunito-Regular', fontSize:'18px', padding:'14px 20px', boxShadow:'none'}}>
                    Voulez-vous vraiment annuler l'ajout d'un nouveau véhicule? 
                    <br></br>
                    Toutes les informations saisies seront perdues.
                </Typography>                    
                <DialogActions>
                <Button onClick={handleCloseAjout} style={{textTransform:"capitalize", color:"#F5365C", fontFamily:'Nunito-Regular', margin:"12px 20px", fontWeight:"bold"}}>
                    Oui
                </Button>
                <Button onClick={handleCloseAnnuler} style={{textTransform:"capitalize", backgroundColor:"#252834", color:"white", fontFamily:'Nunito-Regular', padding:"6px 12px", margin:"12px 20px"}}>
                    Non
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
    const successMessage = (
        <div style={{margin:'10px 40px 30px 40px'}}>
                 {success && (
                    <Slide direction="up" in={slide} mountOnEnter unmountOnExit>
                    <Alert severity="success">
                        <AlertTitle>Succés</AlertTitle>
                        Le véhicule a été ajouté <strong>avec succés</strong>
                    </Alert>
                    </Slide>
                 ) } { !success && (
                    <Slide direction="up" in={slide} mountOnEnter unmountOnExit>
                    <Alert severity="error">
                        <AlertTitle>Erreur!</AlertTitle>
                        <strong>Le véhicule n'a pas été ajouté avec succés</strong>
                    </Alert>
                    </Slide>
                 ) }
        </div>

    )

    const {values:{numChassis, numImmatriculation, marque, modele, couleur, tempsDeRefroidissement,
        pressionHuileMoteur, chargeBatterie, pressionPneus, anomalieCircuit, niveauMinimumHuile,
        regulateurVitesse, limiteurVitesse, idBorne, idAgentMaintenance, idCloudinary, secureUrl}} = props;

    const onCreateNewVehicule = useCallback(
        async () => {
            
            await axios.post(`${myServerBaseURL}/api/vehicules`, {
                numChassis: numChassis,
                numImmatriculation: numImmatriculation,
                modele: modele,
                marque: marque,
                couleur: couleur,
                etat: "en service",
                tempsDeRefroidissement: tempsDeRefroidissement,
                pressionHuileMoteur: pressionHuileMoteur,
                chargeBatterie: chargeBatterie,
                anomalieCircuit: anomalieCircuit,
                pressionPneus: pressionPneus,
                niveauMinimumHuile: niveauMinimumHuile,
                regulateurVitesse: regulateurVitesse,
                limiteurVitesse: limiteurVitesse,
                idAgentMaintenance: idAgentMaintenance,
                idBorne: idBorne,
                idCloudinary: idCloudinary,
                secureUrl: secureUrl,
                image:"TESTTTT"

            },
            { headers : { authorization : `Basic ${getToken()}`}})
            .then((response) => {
                setSlide(true)
                setSuccess(true)
                console.log(response);
                window.setTimeout( function(){
                    window.location.href = "/vehicules";
                }, 2000 );
              }, (error) => {
                setSlide(true)
                setSuccess(false)
                console.log(error);
              });
        },
        );

        return (
            <React.Fragment>
                <Container fluid style={{paddingBottom:"20px"}}>
                    <div style={{padding:"20px"}}>
                    <h1>Nouveau véhicule</h1>
                    <h4 style={{opacity:'0.5'}}>confirmez les informations saisies</h4>
                    </div>
                    <div className="flex-container" style={{padding:"5px 15px", display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                        <List>
                            <ListItem>
                                <ListItemText primary="Numéro de chassis" secondary={numChassis}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Numéro d'immatriculation" secondary={numImmatriculation}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Marque" secondary={marque}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Modele" secondary={modele}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Couleur" secondary={couleur}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Température de refroidissement" secondary={tempsDeRefroidissement}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Pression huile moteur" secondary={pressionHuileMoteur}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Charge batterie" secondary={chargeBatterie}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Pression pneus" secondary={pressionPneus}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Anomalie circuit" secondary={anomalieCircuit}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Niveau minimum huile" secondary={niveauMinimumHuile}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Régulateur vitesse" secondary={regulateurVitesse}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Limiteur vitesse" secondary={limiteurVitesse}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Borne" secondary={idBorne}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="Agent de maintenance" secondary={idAgentMaintenance}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="id cloudinary" secondary={idCloudinary}/>
                            </ListItem>
                            <Divider variant='middle'/>
                            <ListItem>
                                <ListItemText primary="secure url" secondary={secureUrl}/>
                            </ListItem>
                        </List>
                    </div>
                    {successMessage}
                    <div className="flex-container" style={{display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                            <div>
                            <IconButton onClick={back} style={{textTransform:"capitalize", fontWeight:'bold', color:'black'}} variant="contained">
                                <ArrowBackIosIcon/>
                            </IconButton>
                            </div>

                            <div>
                            <Button onClick={handleConfirmAnnuler} style={{backgroundColor:"#F5365C", textTransform:"capitalize", color:"white", fontWeight:'bold'}} variant="contained">
                                Annuler
                            </Button>
                            </div>
                            
                            <div>
                            <Button onClick={onCreateNewVehicule} style={{backgroundColor:"#2DCE89", textTransform:"capitalize", color:"white", fontWeight:'bold', width:'150px'}} variant="contained">
                            <NavLink to="/vehicules/" variant="contained" style={{fontFamily:'Nunito', color:'white'}}>
                                Confirmer
                            </NavLink>
                            </Button>
                            </div>
                    </div>
                    {annulerDialogue}
                </Container>
            </React.Fragment>
        )
}

export default ConfirmAjout
