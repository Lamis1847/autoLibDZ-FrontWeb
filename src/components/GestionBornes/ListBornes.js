import React, { Component } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from 'reactstrap';

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Button
} from "reactstrap";

import Map from "./Map.js"
import AddBorne from "./AddBorne.js"
import CustomAlert from './CustomAlert.js';
import Failure from './Failure.js'
import ResultOperation from './ResultOperation.js'
import { getToken } from '../../scripts/Network.js'
import VisuAndModifBorne from './VisuAndModifBorne/VisuAndModifBorne.js'
const API_All_BORNES = process.env.REACT_APP_GESTION_BORNES_URL + 'all';
const API_DELETE_BORNE = process.env.REACT_APP_GESTION_BORNES_URL;




class ListBornes extends Component {
  constructor(props) {
    super(props)
    this.onRowSelection = this.onRowSelection.bind(this);
    this.onRowsSuprrimer = this.onRowsSuprrimer.bind(this);
    this.onHideAddBorneModal = this.onHideAddBorneModal.bind(this);
    this.showAddBorneModal = this.showAddBorneModal.bind(this);
    this.onOppIrrever = this.onOppIrrever.bind(this);
    this.showDeleteModal  = this.showDeleteModal.bind(this);
    this.onRowsDetails = this.onRowsDetails.bind(this);
    this.showDetailsModal = this.showDetailsModal.bind(this);
    this.onHideBorneDetailsModal = this.onHideBorneDetailsModal.bind(this);
    this.state = {
      selected: [36.7029047, 3.1428341],
      data: [],
      showModal: false,
      showAlertIrreversible: false,
      showSuccessOperation: false,
      showFailure: false,
      showDetails: false,
      keyModal: 0,  // we change the key of the modal so react re render it with shown state as true 
      keyModal2: 4,
      keyModal3: 6,
      keyModal4: 8,
      keyModal5: 9,
      rowtodelete: -1,
      indextodelete: -1,
      indexDetails: -1,
      rowTodetails: -1
    }
  }

  componentDidMount() {
    if (this.props.bornes == null) {
      let tokenStr =  getToken();
      //console.log(tokenStr);
      let bornes = []
      this.setState({ data: bornes });
      axios.get(API_All_BORNES,{ headers: {"authorization" : `Basic ${tokenStr}`} })
        .then((res) => {
          let bornes = []
          for (const borne of res.data) {
            bornes.push([borne['idBorne'], borne['wilaya'], borne['nbVehicules'], borne['nbPlaces'], [borne['latitude'], borne['longitude']], borne['nomBorne']])
          }
          this.setState({ data: bornes });

        })
        .catch(err => {
          if (err.response) {
            window.alert(err.response.data)
          } else if (err.request) {
            // client never received a response, or request never left
            window.alert("Pas de réponse ou requête non envoyée !")
          } else {
            window.alert("une erreur est survenue !")
          }
        }
        )
    } else {
      this.setState({ data: this.props.bornes });
    }
  }
  //without using async i had a problem : setState doesnt set the state immediatly so accesing the state right  after setting it returns an old value
  async onRowSelection(rowData, rowMeta) {
    await this.setState({ selected: rowData[4], popup: rowData[5] });
  }

  async componentWillReceiveProps(nextProps) {
    // await this.setState({ position: nextProps.coordonnes ,popup: nextProps.popup});
    let newBornes = []
    console.log(nextProps)
    if (nextProps.bornes != null) {
      nextProps.bornes.map((borne) => {
        newBornes.push([borne['idBorne'], borne['wilaya'], borne['nbVehicules'], borne['nbPlaces'], [borne['latitude'], borne['longitude']], borne['nomBorne']])
      });
    } else {
      let bornes = []
      let tokenStr =  getToken();
      this.setState({ data: bornes });
      axios.get(API_All_BORNES,{ headers: {"authorization" : `Basic ${tokenStr}`} })
        .then((res) => {
          let bornes = []
          for (const borne of res.data) {
            bornes.push([borne['idBorne'], borne['wilaya'], borne['nbVehicules'], borne['nbPlaces'], [borne['latitude'], borne['longitude']], borne['nomBorne']])
          }
          this.setState({ data: bornes });

        })
        .catch(err => {
          if (err.response) {
            window.alert(err.response.data)
          } else if (err.request) {
            // client never received a response, or request never left
            window.alert("Pas de réponse ou requête non envoyée !")
          } else {
            window.alert("une erreur est survenue !")
          }
        })
    }
    await this.setState({ data: newBornes });
  }

  onRowsSuprrimer(rowsDeleted) {
    this.setState({ indextodelete: rowsDeleted })
    this.setState({ rowtodelete: this.state.data[parseInt(rowsDeleted)][0] })
    this.showDeleteModal()
  }
  onRowsDetails(rowIndex){
    this.setState({ indexDetails: rowIndex})
    let borne = this.state.data[parseInt(rowIndex)]
    console.log(borne);
  //  borne['idBorne'], borne['wilaya'], borne['nbVehicules'], borne['nbPlaces'], [borne['latitude'], borne['longitude']], borne['nomBorne']]
    let broned = [parseInt(borne[0]), borne[5], borne[1], borne[5], borne[4][0], borne[4][1], borne[2],borne[3],1]
    console.log(broned);
    this.setState({ rowTodetails: broned})
    this.showDetailsModal()
  }
  showDetailsModal(){
    this.setState({showDetails:true,keyModal5: this.state.keyModal5 + 1 % 2})
  }
  onHideBorneDetailsModal(success, newBorne) {
    let data = this.state.data
    if (success) {
     data[this.state.indexDetails] = [newBorne[0], newBorne[2], newBorne[6], newBorne[7], [newBorne[4], newBorne[5]], newBorne[1]]
    // console.log(newBorne);
      this.setState({ showSuccessOperation: success, data: data, keyModal3: this.state.keyModal3 + 1 % 6 })
    }
  }
  showAddBorneModal() {
    this.setState({ showModal: true, keyModal: this.state.keyModal + 1 % 2 })
  }
  showDeleteModal(){
    this.setState({showAlertIrreversible:true,keyModal2: this.state.keyModal2 + 1 % 4})
   }

