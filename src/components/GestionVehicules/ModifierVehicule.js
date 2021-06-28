import React, { useState, useEffect, useCallback } from 'react'
import { Container } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import "../../assets/css/font.css"
import { Typography } from '@material-ui/core';
import { Select, NativeSelect } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import axios from "axios";
import {getToken} from '../../scripts/Network.js'

export const ModifierVehicule = (props) => {

    const [state, setState] = useState({});
    const [open, setOpen] = React.useState(false);

    const idVehicule = props.idVehicule
    const myServerBaseURL = "https://autolib-dz.herokuapp.com";

    const loadVehicule = useCallback(async () => {
        const response = await axios.get(`${myServerBaseURL}/api/vehicules/${idVehicule}`, { headers : { authorization : `Basic ${getToken()}`}});
        const vehicule = response.data;
        setState(vehicule);
        console.log(state)
    }, []);

    const [bornes, setBornes] = useState([]);
    const [idBorne, setIdBorne] = useState(state.idBorne);

    const loadBornes = useCallback(async () => {
        const response = await axios.get(`${myServerBaseURL}/api/bornes/all`, { headers : { authorization : `Basic ${getToken()}`}});
        const bornes = response.data;
        setBornes(bornes);
        console.log(bornes);
      }, []);

    const [agents, setAgents] = useState([]);

    const loadAgents = useCallback(async () => {
        const response = await axios.get(`${myServerBaseURL}/api/agent`, { headers : { authorization : `Basic ${getToken()}`}});
        const agents = response.data;
        setAgents(agents);
        console.log(agents);
    }, []);

    useEffect(() => {
        loadVehicule();
        loadBornes();
        loadAgents();
    }, [loadVehicule, loadBornes, loadAgents]);

    // handle fields change
    const handleChange = input => e => {
        setState({...state, [input]: e.target.value})
        console.log(state)
        console.log(state.numImmatriculation)
    }

    const handleCloseModif = props.handleCloseModif

    const [errors, setErrors] = useState({})
    const [slide, setSlide] = useState(null)
    const [annuler, setAnnuler] = useState(null)
    const [confirmer, setConfirmer] = useState(null)

    const handleOpenAnnuler = () => {
        setAnnuler(true)
    }

    const handleCloseAnnuler = () => {
        setAnnuler(false)
    }

    const handleOpenConfirmer = () => {
        setConfirmer(true)
    }

    const handleCloseConfirmer = () => {
        setConfirmer(false)
    }

    const validate = (fieldValues = state) => {
        let temp = { ...errors }
        if ('numImmatriculation' in fieldValues)
            temp.numImmatriculation = fieldValues.numImmatriculation ? "" : "Ce champs est requis."
        if ('idBorne' in fieldValues)
            temp.idBorne = fieldValues.idBorne ? "" : "Ce champs est requis."
        if ('idAgentMaintenance' in fieldValues)
            temp.idAgentMaintenance = fieldValues.idAgentMaintenance ? "" : "Ce champs est requis."
        setErrors({
            ...temp
        })

        if (fieldValues == state)
            return Object.values(temp).every(x => x == "")
    }
    
    const message = (
        <div style={{margin:'10px 40px 30px 40px'}}>
            <Slide direction="up" in={slide} mountOnEnter unmountOnExit>
            <Alert severity="error">
                <strong>Veuillez renseigner les champs requis.</strong>
            </Alert>
            </Slide>
        </div>
    )

    const [slideModif, setSlideModif] = useState(null)
    const [modifSuccess, setModifSuccess] = useState(null)
    const modifSuccessMessage = (
        <div style={{margin:'20px 0px', padding:'12px'}}>
                 {(modifSuccess == true) && (
                    <Slide direction="up" in={slideModif} mountOnEnter unmountOnExit>
                    <Alert severity="success" onClose={() => {
                        setSlideModif(false)
                        }}>
                        <AlertTitle>Succés</AlertTitle>
                        Le véhicule a été modifié <strong>avec succés</strong>
                    </Alert>
                    </Slide>
                 ) } { (modifSuccess == false) && (
                    <Slide direction="up" in={slideModif} mountOnEnter unmountOnExit>
                    <Alert severity="error">
                        <AlertTitle>Erreur!</AlertTitle>
                        <strong>Erreur lors de la modification du véhicule</strong>
                    </Alert>
                    </Slide>
                 ) }
        </div>
      )
    
    const onModifierVehicule = useCallback( async () => {
        const response = await axios.put(`${myServerBaseURL}/api/vehicules/update/${idVehicule}`, {
            numChassis: state.numChassis,
            numImmatriculation: state.numImmatriculation,
            modele: state.modele,
            marque: state.marque,
            couleur: state.couleur,
            etat: state.etat,
            tempsDeRefroidissement: state.tempsDeRefroidissement,
            pressionHuileMoteur: state.pressionHuileMoteur,
            chargeBatterie: state.chargeBatterie,
            anomalieCircuit: state.anomalieCircuit,
            pressionPneus: state.pressionPneus,
            niveauMinimumHuile: state.niveauMinimumHuile,
            regulateurVitesse: state.regulateurVitesse,
            limiteurVitesse: state.limiteurVitesse,
            idAgentMaintenance: state.idAgentMaintenance,
            idBorne: state.idBorne,
            idCloudinary: state.idCloudinary,
            secureUrl: state.secureUrl,
            id: state.id
                        },
            { headers : { authorization : `Basic ${getToken()}`}})
                        .then((response) => {
                            setSlideModif(true)
                            setModifSuccess(true)
                            console.log("modifié")
                            console.log(response);
                            window.setTimeout( function(){
                                handleCloseConfirmer()
                                setModifSuccess(null)
                                window.location.href = "/vehicules";
                             }, 2000 );
                            }, (error) => {
                            setSlideModif(true)
                            setModifSuccess(false)
                            console.log("erreur")
                            console.log(error);
                            window.setTimeout( function(){
                                handleCloseConfirmer()
                                setModifSuccess(null)
                            }, 2000 );
                            });
      });

    const continuer = e => {
        e.preventDefault();
        if(validate()){
            setSlide(null)
            handleOpenConfirmer()
        } else {
            setSlide(true)
        }
    }

    const annulerDialogue = (
        <div>
            <Dialog
                open={annuler}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <Typography style={{fontFamily:'Nunito-Regular', fontSize:'18px', padding:'14px 20px', boxShadow:'none'}}>
                    Voulez-vous vraiment annuler la modification du véhicule? 
                    <br></br>
                    Toutes les informations saisies seront perdues.
            </Typography>                    
                <DialogActions>
                <Button onClick={handleCloseModif} style={{textTransform:"capitalize", color:"#F5365C", fontFamily:'Nunito-Regular', margin:"12px 20px", fontWeight:"bold"}}>
                    Oui
                </Button>
                <Button onClick={handleCloseAnnuler} style={{textTransform:"capitalize", backgroundColor:"#252834", color:"white", fontFamily:'Nunito-Regular', padding:"6px 12px", margin:"12px 20px"}}>
                    Non
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

    const confirmerDialogue = (
        <div>
            <Dialog
                open={confirmer}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <Typography style={{fontFamily:'Nunito-Regular', fontSize:'18px', padding:'14px 20px', boxShadow:'none'}}>
                    Voulez-vous confirmer la modification du véhicule? 
                </Typography>                    
                <DialogActions>
                <Button onClick={onModifierVehicule} style={{textTransform:"capitalize", color:"#F5365C", fontFamily:'Nunito-Regular', margin:"12px 20px", fontWeight:"bold"}}>
                    Oui
                </Button>
                <Button onClick={handleCloseConfirmer} style={{textTransform:"capitalize", backgroundColor:"#252834", color:"white", fontFamily:'Nunito-Regular', padding:"6px 12px", margin:"12px 20px"}}>
                    Non
                </Button>
                </DialogActions>
                {modifSuccess ? modifSuccessMessage : <br></br>}
            </Dialog>
        </div>
    )
    
    const etats = [
        {
            value: 'circulation'
        },
        {
            value: 'hors service'
        },
        {
            value: 'en service'
        },
    ]
        return (
        <React.Fragment>
             <Container fluid style={{paddingBottom:"40px"}}>
                    <div style={{padding:"20px"}}>
                    <h1>Modifier les informations du véhicule</h1>
                    </div>
                    <form noValidate="false">
                        <div style={{padding:"5px 40px"}}>
                        <InputLabel>Matricule</InputLabel>
                        <TextField
                        required
                        error={errors.numImmatriculation === "" ? false : ""}
                        id="numImmatriculation"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('numImmatriculation')}
                        value={state.numImmatriculation}
                        />
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <InputLabel>Borne</InputLabel>
                        <Select
                        required
                        id="idBorne"
                        label="Borne"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('idBorne')}
                        value={idBorne}
                        >
                            {bornes.map((borne) => (
                                <MenuItem key={borne.idBorne} value={borne.idBorne}>
                                    {borne.nomBorne} ({borne.idBorne})
                                </MenuItem>
                            ))}
                        </Select>
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <InputLabel>Agent de maintenance</InputLabel>
                        <Select
                        required
                        id="idAgentMaintenance"
                        label="Agent de maintenance"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('idAgentMaintenance')}
                        value={state.idAgentMaintenance}
                        >
                            {agents.map((agent) => (
                                <MenuItem key={agent.idAgentMaintenance} value={agent.idAgentMaintenance}>
                                    {agent.nom} ({agent.idAgentMaintenance})
                                </MenuItem>
                            ))}
                        </Select>
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <InputLabel>Etat</InputLabel>
                        <Select
                        required
                        id="etat"
                        label="Etat"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('etat')}
                        value={state.etat}
                        >
                            {etats.map((etat) => (
                                <MenuItem key={etat.value} value={etat.value}>
                                    {etat.value} 
                                </MenuItem>
                            ))}
                        </Select>
                        </div>
                        <br></br>
                        {message}
                        <div className="flex-container" style={{display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                                <div>
                                <Button onClick={handleOpenAnnuler} style={{backgroundColor:"#F5365C", textTransform:"capitalize", color:"white", fontWeight:'bold'}} variant="contained">
                                    Annuler
                                </Button>
                                </div>
                                <div>
                                <Button onClick={continuer} style={{backgroundColor:"#252834", textTransform:"capitalize", color:"white", fontWeight:'bold', width:'150px'}} variant="contained">
                                    Confirmer
                                </Button>
                                </div>
                        </div>
                        {annulerDialogue}
                        {confirmerDialogue}

                    </form>
            </Container>
        </React.Fragment>
        )
    
}

export default ModifierVehicule
