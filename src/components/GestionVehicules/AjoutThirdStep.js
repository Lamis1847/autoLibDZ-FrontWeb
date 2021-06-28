import { Container } from "reactstrap";
import React, { useState, useEffect, useCallback, Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from "axios";
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../assets/css/font.css"
import { Typography } from '@material-ui/core';
import {getToken} from '../../scripts/Network.js'

export const AjoutThirdStep = (props) => {
    
    const myServerBaseURL = "https://autolib-dz.herokuapp.com";

    const [bornes, setBornes] = useState([]);

    const loadBornes = useCallback(async () => {
        const response = await axios.get(`${myServerBaseURL}/api/bornes/all`,{ headers : { authorization : `Basic ${getToken()}`}});
        const bornes = response.data;
        setBornes(bornes);
        console.log(bornes);
      }, []);

    const [agents, setAgents] = useState([]);

    const loadAgents = useCallback(async () => {
        const response = await axios.get(`${myServerBaseURL}/api/agent`,{ headers : { authorization : `Basic ${getToken()}`}});
        const agents = response.data;
        setAgents(agents);
        console.log(agents);
    }, []);
    
    useEffect(() => {
        loadBornes();
        loadAgents();
      }, [loadBornes, loadAgents]);

    const [errors, setErrors] = useState({})
    const [slide, setSlide] = useState(null)
    const {values, handleChange, handleChangeImage} = props;
    const handleCloseAjout = props.handleCloseAjout
    
    const [annuler, setAnnuler] = useState(null)

    const handleOpenAnnuler = () => {
        setAnnuler(true)
    }

    const handleCloseAnnuler = () => {
        setAnnuler(false)
    }

    const continuer = e => {
        e.preventDefault();
        if(validate()){
            props.nextStep();
        } else {
            setSlide(true)
        }
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('idBorne' in fieldValues)
            temp.idBorne = fieldValues.idBorne ? "" : "Ce champs est requis."
        if ('idAgentMaintenance' in fieldValues)
            temp.idAgentMaintenance = fieldValues.idAgentMaintenance ? "" : "Ce champs est requis."
        
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const message = (
        <div style={{margin:'10px 40px 20px 40px'}}>
            <Slide direction="up" in={slide} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <strong>Veuillez renseigner les champs requis.</strong>
                </Alert>
            </Slide>
        </div>

    )

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

    const back = (e) => {
        e.preventDefault();
        props.prevStep();
    }

        return (
            <React.Fragment>
                <Container fluid style={{paddingBottom:"40px"}}>
                    <div style={{padding:"20px"}}>
                    <h1>Nouveau véhicule</h1>
                    <h4 style={{opacity:'0.5'}}>Affectez le véhicule à une borne</h4>
                    </div>
                    <div style={{padding:"5px 40px"}}>
                    <TextField
                    required
                    id="idBorne"
                    label="Borne"
                    placeholder="Exemple : Oued Semmar"
                    variant="outlined"
                    fullWidth='true'
                    select
                    onChange={handleChange('idBorne')}
                    defaultValue={values.idBorne}
                    >
                        {bornes.map((borne) => (
                            <MenuItem key={borne.idBorne} value={borne.idBorne}>
                                {borne.nomBorne} ({borne.idBorne})
                            </MenuItem>
                        ))}
                    </TextField>
                    </div>
                    <br></br>
                    <div style={{padding:"5px 40px"}}>
                    <TextField
                    required
                    id="idAgentMaintenance"
                    label="Agent de maintenance"
                    placeholder=""
                    variant="outlined"
                    fullWidth='true'
                    select
                    onChange={handleChange('idAgentMaintenance')}
                    defaultValue={values.idAgentMaintenance}
                    >
                        {agents.map((agent) => (
                            <MenuItem key={agent.idAgentMaintenance} value={agent.idAgentMaintenance}>
                                {agent.nom} ({agent.idAgentMaintenance})
                            </MenuItem>
                        ))}
                    </TextField>
                    </div>
                    <br></br>
                    <div style={{padding:"5px 40px"}}>
                    <Typography variant="subtitle1" gutterBottom>
                        Photo du véhicule
                    </Typography>
                    <input
                    type="file"
                    onChange={(event) => {
                        handleChangeImage(event.target.files[0])
                    }} 
                    />
                    </div>
                    <br></br>
                    {message}
                    <div className="flex-container" style={{display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                            <div>
                            <IconButton onClick={back} style={{textTransform:"capitalize", fontWeight:'bold', color:'black'}} variant="contained">
                                <ArrowBackIosIcon/>
                            </IconButton>
                            </div>

                            <div>
                            <Button onClick={handleOpenAnnuler} style={{backgroundColor:"#F5365C", textTransform:"capitalize", color:"white", fontWeight:'bold'}} variant="contained">
                                Annuler
                            </Button>
                            </div>
                            
                            <div>
                            <Button onClick={continuer} style={{backgroundColor:"#252834", textTransform:"capitalize", color:"white", fontWeight:'bold', width:'150px'}} variant="contained">
                                Continuer
                            </Button>
                            </div>
                    </div>
                    {annulerDialogue}
                </Container>
            </React.Fragment>
        )
    
}

export default AjoutThirdStep