  onHideAddBorneModal(success, newBorne) {
    let data = this.state.data
    if (success) {
      data.push([newBorne['idBorne'], newBorne['wilaya'], newBorne['nbVehicules'], newBorne['nbPlaces'], [newBorne['latitude'], newBorne['longitude']], newBorne['nomBorne']])
      this.setState({ showSuccessOperation: success, data: data, keyModal3: this.state.keyModal3 + 1 % 6 })
    }
  }
  onOppIrrever(accepted) {
    if (accepted) {
      this.deleteBorne()
    }
  }
  deleteBorne() {
    //console.log(this.state.rowtodelete)
     let tokenStr =  getToken();
    axios.delete(API_DELETE_BORNE + this.state.rowtodelete,{ headers: {"authorization" : `Basic ${tokenStr}`} })
      .then((res) => {
        let bornes = this.state.data;
        bornes.splice(this.state.indextodelete, 1)
       this.setState({ data: bornes, showSuccessOperation: true, keyModal3: this.state.keyModal3 + 1 % 2 });
      })
      .catch(err => {
        if (err.response) {
          //console.log(err.response.data)
          this.setState({ showFailure: true, keyModal4: this.state.keyModal4 + 1 % 2 })

        } else if (err.request) {
          // client never received a response, or request never left
          window.alert("Pas de réponse ou requête non envoyée !")
        } else {
          window.alert("une erreur est survenue !")
        }
      }
      )
  }


  render() {
    const columns = [
      {
        name: "ID",
        options: {
          sort: true
        }
      },
      {
        name: "Wilaya",
        options: {
          sort: true
        }
      },
      {
        name: "Capacité",
        options: {
          sort: true
        }
      },
      {
        name: "Places libres",
        options: {
          sort: true
        }
      },
      {
        name: "cordonnees",
        options: {
          display: false,
        }
      },
      {
        name: "nom",
        options: {
          display: false,
        }
      },
      {
        name: "",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            return (
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  href="#pablo"
                  role="button"
                  size="sm"
                  color=""
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem
                    href="#"
                    onClick={(e) => { e.preventDefault(); this.onRowsDetails(dataIndex); }}
                  >
                    Détails
                    </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={(e) => { e.preventDefault(); this.onRowsSuprrimer(dataIndex); }}
                    style={{ color: '#F5365C' }}
                  >
                    Supprimer
                    </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            );
          }
        }
      }
    ];

    const options = {
      filterType: 'checkbox',
      selectableRows: 'none',
      responsive: 'simple',
      viewColumns:false,
      filter: false,
      print: false,
      onRowClick: this.onRowSelection,
      onRowsDelete: this.onRowsSuprrimer,
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
        },
        selectedRows: {
          text: "ligne(s) sélectionné(s)",
          delete: "Supprimer",
          deleteAria: "Supprimer les lignes choisies",
        },
      },
    };
    return (
      <div className="main-content">
        <div className="mt-40">
          <Container>
          <div style={{padding:"12px 12px 20px 12px"}}>
                <Button variant="contained" onClick={this.showAddBorneModal} style={{backgroundColor:"#252834", textTransform:"capitalize", color:"white", fontWeight:'bold', width:'150px'}}>
                + Ajouter
                </Button>
              </div>
            <Row>
              <Col xs={6} md={8}>
                <h2>Liste des bornes</h2>
                <MUIDataTable
                  title={
                    <div>
                      <Row>
                        <Col md={8}>
                          <h3>{"Toutes les bornes (" + this.state.data.length + " résultats)"}</h3>
                        </Col>
                      </Row>
                    </div>}
                  data={this.state.data}
                  columns={columns}
                  options={options}
                />
              </Col>
              <Col xs={6} md={4}>
                <h2>Position sur la carte</h2>
                <Map coordonnes={this.state.selected} popup={this.state.popup}></Map>
              </Col>
            </Row>
            <AddBorne key={this.state.keyModal} shown={this.state.showModal} onHide={this.onHideAddBorneModal}></AddBorne>
            <CustomAlert key={this.state.keyModal2} shown={this.state.showAlertIrreversible} onHide={this.onOppIrrever} ></CustomAlert>
            <ResultOperation key={this.state.keyModal3} shown={this.state.showSuccessOperation}></ResultOperation>
            <Failure key={this.state.keyModal4} shown={this.state.showFailure}></Failure>
            <VisuAndModifBorne key={this.state.keyModal5} shown={this.state.showDetails} borne={this.state.rowTodetails} onHide={this.onHideBorneDetailsModal}></VisuAndModifBorne>
          </Container>
        </div>
      </div>)

  }
}
export default ListBornes;