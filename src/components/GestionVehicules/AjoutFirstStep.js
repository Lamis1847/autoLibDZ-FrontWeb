import React, { Component, useState } from 'react'
import { Container } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../assets/css/font.css"
import { Typography } from '@material-ui/core';
import carlist from './car-list.json'

export const AjoutFirstStep = (props) => {

    const values = props.values;
    const handleChange = props.handleChange;
    const handleCloseAjout = props.handleCloseAjout

    const [errors, setErrors] = useState({})
    const [slide, setSlide] = useState(null)
    const [annuler, setAnnuler] = useState(null)
    const [modele, setModele] = useState(null)

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
        if ('numChassis' in fieldValues)
            temp.numChassis = fieldValues.numChassis ? "" : "Ce champs est requis."
        if ('numImmatriculation' in fieldValues)
            temp.numImmatriculation = fieldValues.numImmatriculation ? "" : "Ce champs est requis."
        if ('marque' in fieldValues)
            temp.marque = fieldValues.marque ? "" : "Ce champs est requis."
        if ('modele' in fieldValues)
            temp.modele = fieldValues.modele ? "" : "Ce champs est requis."
        if ('couleur' in fieldValues)
            temp.couleur = fieldValues.couleur ? "" : "Ce champs est requis."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
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

        return (
        <React.Fragment>
             <Container fluid style={{paddingBottom:"40px"}}>
                    <div style={{padding:"20px"}}>
                    <h1>Nouveau véhicule</h1>
                    <h4 style={{opacity:'0.5'}}>caractéristiques du véhicule</h4>
                    </div>
                    <form noValidate="false">
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        required
                        error={errors.numChassis === "" ? false : ""}
                        id="numChassis"
                        label="Numéro de chassis"
                        placeholder="Exemple : VF7-SBHMZO-LW554823"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('numChassis')}
                        defaultValue={values.numChassis}
                        />
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        required
                        error={errors.numImmatriculation === "" ? false : ""}
                        id="numImmatriculation"
                        label="Matricule"
                        placeholder="Exemple : 09875312016"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('numImmatriculation')}
                        defaultValue={values.numImmatriculation}
                        />
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        required
                        error={errors.marque === "" ? false : ""}
                        id="marque"
                        label="Marque"
                        select
                        placeholder="Exemple : Peugeot"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('marque')}
                        defaultValue={values.marque}
                        >
                            {carlist.map((car) => (
                                <MenuItem key={car.brand} value={car.brand}>
                                    {car.brand}
                                </MenuItem>
                            ))}
                        </TextField>
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        required
                        error={errors.modele === "" ? false : ""}
                        id="modele"
                        label="Modéle"
                        select
                        placeholder="Exemple : 306"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('modele')}
                        defaultValue={values.modele}
                        >
                            {(values.marque != '') ? (carlist.filter(function (car) {return car.brand == values.marque}))[0]['models'].map((modele) => (
                                <MenuItem key={modele} value={modele}>
                                    {modele}
                                </MenuItem>
                            )) : "Veuillez d'abord choisir une marque"}
                        </TextField>
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        required
                        error={errors.couleur === "" ? false : ""}
                        id="couleur"
                        label="Couleur"
                        placeholder="Exemple : Gris"
                        variant="outlined"
                        fullWidth='true'
                        onChange={handleChange('couleur')}
                        defaultValue={values.couleur}
                        />
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
                                    Continuer
                                </Button>
                                </div>
                        </div>
                        {annulerDialogue}
                    </form>
            </Container>
        </React.Fragment>
        )
    
}

export default AjoutFirstStep
