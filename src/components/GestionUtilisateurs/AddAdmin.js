import React from "react";
import AdminService from "../../services/AdministrateurService";
import { Container } from "reactstrap";
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Alert,
  Col,
  Row
} from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { Typography } from '@material-ui/core';
class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeMDP = this.onChangeMDP.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeSalaire = this.onChangeSalaire.bind(this);
    this.saveAdmin = this.saveAdmin.bind(this);
    this.newAdmin= this.newAdmin.bind(this);
  
    this.state = { 
      nom: "",
      prenom: "", 
      email:"",
      motDePasse:"",
      salaire:0,
      submitted: false,
      exampleModal: false,
      message:'',
      slide:'false',

    };
  }


  toggleModal = state => {
       this.setState({
        [state]: !this.state[state]
      });
  };
  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeMDP(e) {
    this.setState({
      motDePasse: e.target.value
    });
  }
  onChangeSalaire(e) {
    this.setState({
      salaire: e.target.value
    });
  }
  saveAdmin(event) {
    var data = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      motDePasse: this.state.motDePasse,
      salaire: this.state.salaire,
    };
    event.preventDefault()

    AdminService.create(data)
      .then(response => {
        this.setState({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          motDePasse: response.data.motDePasse,
          salaire: response.data.salaire,
          submitted: true,
        });        
      })
      .catch(err => { 
        if (err.response) {

         this.setState({
           message:err.response.data.message,
          }
         )} 
      });
  }

  newAdmin() {
    this.setState({
      nom: "",
      prenom: "", 
      email:"",
      motDePasse:"",
      salaire:"",
      submitted: false,
      message:""
    });
  }
  refreshPage() {
    window.location.reload(false);
  }
  render() {
    return (
      <>
      <div style={{padding:"12px 12px 20px 12px"}}>
              <Button type='button' variant="contained"  onClick={() => this.toggleModal("exampleModal")} style={{backgroundColor:"#252834", textTransform:"capitalize", color:"white", fontWeight:'bold', width:'150px'}}>
              + Ajouter
              </Button>
        
            </div>  
        <Modal
        backdrop="static" keyboard={false}
          className="modal-dialog-centered"
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal("exampleModal")}
        >
          
      <div className="submit-form">
      
        {this.state.submitted ? (
        <>
         <Row>

           <Col>
              <Alert color="success">
                  <strong>Susccés!</strong> ! vous avez ajouté un nouvel administrateur avec succées 
              </Alert>
           </Col>
         </Row>
         <Row>
           <Col style={{margin:"2%"}}>
              <Button color="secondary" size="sm" type="button" onClick={this.refreshPage}>
                 Retour
              </Button>
           </Col>
         </Row>
        
        </>
          ) : (
            <React.Fragment>
             <Container fluid style={{paddingBottom:"40px"}}>
             <button
              style={{margin:"3%"}}
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("exampleModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
                    <div style={{padding:"20px"}}>
                    <h1>Nouvel Administrateur</h1>
                    <h4 style={{opacity:'0.5'}}>informations d'un administrateur</h4>
                    </div>
                    <div style={{margin:'10px 40px 30px 40px'}}>
                          <strong style={{color:'#F5365C'}}>{this.state.message}</strong>
                       </div>
                    <form onSubmit={this.saveAdmin}>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        type='text'
                        required
                        id="nom"
                        label="Nom"
                        placeholder="Exemple : Boucherir"
                        variant="outlined"
                        fullWidth='true'
                        onChange={this.onChangeNom}
                        />
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        type='text'
                        required
                        id="prenom"
                        label="Prénom"
                        placeholder="Exemple : Mohamed"
                        variant="outlined"
                        fullWidth='true'
                        onChange={this.onChangePrenom}
                        />
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        type='email'
                        required
                        id="email"
                        label="Email"
                        placeholder="Exemple : admin@esi.dz"
                        variant="outlined"
                        fullWidth='true'
                        onChange={this.onChangeEmail}
                        >
                        </TextField>
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        required
                        id="motdepasse"
                        label="Mot de passe"
                        variant="outlined"
                        fullWidth='true'
                        onChange={this.onChangeMDP}
                        type='password'
                        />
                        <div className="text-center">
                        <strong>le mot de passe doit contenir au moins une majuscule, et au moins 8 caractéres</strong>
                        </div>
                        </div>
                        <br></br>
                        <div style={{padding:"5px 40px"}}>
                        <TextField
                        required
                        type='number'
                        id="salaire"
                        label="Salaire"
                        placeholder="Salaire"
                        variant="outlined"
                        fullWidth='true'
                        onChange={this.onChangeSalaire}
                        InputProps={{ inputProps: { min: 0} }}
                        />
                        </div>
                        
                        <div className="flex-container" style={{display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                                <div>
                                <Button type='submit' style={{backgroundColor:"#252834", textTransform:"capitalize", color:"white", fontWeight:'bold', width:'150px'}} variant="contained">
                                    Confirmer
                                </Button>
                                </div>
                        </div>
                    </form>
            </Container>
        </React.Fragment>
              
                  )}
  
              </div>
            
              </Modal>
      </>
    );
  }
}

export default Modals;