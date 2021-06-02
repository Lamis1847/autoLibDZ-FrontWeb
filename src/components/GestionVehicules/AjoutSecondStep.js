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
                <Typography style={{fontFamily:'Nunito-Regular', fontSize:'18px', padding:'20px', fontWeight:'600', boxShadow:'none'}}>
                    Voulez-vous vraiment annuler l'ajout d'un nouveau véhicule? 
                    <br></br>
                    Toutes les informations saisies seront perdues.
                </Typography>                    
                <DialogActions>
                <Button onClick={handleCloseAjout} style={{textTransform:"capitalize", backgroundColor:"#2DCE89", color:"white", fontFamily:'Nunito-Regular'}} variant="contained">
                    Oui
                </Button>
                <Button onClick={handleCloseAnnuler} style={{textTransform:"capitalize", backgroundColor:"#F5365C", color:"white", fontFamily:'Nunito-Regular'}} variant="contained">
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
                <TextField
                required
                error={errors.tempsDeRefroidissement === "" ? false : ""}
                id="tempsDeRefroidissement"
                label="Température de refroidissement"
                placeholder="23"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('tempsDeRefroidissement')}
                defaultValue={values.tempsDeRefroidissement}
                />
                <TextField
                required
                error={errors.pressionHuileMoteur === "" ? false : ""}
                id="pressionHuileMoteur"
                label="Pression huile moteur"
                placeholder="23"
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
                label="Charge batterie"
                placeholder="20000"
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
                label="Pression pneus"
                placeholder="23"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('pressionPneus')}
                defaultValue={values.pressionPneus}
                />
                </div>
                <br></br>
                <div className="flex-container" style={{padding:"5px 40px", display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                <TextField
                required
                error={errors.anomalieCircuit === "" ? false : ""}
                id="anomalieCircuit"
                label="Anomalie circuit"
                placeholder=""
                variant="outlined"
                fullWidth='true'
                onChange={handleChange('anomalieCircuit')}
                defaultValue={values.anomalieCircuit}
                />
                <TextField
                required
                error={errors.niveauMinimumHuile === "" ? false : ""}
                id="niveauMinimumHuile"
                label="Niveau minimum huile"
                placeholder="23"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('niveauMinimumHuile')}
                defaultValue={values.niveauMinimumHuile}
                />
                </div>
                <br></br>
                <div className="flex-container" style={{padding:"5px 40px", display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                <TextField
                required
                error={errors.regulateurVitesse === "" ? false : ""}
                id="regulateurVitesse"
                label="Regulateur vitesse"
                placeholder="23"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('regulateurVitesse')}
                defaultValue={values.regulateurVitesse}
                />
                <TextField
                required
                error={errors.limiteurVitesse === "" ? false : ""}
                id="limiteurVitesse"
                label="Limiteur vitesse"
                placeholder="23"
                variant="outlined"
                fullWidth='true'
                type='number'
                onChange={handleChange('limiteurVitesse')}
                defaultValue={values.limiteurVitesse}
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

export default AjoutSecondStep
