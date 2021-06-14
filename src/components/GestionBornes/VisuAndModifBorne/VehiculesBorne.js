import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import MUIDataTable from 'mui-datatables';
import { Container, Row, Col } from 'reactstrap';
import './VisuAndModifBorne.css';
import outLink from "./outLink.svg";
import refresh from "./refresh.svg"
import axios from "axios";

const API = 'https://autolib-dz.herokuapp.com/api/';
const SERVICES = { Borne: 'bornes/', VecBorne: 'vehicules/' }
const WEB = 'https://autolib-dz-front.herokuapp.com/vehicules/'

class VehiculesBorne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicules: []
        }
        this.getVehiculesBorne = this.getVehiculesBorne.bind(this);
    }

    componentDidMount() {
        this.getVehiculesBorne()
    }

    getVehiculesBorne() {
        let MICROSERVICE = API + SERVICES['Borne'] + this.props.borne[0] + '/' + SERVICES['VecBorne']
        axios.get(MICROSERVICE)
            .then((res) => {
                let listVehicules = []
                res.data.forEach(vec => {
                    listVehicules.push({ numImmatriculation: vec['numImmatriculation'], marque: vec['marque'], modele: vec['modele'], etat: vec['etat'], options: WEB + vec['numChassis'] })
                    //listVehicules.push(vec)
                })
                this.setState({ vehicules: listVehicules })
            })
            .catch(error => {
                this.errorHandler(error)
            })
    }

    /**
     * affiche un message selon l'erreur qui s'est produite
     */
    errorHandler(error) {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    alert("Quelque chose s'est mal déroulé lors de l'opération, veuillez ré-essayer ultérieurement. Code erreur : 400")
                    break;
                case 401:
                    alert("Il semble que vous n'êtes plus authentifié. Veuillez vous authentifier pour effectuer cette action. Code erreur : 401")
                    break;
                case 403:
                    alert("Vous ne disposez pas des privilèges nécessaires pour accéder à cette ressource. Code erreur : 403")
                    break;
                case 404:
                    alert("Aucun résultat ne correspond à ce que vous recherchez. Code erreur : 404")
                    break;
                case 500:
                    alert("Quelque chose s'est mal déroulé lors de votre opération, veuillez ré-essayer ultérieurement. Code erreur : 500")
                    break;
                default:
                    alert("Quelque chose s'est mal déroulé, veuillez contacter le support pour plus d'informations")
                    break;
            }
        } else {
            alert("Quelque chose s'est mal déroulé, veuillez contacter le support pour plus d'informations")
        }
    }

    render() {
        const columns = [
            {
                name: "numImmatriculation",
                label: "Matricule",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "marque",
                label: "Marque",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "modele",
                label: "Modèle",
                options: {
                    filter: false,
                    sort: true
                }
            },
            {
                name: "etat",
                label: "État",
                options: {
                    filter: false,
                    sort: true,
                    customBodyRender: (etatVec) => {

                        let colorTxt = '#000000';

                        switch (etatVec) {
                            case 'en service':
                                colorTxt = '#2dce89'
                                break;
                            case 'hors service':
                                colorTxt = '#f5365c'
                                break;
                            default:
                                colorTxt = '#000000'
                                break;
                        }


                        return (
                            <h5 style={{ color: colorTxt }} > { etatVec}</h5>
                        )
                    }
                }
            },
            {
                name: "options",
                label: "Options",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (link) => {
                        return (
                            <a href={link}>
                                <img src={outLink} alt="Afficher le véhicule"></img>
                            </a>
                        )
                    }
                }
            }
        ]

        const data = this.state.vehicules

        const options = {
            responsive: 'standard',
            filter: false,
            searchPlaceholder: 'Saisir une marque...',
            download: false,
            print: false,
            viewColumns: false,
            selectableRows: 'none',
            textLabels: {
                body: {
                    noMatch: "Désolé, Aucune donnée trouvée",
                    toolTip: "Trier",
                },
                pagination: {
                    next: "Page suivante",
                    previous: "Page précédente",
                    rowsPerPage: "Ligne par page:",
                    displayRows: "/",
                }
            },
        };

        return (
            <div>
                <MUIDataTable
                    title={
                        <Container fluid={true}>
                            <Row>
                                <Col xs={12}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <h3 style={{ paddingRight: '5%' }}>Liste des véhicules de la borne</h3>
                                        <a className="refreshImg" onClick={this.getVehiculesBorne} >
                                            <img alt="Actualiser" src={refresh} />
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs={12}>
                                    <Divider variant="left" style={{ width: '100%' }}></Divider>
                                </Col>
                            </Row>
                        </Container>
                    }
                    data={data}
                    columns={columns}
                    options={options} />
            </div >
        )
    }
}

export default VehiculesBorne;