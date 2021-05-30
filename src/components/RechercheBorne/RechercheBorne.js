import React, { Component } from 'react';
import './RechercheBorne.css';
import { Collapse, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from "axios";
import rollDown from "./rollDown.svg";
import rollUp from "./rollUp.svg";


const API = 'https://autolib-dz.herokuapp.com/api/';
const MICROSERVICES = { wilayas: 'bornes/wilaya/', filtres: 'bornes/filter/' }

class RechercheBorne extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Form state
            wilaya: '',
            commune: '',
            capacite: '',
            qtt: 'min',
            placesLibres: '',
            id: '',

            // Data from DB
            wilayas: [],
            toutesCommunes: [],
            communes: [],

            // State of the UI component (open/close)
            collapse: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    /**
     * recupère les bornes disponibles et modifie l'état du composant
     */
    componentDidMount() {
        let MICROSERVICE = API + MICROSERVICES['wilayas']
        let allWilayas = [], allCommunesWil = [], allCommunes = []

        axios.get(MICROSERVICE)
            .then((res) => {
                for (const elt of res.data) {
                    allWilayas.push(elt['wilaya'])
                }

                // Remplissage de la liste des wilayas
                this.setState({ wilayas: allWilayas.sort() })

                // Partie commentée : servait dans une version précédente à 
                // remplir la liste des wilayas en parcourant toutes les bornes
                /*this.setState({
                    wilayas: (allWilayas.filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    })).sort()
                })*/

                // Si tout ce qui précède s'est bien déroulé, on exécute les requêtes suivantes (communes)
                allWilayas.forEach(elt => {
                    axios.get(MICROSERVICE + elt + '/commune')
                        .then((result) => {
                            allCommunesWil = []
                            allCommunesWil.push()
                            result.data.forEach(datac => {
                                allCommunesWil.push(datac['commune'])
                            })
                            allCommunesWil.sort()
                            allCommunes.push(elt, allCommunesWil)
                        }).catch(error => {
                            alert("Une erreur a eu lieu, veuillez contacter le support")
                        })
                })

                // Remplissage de la liste des communes
                this.setState({ toutesCommunes: allCommunes })

            }).catch(error => {
                alert("Une erreur a eu lieu, veuillez contacter le support")
            })
    }

    /**
     * change l'état du composant selon les entrées de l'utilisateur
     * @param {Event} e 
     */
    handleChange(e) {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })

        // On ajuste la liste des communes selon la wilaya sélectionnée
        if (name === 'wilaya') {
            this.customListCommunes(e.target.value)
        }
    }

    /**
     * envoie une liste de bornes au composant d'affichage de liste
     * @param {Event} e 
     */
    handleSubmit(e) {
        e.preventDefault();

        let newProps = []

        let MICROSERVICE = API + MICROSERVICES['filtres']

        let capacite = this.checkCapacite(this.state.capacite)

        console.log(this.state.id + ' ' + parseInt(capacite[0]) + ' ' + parseInt(capacite[1]) + ' ' + parseInt(this.state.placesLibres))
        axios.post(MICROSERVICE, {
            idBorne: this.state.id != '' ? parseInt(this.state.id) : null,
            wilaya: this.state.wilaya != '' ? this.state.wilaya : null,
            commune: this.state.commune != '' ? this.state.commune : null,
            nbVehiculesMin: parseInt(capacite[0]),
            nbVehiculesMax: parseInt(capacite[1]),
            nbPlacesOp: this.state.qtt,
            nbPlaces: this.state.placesLibres != '' ? parseInt(this.state.placesLibres) : (this.state.qtt == 'min' ? 0 : 99999)
        }).then((res) => {
            console.log(res.data)
            this.setToDefault()
        }).catch(error => {
            if (error.response.status == 404) {
                alert("Aucune borne ne correspond à vos critères de recherche")
            }
        })
    }

    /**
     * récupère la liste des communes selon la wilaya spécifiée
     * @param {String} valWilaya le nom de la wilaya 
     */
    customListCommunes(valWilaya) {
        let stop = false, i = 0
        let commWilaya = []

        this.state.communes = []

        while (stop === false && i < this.state.toutesCommunes.length) {
            if (this.state.toutesCommunes[i] === valWilaya) {
                commWilaya = this.state.toutesCommunes[i + 1]
                stop = true
            }
            i += 2
        }

        this.setState({ communes: commWilaya })
    }

    /**
     * remet le composant à son état par défaut
     */
    setToDefault() {
        this.state.wilaya = '';
        this.state.capacite = '';
        this.state.id = '';
        this.state.placesLibres = '';
        this.state.commune = '';
    }
    /**
     * vérifie si une borne remplit le critère de capacité
     * @param {String} capacite 
     * @returns {Array} of int 
     */
    checkCapacite(capacite) {
        let res = [];
        switch (capacite) {
            case '10':
                res = [0, 9]
                break;
            case '50':
                res = [10, 50]
                break;
            case '100':
                res = [50, 100]
                break;
            case '101':
                res = [100, 99999]
                break;
            default:
                res = [0, 99999]
                break;
        }
        return res;
    }

    /**
     * change l'état d'affichage du composant de recherche
     * @param {Event} e 
     * @returns {Boolean} 
     */
    onCollapseClick(e) {
        e.preventDefault();
        this.setState((state, props) => ({
            collapse: !state.collapse
        }));
        return this.state.collapse;
    }

    render() {
        return (
            <div className="rb-container" >
                <div className="rb-headline">
                    <h1>Rechercher une borne</h1>
                    <div>
                        <a onClick={(e) => this.onCollapseClick(e)}>
                            <img src={(this.state.collapse) ? rollUp : rollDown}
                                alt="collapse" />
                        </a>
                    </div>
                </div>

                <Collapse isOpen={this.state.collapse} > {/* Permettre un affichage lors du clic */}
                    <Form onSubmit={this.handleSubmit}> {/* Conteneur global - display flex */}
                        <FormGroup className="rb-block"> {/* Conteneur des 2 groupes de 3 select - display block */}
                            <FormGroup className="rb-flex"> {/* Conteneur des 3 select - display flex */}
                                <FormGroup className="rb-block"> {/* Conteneur individuel - display block */}
                                    <Label for="rb-wilaya">Wilaya</Label>
                                    <Input type="select" name="wilaya" id="rb-wilaya"
                                        value={this.state.wilaya} onChange={this.handleChange}>
                                        <option value="">-</option>
                                        {this.state.wilayas.map((wil) => {
                                            return <option value={wil}>{wil}</option>
                                        })}
                                    </Input>
                                </FormGroup>

                                <FormGroup className="rb-block">
                                    <Label for="rb-commune">Communes</Label>
                                    <Input type="select" name="commune" id="rb-commune"
                                        value={this.state.commune} onChange={this.handleChange}>
                                        <option value="">-</option>
                                        {this.state.communes.map((comm) => {
                                            return <option value={comm}>{comm}</option>
                                        })}
                                    </Input>
                                </FormGroup>

                                <FormGroup className="rb-block">
                                    <Label for="rb-capacite">Places totales</Label>
                                    <Input type="select" name="capacite" id="rb-capacite"
                                        value={this.state.capacite} onChange={this.handleChange}>
                                        <option value="">-</option>
                                        <option value="10">Moins de 10</option>
                                        <option value="50">Entre 10 et 50</option>
                                        <option value="100">Entre 50 et 100</option>
                                        <option value="101">Plus de 100</option>
                                    </Input>
                                </FormGroup>
                            </FormGroup>

                            <FormGroup className="rb-flex">
                                <FormGroup className="rb-block">
                                    <Label for="rb-qtt">Places libres</Label>
                                    <FormGroup className="rb-flex">
                                        <Input type="select" name="qtt" id="rb-qtt"
                                            value={this.state.qtt} onChange={this.handleChange}>
                                            <option value="min">min</option>
                                            <option value="max">max</option>
                                        </Input>
                                        <Input type="select" name="placesLibres" id="rb-plibres"
                                            value={this.state.placesLibres} onChange={this.handleChange}>
                                            <option value="">-</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="30">30</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </Input>
                                    </FormGroup>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="rb-id">id</Label>
                                    <Input type="text" name="id" id="rb-id" placeholder="Saisissez l'id de la borne"
                                        value={this.state.id} onChange={this.handleChange} />
                                </FormGroup>

                                <FormGroup>
                                </FormGroup>
                            </FormGroup>
                        </FormGroup>
                        {/*JSON.stringify(this.state)*/}

                        <FormGroup>
                            <Button type="submit" className="custom-btn-default" color="primary">LANCER</Button>
                        </FormGroup>
                    </Form>
                </Collapse>
            </div >
        )
    };
}

