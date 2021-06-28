import React, { Component, useState } from 'react'
import AjoutFirstStep from './AjoutFirstStep'
import { Container } from "reactstrap";
import AjoutSecondStep from './AjoutSecondStep';
import ConfirmAjout from './ConfirmAjout';
import AjoutThirdStep from './AjoutThirdStep';
import axios from 'axios'

export const AjouterVehicule = ({handleCloseAjout}) => {

    const [state, setState] = useState({
        step: 1,
        numChassis: '',
        numImmatriculation: '',
        marque: '',
        modele: '',
        couleur: '',
        tempsDeRefroidissement: '',
        pressionHuileMoteur: '',
        chargeBatterie: '',
        pressionPneus: '',
        anomalieCircuit: '',
        niveauMinimumHuile: '',
        regulateurVitesse: '',
        limiteurVitesse: '',
        idBorne: '',
        idAgentMaintenance: '',
        idCloudinary: '', 
	    secureUrl: ''
    });

    //prochaine etape
    const nextStep = () => {
        const {step} = state;
        setState({...state, step: step + 1})
    }

    //etape précédente
    const prevStep = () => {
        const {step} = state;
        setState({...state, step: step - 1})
    }
    
    const { numChassis, numImmatriculation, marque, modele, couleur, tempsDeRefroidissement,
    pressionHuileMoteur, chargeBatterie, pressionPneus, anomalieCircuit, niveauMinimumHuile, regulateurVitesse, limiteurVitesse, idBorne, idAgentMaintenance, idCloudinary, secureUrl} = state;
    const values = { numChassis, numImmatriculation, marque, modele, couleur, tempsDeRefroidissement,
    pressionHuileMoteur, chargeBatterie, pressionPneus, anomalieCircuit, niveauMinimumHuile, regulateurVitesse, limiteurVitesse, idBorne, idAgentMaintenance, idCloudinary, secureUrl};

    // handle fields change
    const handleChange = input => e => {
        setState({...state, [input]: e.target.value})
    }

    const handleChangeImage = (imageSelected) => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset","autolibDz")

        axios.post("https://api.cloudinary.com/v1_1/melb/image/upload", formData)
        .then((response)=> {
            console.log(response)
            console.log(response.data.public_id)
            console.log(response.data.secure_url)
            setState(
                prevState => { return {...prevState, idCloudinary:response.data.public_id, secureUrl:response.data.secure_url}})

        }) 
    }

        switch(state.step) {
            case 1: 
                return (
                    <AjoutFirstStep
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                        handleCloseAjout={handleCloseAjout}
                    />
                );
            case 2:
                return(
                    <AjoutSecondStep
                        prevStep={prevStep}
                        nextStep={nextStep}
                        handleChange={handleChange}
                        values={values}
                        handleCloseAjout={handleCloseAjout}
                    />

                )
            case 3:
                return ( <AjoutThirdStep
                            prevStep={prevStep}
                            nextStep={nextStep}
                            handleChange={handleChange}
                            values={values}
                            handleChangeImage={handleChangeImage}
                            handleCloseAjout={handleCloseAjout}
                        />
                );
            case 4:
                return ( <ConfirmAjout
                            prevStep={prevStep}
                            nextStep={nextStep}
                            values={values}
                            handleCloseAjout={handleCloseAjout}
                        />
                );
        }
    
}

export default AjouterVehicule
