import React, { Component, useState } from 'react'
import { Container } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../assets/css/font.css"
import { Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

export const AjoutSecondStep = (props) => {
    
    const [errors, setErrors] = useState({})
    const [slide, setSlide] = useState(null)
    const {values, handleChange} = props;
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
        if ('tempsDeRefroidissement' in fieldValues)
            temp.tempsDeRefroidissement = fieldValues.tempsDeRefroidissement ? "" : "Ce champs est requis."
        if ('pressionHuileMoteur' in fieldValues)
            temp.pressionHuileMoteur = fieldValues.pressionHuileMoteur ? "" : "Ce champs est requis."
        if ('chargeBatterie' in fieldValues)
            temp.chargeBatterie = fieldValues.chargeBatterie ? "" : "Ce champs est requis."
        if ('pressionPneus' in fieldValues)
            temp.pressionPneus = fieldValues.pressionPneus ? "" : "Ce champs est requis."
        if ('anomalieCircuit' in fieldValues)
            temp.anomalieCircuit = fieldValues.anomalieCircuit ? "" : "Ce champs est requis."
        if ('niveauMinimumHuile' in fieldValues)
            temp.niveauMinimumHuile = fieldValues.niveauMinimumHuile ? "" : "Ce champs est requis."
        if ('regulateurVitesse' in fieldValues)
            temp.regulateurVitesse = fieldValues.regulateurVitesse ? "" : "Ce champs est requis."
        if ('limiteurVitesse' in fieldValues)
            temp.limiteurVitesse = fieldValues.limiteurVitesse ? "" : "Ce champs est requis."
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

    const back = e => {
        e.preventDefault();
        props.prevStep();
    }


    return (
        <React.Fragment>
            <Container fluid style={{paddingBottom:"40px"}}>
                <div style={{padding:"20px"}}>
                <h1>Nouveau véhicule</h1>
                <h4 style={{opacity:'0.5'}}>caractéristiques du véhicule</h4>
                </div>
                <div className="flex-container" style={{padding:"5px 40px", display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                <Tooltip title="Température du liquide de refroidissement dans le moteur" arrow style={{fontFamily:"Nunito-Regular"}}>
                <TextField
                required
                error={errors.tempsDeRefroidissement === "" ? false : ""}
                id="tempsDeRefroidissement"
                label="Température du liquide de refroidissement"
                placeholder="Exemple : 80°C"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('tempsDeRefroidissement')}
                defaultValue={values.tempsDeRefroidissement}
                />
                </Tooltip>
                <TextField
                required
                error={errors.pressionHuileMoteur === "" ? false : ""}
                id="pressionHuileMoteur"
                label="Pression d'huile du moteur"
                placeholder="Exemple : 20 Bar"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('pressionHuileMoteur')}
                defaultValue={values.pressionHuileMoteur}
                />
                </div>
                <br></br>
                <div className="flex-container" style={{padding:"5px 40px", display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                <TextField
                required
                error={errors.chargeBatterie === "" ? false : ""}
                id="chargeBatterie"
                label="Charge de la batterie"
                placeholder="Exemple 20%"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('chargeBatterie')}
                defaultValue={values.chargeBatterie}
                />
                <TextField
                required
                error={errors.pressionPneus === "" ? false : ""}
                id="pressionPneus"
                label="Pression des pneus"
                placeholder="Exemple : 20 Bar"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('pressionPneus')}
                defaultValue={values.pressionPneus}
                />
                </div>
                <br></br>
                <div className="flex-container" style={{padding:"5px 40px", display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                <Tooltip title="Type d'anomalie dans le circuit du véhicule, s'il existe" arrow style={{fontFamily:"Nunito-Regular"}}>
                <TextField
                required
                error={errors.anomalieCircuit === "" ? false : ""}
                id="anomalieCircuit"
                label="Anomalie circuit"
                placeholder="Exemple : Défaillance feux arrière"
                variant="outlined"
                fullWidth='true'
                onChange={handleChange('anomalieCircuit')}
                defaultValue={values.anomalieCircuit}
                />
                </Tooltip>
                <TextField
                required
                error={errors.niveauMinimumHuile === "" ? false : ""}
                id="niveauMinimumHuile"
                label="Niveau minimum d'huile"
                placeholder="Exemple : 20 litres"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('niveauMinimumHuile')}
                defaultValue={values.niveauMinimumHuile}
                />
                </div>
                <br></br>
                <div className="flex-container" style={{padding:"5px 40px", display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                <Tooltip title="Permet de réguler la vitesse du véhicule pendant la conduite" arrow style={{fontFamily:"Nunito-Regular"}}>
                <TextField
                required
                error={errors.regulateurVitesse === "" ? false : ""}
                id="regulateurVitesse"
                label="Regulateur vitesse"
                placeholder="Exemple : 100 KM/H"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('regulateurVitesse')}
                defaultValue={values.regulateurVitesse}
                />
                </Tooltip>
                <Tooltip title="Indiquer la vitesse maximale que peut atteindre le véhicule" arrow style={{fontFamily:"Nunito-Regular"}}>
                <TextField
                required
                error={errors.limiteurVitesse === "" ? false : ""}
                id="limiteurVitesse"
                label="Limiteur vitesse"
                placeholder="Exemple : 220 KM/H"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('limiteurVitesse')}
                defaultValue={values.limiteurVitesse}
                />
                </Tooltip>
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

export default AjoutSecondStep
