import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import './VisuAndModifBorne.css'
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import axios from "axios";


const API = 'https://autolib-dz.herokuapp.com/api/';
const SERVICES = { Borne: 'bornes/' }


class ModifBorne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            longitude: "",
            latitude: "",
            wilaya: "",
            capacite: "",
            nomBorne: "",
            commune: "",

            checked: false,
            disabled: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            latitude: this.props.borne[4],
            longitude: this.props.borne[5],
            wilaya: this.props.borne[2],
            nomBorne: this.props.borne[1],
            capacite: this.props.borne[6],
            commune: this.props.borne[3]
        })
    }

    handleChange(e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value

        this.setState({
            [name]: value
        })

        if (e.target.type == 'checkbox' && e.target.value == false) { this.setState({ disabled: true }) }
        if (this.state.disabled && e.target.type != 'checkbox') { this.setState({ disabled: false }) }
    }

    handleSubmit(e) {
        e.preventDefault()

        //If the user did actually change an input, we save it
        if (this.state.nomBorne != this.props.borne[1] ||
            this.state.wilaya != this.props.borne[2] ||
            this.state.latitude != this.props.borne[4] ||
            this.state.longitude != this.props.borne[5] ||
            this.state.commune != this.props.borne[3] ||
            this.state.capacite != this.props.borne[6]) {

            const MICROSERVICE = API + SERVICES['Borne'] + this.props.borne[0].toString() + '/'

            axios.put(MICROSERVICE, {
                nomBorne: this.state.nomBorne != this.props.borne[1] ? this.state.nomBorne : this.props.borne[1],
                wilaya: this.state.wilaya != this.props.borne[2] ? this.state.wilaya : this.props.borne[2],
                latitude: this.state.latitude != this.props.borne[4] ? this.state.latitude : this.props.borne[4],
                longitude: this.state.longitude != this.props.borne[5] ? this.state.longitude : this.props.borne[5],
                commune: this.state.commune != this.props.borne[3] ? this.state.commune : this.props.borne[3],
                nbVehicules: this.state.capacite != this.props.borne[6] ? this.state.capacite : this.props.borne[6]
            }).then((res) => {
                console.log(res)
                //Reste à faire : Afficher message de succès
            }).catch((error) => {
                switch (error.response.status) {
                    case 400:
                        alert("Un problème s'est produit avec votre demande. Code erreur : 400");
                        break;
                    case 401:
                        alert("Veuillez vous authentifier pour accéder à cette ressource. Code erreur : 401");
                        break;
                    case 403:
                        alert("Vous ne disposez pas des accès nécessaires pour effectuer cette action. Code erreur : 403");
                        break;
                    case 404:
                        alert("Nous rencontrons des difficultés à accéder à cette ressource. Code erreur : 404");
                        break;
                    case 500:
                        alert("Désolés, nous rencontrons des problèmes pour communiquer avec le serveur. Code erreur : 500");
                        break;
                    default:
                        alert("Quelque chose s'est mal déroulé, veuillez contacter le support ou ré-essayer ultérieurement.");
                        break;
                }
            })
        }
    }

    loadPlacesLibres() {

    }

    render() {

        const styles = {
            layout: {
                paddingLeft: '5%'
            },
            inputs: {
                marginLeft: '2%',
                width: '80%'
            },
            splitInputs: {
                width: "82%",
                marginLeft: '6%'
            },
            button: {
                backgroundColor: '#252834',
                color: '#ffffff',
                marginTop: "5%",
                marginLeft: "56%"
            }
        }

        return (
            <div>
                <Form style={styles.layout} onSubmit={this.handleSubmit}>
                    <FormGroup className="mb-flex">
                        <Label for="mb-checked">Mode modification</Label>
                        <Switch name="checked" id="mb-checked" checked={this.state.checked} onChange={this.handleChange} style={{ paddingLeft: '10%' }}></Switch>
                    </FormGroup>
                    <Divider variant="middle" style={{ width: '80%' }} />
                    <br />
                    <FormGroup className="mb-block">
                        <Label for="mb-id">Identifiant</Label>
                        <Input type="text" name="id" id="mb-id" value={this.props.borne[0]} disabled="true" style={styles.inputs} > {this.props.borne[0]} </Input>
                    </FormGroup>
                    <FormGroup className="mb-block">
                        <Label for="mb-nom">Nom borne</Label>
                        <Input type="text" name="nomBorne" id="mb-nom" value={this.state.nomBorne} disabled={!this.state.checked} onChange={this.handleChange} style={styles.inputs} />
                    </FormGroup>
                    <FormGroup className="mb-flex">
                        <FormGroup className="mb-block">
                            <Label for="mb-lat">Latitude</Label>
                            <Input type="text" name="latitude" id="mb-lat" value={this.state.latitude} disabled={!this.state.checked} onChange={this.handleChange} style={styles.splitInputs} />
                        </FormGroup>
                        <FormGroup className="mb-block">
                            <Label for="mb-long">Longitude</Label>
                            <Input type="text" name="longitude" id="mb-long" value={this.state.longitude} disabled={!this.state.checked} onChange={this.handleChange} style={styles.splitInputs} />
                        </FormGroup>
                    </FormGroup>
                    <FormGroup className="mb-block">
                        <Label for="mb-wilaya">Wilaya</Label>
                        <Input type="text" name="wilaya" id="mb-wilaya" value={this.state.wilaya} disabled={!this.state.checked} onChange={this.handleChange} style={styles.inputs} />
                    </FormGroup>
                    <FormGroup className="mb-block">
                        <Label for="mb-commune">Commune</Label>
                        <Input type="text" name="commune" id="mb-commune" value={this.state.commune} disabled={!this.state.checked} onChange={this.handleChange} style={styles.inputs} />
                    </FormGroup>
                    <FormGroup className="mb-block">
                        <Label for="mb-capacite">Places totales</Label>
                        <Input type="text" name="capacite" id="mb-capacite" value={this.state.capacite} disabled={!this.state.checked} onChange={this.handleChange} style={styles.inputs} />
                    </FormGroup>
                    <FormGroup className="mb-block">
                        <div>
                            <Label for="mb-placesLibres">Places libres</Label>
                            <LoopOutlinedIcon onClick={this.loadPlacesLibres} />
                        </div>
                        <Input type="text" name="placesLibres" id="mb-placesLibres" value={this.props.borne[7]} disabled="true" style={styles.inputs} > {this.props.borne[7]} </Input>
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" style={styles.button} id="submitButton" disabled={this.state.disabled}>Sauvegarder</Button>
                    </FormGroup>
                </Form>
            </div >
        )
    };
}

export default ModifBorne;