export default RechercheBorne;






// ------------------------------------------------------------------------------------------------------
/******* DEPRECATED METHODS *******/
/*
 * filtre les bornes selon les critères de recherche de l'utilisateur
 * @param {String} id
 * @param {String} wilaya
 * @param {String} commune
 * @param {String} qtt
 * @param {String} pLibre
 * @param {String} capacite
 * @returns {Array} of Bornes
 *//*
getBornesOnConditions(id = "", wilaya = "", commune = "", qtt = "", pLibre = "", capacite = "") {
return this.state.bornes.filter(borne =>
(id != "" ? (borne[0] == id ? true : false) : true)
&& (wilaya != "" ? (borne[1] == wilaya ? true : false) : true)
&& (commune != "" ? (borne[2] == commune ? true : false) : true)
&& (pLibre != "" ? (this.checkPlacesLibres(qtt, pLibre, borne) ? true : false) : true)
&& (capacite != "" ? (this.checkCapacite(capacite, borne) ? true : false) : true)
)
}

/**
* vérifie si une borne remplit le critère de places libres
* @param {String} qtt
* @param {Stirng} pLibre
* @param {String} borne
* @returns {Boolean}
*//*
checkPlacesLibres(qtt, pLibre, borne) {
   if (qtt == "min") {
       if (parseInt(pLibre) <= parseInt(borne[3])) {
           return true
       } else {
           return false
       }
   } else {
       if (parseInt(pLibre) >= (parseInt(borne[3]))) {
           return true
       } else {
           return false
       }
   }
}*/