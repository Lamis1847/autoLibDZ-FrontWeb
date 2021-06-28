import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';

import './VisuAndModifBorne.css'

import axios from "axios";
import { getToken } from '../../../scripts/Network';

const API_All_WILAYAS = process.env.REACT_APP_ALGERIA_CITIES_URL;
const API_BORNES = process.env.REACT_APP_GESTION_BORNES_URL;


class ModifBorne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Form state
            longitude: "",
            latitude: "",
            wilaya: "",
            capacite: "",
            nomBorne: "",
            commune: "",
            placesLibres: "",

            // Data from DB
            wilayas: [],
            communes: [],
            toutesCommunes: [],

            // State of UI elements
            checked: false,
            disabled: true,
            isValid: true,
            modif: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadPlacesLibres = this.loadPlacesLibres.bind(this);
    }

    componentDidMount() {
        //On récupère toutes les wilayas existantes
        let tokenStr = getToken();
        let allWilayas = [], allCommunesWil = [], allCommunes = [], curAllComm = [];
        axios.get(API_All_WILAYAS, { headers: { "authorization": `Bearer ${tokenStr}` } })
            .then((res) => {
                res.data.forEach(elt => {
                    allWilayas.push(elt["wilaya"]);
                })
                allWilayas.sort();

                allWilayas.forEach(elt => {
                    // On récupère les communes et on les associe aux wilayas
                    axios.get(API_All_WILAYAS + elt + "/commune", { headers: { "authorization": `Bearer ${tokenStr}` } })
                        .then((result) => {
                            allCommunesWil = [];
                            allCommunesWil.push();
                            result.data.forEach(datac => {
                                allCommunesWil.push(datac['commune']);
                            })
                            allCommunesWil.sort();
                            if (elt == this.props.borne[2]) {
                                // On garde les communes de la wilaya courante
                                this.customListCommunes(this.props.borne[2], allCommunesWil)
                            }
                            allCommunes.push(elt, allCommunesWil);
                        }).catch(e => {
                            this.errorHandler(e);
                        })
                })

                // State initial
                this.setState({
                    latitude: this.props.borne[4],
                    longitude: this.props.borne[5],
                    wilaya: this.props.borne[2],
                    nomBorne: this.props.borne[1],
                    capacite: this.props.borne[6],
                    commune: this.props.borne[3],
                    placesLibres: this.props.borne[7],
                    wilayas: allWilayas,
                    toutesCommunes: allCommunes,
                })

            })
            .catch(err => {
                this.errorHandler(err);
            }
            )

    }

    /**
     * affiche un message selon l'erreur
     * @param {*} err 
     */
    errorHandler(err) {
        if (err && err.response) {
            window.alert("Erreur : " + err.response.status + " - " + err.response.data.error);
        } else if (err.request) {
            window.alert("Pas de réponse ou requête non envoyée !")
        } else {
            window.alert("Une erreur est survenue !")
        }
    }

    handleChange(e) {
        const name = e.target.name;
        const type = e.target.type;
        const value = type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value
        })

        // On régule les cas où le bouton sauvegarder est cliquable
        if (e.target.type == 'checkbox' && e.target.value == false) { this.setState({ disabled: true }) };
        if ((e.target.type == 'checkbox' && e.target.value == true && this.state.modif === true) || (this.state.checked === true && e.target.type != 'checkbox')) { this.setState({ modif: true, disabled: false }) };

        // On ajuste la liste des communes selon la wilaya sélectionnée
        if (name === 'wilaya') {
            this.customListCommunes(e.target.value);
        }

        //On effectue les traitements sur les entrées
        if (name === 'capacite' || name === 'latitude' || name === 'longitude' || name === 'nomBorne') {
            if (name === 'nomBorne') {
                if (e.target.value === "") { this.setState({ isValid: false }) }
                else { this.setState({ isValid: true }) }
            } else {
                if (e.target.value === "" || parseInt(e.target.value, 10) < 1) { this.setState({ isValid: false }) }
                else { this.setState({ isValid: true }) }
            };
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        //If the user did actually change an input, we save it
        if (this.state.nomBorne != this.props.borne[1] ||
            this.state.wilaya != this.props.borne[2] ||
            this.state.latitude != this.props.borne[4] ||
            this.state.longitude != this.props.borne[5] ||
            this.state.commune != this.props.borne[3] ||
            this.state.capacite != this.props.borne[6]) {

            const MICROSERVICE = API_BORNES + this.props.borne[0].toString() + '/';

            let tokenStr = getToken();
            axios.put(MICROSERVICE, {
                nomBorne: this.state.nomBorne != this.props.borne[1] ? this.state.nomBorne : this.props.borne[1],
                wilaya: this.state.wilaya != this.props.borne[2] ? this.state.wilaya : this.props.borne[2],
                latitude: this.state.latitude != this.props.borne[4] ? this.state.latitude : this.props.borne[4],
                longitude: this.state.longitude != this.props.borne[5] ? this.state.longitude : this.props.borne[5],
                commune: this.state.commune != this.props.borne[3] ? this.state.commune : this.props.borne[3],
                nbVehicules: this.state.capacite != this.props.borne[6] ? this.state.capacite : this.props.borne[6]
            }, { headers: { "authorization": `Bearer ${tokenStr}` } }).then((res) => {
                let borne = [this.props.borne[0], this.state.nomBorne, this.state.wilaya, this.state.commune, parseFloat(this.state.latitude), parseFloat(this.state.longitude), parseInt(this.state.capacite, 10), this.props.borne[7], this.props.borne[8]];
                // On repasse la nouvelle borne au composant père
                this.props.receiveBorne(borne, true);
            }).catch((error) => {
                this.errorHandler(error);
            })
        }
    }

    /**
     * récupère la liste des communes selon la wilaya spécifiée
     * @param {String} valWilaya le nom de la wilaya 
     * @param {Array} valCommunes paramètre optionnel spécifiant la liste des communes
     */
    customListCommunes(valWilaya, valCommunes = null) {
        let stop = false, i = 0;
        let commWilaya = [], allComm = [];

        // Structure de données : 
        // indices paires : nom de la wilaya
        // indices impaires : objet de chaines (communes)

        this.setState({ communes: [] });
        if (valCommunes == null) {
            allComm = this.state.toutesCommunes;
            while (stop === false && i < allComm.length) {
                if (allComm[i] === valWilaya) {
                    commWilaya = allComm[i + 1];
                    stop = true;
                }
                i += 2;
            }
        } else {
            commWilaya = valCommunes;
        }

        this.setState({ communes: commWilaya });
    }

    /**
     * permet de récupérer le nombre de places libres depuis la BDD
     */
    loadPlacesLibres() {
        let tokenStr = getToken();
        let MICROSERVICE = API_BORNES + this.props.borne[0].toString() + '/';
        axios.get(MICROSERVICE, { headers: { "authorization": `Bearer ${tokenStr}` } })
            .then((res) => {
                this.setState({ placesLibres: res.data[0]["nbPlaces"] });
            })
            .catch(error => {
                this.errorHandler(error);
            })
    }

    render() {
        return (
            <Container fluid={true} style={{ backGroundColor: 'white', border: '1px solid #d5d5d5' }}>
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <Row>
                            <Col xs={8}>
                                <Label htmlFor="checked">Mode modification</Label>
                            </Col>
                            <Col xs={2}>
                                <Switch
                                    name="checked"
                                    checked={this.state.checked}
                                    onChange={this.handleChange} >
                                </Switch>
                            </Col>
                        </Row>


                    </FormGroup>

                    <Row>
                        <Col xs={12}>
                            <Divider variant="inset" />
                        </Col>
                    </Row>
                    <br />

                    <FormGroup>
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="id">Identifiant</Label>
                                <Input
                                    type="number"
                                    name="id"
                                    value={this.props.borne[0]}
                                    disabled={true}
                                    required
                                />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="nomBorne">Nom borne</Label>
                                <Input
                                    type="text"
                                    name="nomBorne"
                                    value={this.state.nomBorne}
                                    disabled={!this.state.checked}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup >
                        <Row>
                            <Col xs={6}>
                                <FormGroup>
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input
                                        type="number"
                                        name="latitude"
                                        value={this.state.latitude}
                                        disabled={!this.state.checked}
                                        onChange={this.handleChange}
                                        required />
                                </FormGroup>
                            </Col>
                            <Col xs={6}>
                                <FormGroup>
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input
                                        type="number"
                                        name="longitude"
                                        value={this.state.longitude}
                                        disabled={!this.state.checked}
                                        onChange={this.handleChange}
                                        required />
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="wilaya">Wilaya</Label>
                                <Input
                                    type="select"
                                    name="wilaya"
                                    value={this.state.wilaya}
                                    disabled={!this.state.checked}
                                    onChange={this.handleChange}
                                >
                                    <option value={this.state.wilaya}>{this.state.wilaya}</option>
                                    {this.state.wilayas.map((wil) => {
                                        if (wil.localeCompare(this.state.wilaya, 'en', { sensitivity: 'base' }) != 0) {
                                            return <option value={wil}>{wil}</option>
                                        }
                                    })}
                                </Input>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="commune">Commune</Label>
                                <Input
                                    type="select"
                                    name="commune"
                                    value={this.state.commune}
                                    disabled={!this.state.checked}
                                    onChange={this.handleChange}
                                >
                                    {
                                        (() => {
                                            if (this.state.wilaya == this.props.borne[2]) {
                                                return <option value={this.props.borne[3]}>{this.props.borne[3]}</option>
                                            } /*else {
                                                return <option value={this.state.communes[0]}>{this.state.communes[0]}</option>
                                            }*/
                                        })()
                                    }
                                    {this.state.communes.map((comm) => {
                                        //if (comm.localeCompare(this.state.commune, 'en', { sensitivity: 'base' }) != 0) {
                                        return <option value={comm}>{comm}</option>
                                        //}
                                    })}
                                </Input>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="capacite">Places totales</Label>
                                <Input
                                    type="number"
                                    name="capacite"
                                    value={this.state.capacite}
                                    disabled={!this.state.checked}
                                    onChange={this.handleChange}
                                />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col xs={12}>
                                <Label htmlFor="placesLibres" style={{ paddingRight: '2%' }}>Places libres</Label>
                                <LoopOutlinedIcon onClick={this.loadPlacesLibres} />
                                <Input
                                    type="number"
                                    name="placesLibres"
                                    value={this.state.placesLibres}
                                    disabled={true} />
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col xs={4}>
                                <Button
                                    type="submit"
                                    id="submitButton"
                                    style={{ backgroundColor: '#252834', color: '#ffffff' }}
                                    disabled={(this.state.disabled || !this.state.isValid)}>
                                    Sauvegarder
                                </Button>
                            </Col>
                            <Col xs={8}></Col>
                        </Row>
                    </FormGroup>
                </Form>
            </Container >
        )
    };
}

export default ModifBorne;