import React from "react";
import DirigeantService from "../../services/DirigeantService";

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

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeMDP = this.onChangeMDP.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeSalaire = this.onChangeSalaire.bind(this);
    this.saveDirigeant = this.saveDirigeant.bind(this);
    this.newDirigeant= this.newDirigeant.bind(this);

    this.state = { 
      nom: "",
      prenom: "", 
      email:"",
      motDePasse:"",
      salaire:0,
      submitted: false,
      exampleModal: false,
      message:''
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
  saveDirigeant(event) {
    var data = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      motDePasse: this.state.motDePasse,
      salaire: this.state.salaire,
    };
    event.preventDefault()

    DirigeantService.create(data)
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
        this.setState({message: "assurer que tout les champs sont remplis ainsi que le mot de passe et l'email sont valides!"});
      });
  }

  newDirigeant() {
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
       <Button
          color="default"
          type="button"
          size="sm"
          onClick={() => this.toggleModal("exampleModal")}
        >
          <i className="ni ni-fat-add" />
          Ajouter un Dirigeant
        </Button>  
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
                  <strong>Susccés!</strong> ! vous avez ajouté un nouveau dirigeant avec succées 
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
              <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
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
                  <CardBody className="px-lg-5 py-lg-5">
                    <div className="text-center text-muted mb-4">
                     <h1>Ajouter un nouvel dirigeant</h1> 
                    </div>
                    <div className="text-center">
                     <p> {this.state.message}</p> 
                    </div>
                    <Form role="form" onSubmit={this.saveDirigeant}>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input 
                            type="text"
                            className="form-control"
                            id="nom"
                            required
                            value={this.state.nom}
                            onChange={this.onChangeNom}
                            name="nom"
                          placeholder="Nom" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-circle-08" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input 
                            type="text"
                            className="form-control"
                            id="prenom"
                            required
                            value={this.state.prenom}
                            onChange={this.onChangePrenom}
                            name="prenom"
                          placeholder="Prénom" />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-email-83" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Email"
                           type="email"
                           className="form-control"
                           id="email"
                           required="true"
                           value={this.state.email}
                           onChange={this.onChangeEmail}
                           name="email"/>
                        </InputGroup>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-lock-circle-open" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input 
                            type="password"
                            className="form-control"
                            id="mdb"
                            required
                            value={this.state.mdp}
                            onChange={this.onChangeMDP}
                            name="mdb"
                          placeholder="Mot de passe" />
    
                        </InputGroup>
                        <div className="text-center">
                        <p>le mot de passe doit contenir au moins une majuscule, et au moins 8 caractéres</p>
                        </div>
                       
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-money-coins" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input placeholder="Salaire"
                           type="number"
                           className="form-control"
                           id="salaire"
                           required
                           value={this.state.salaire}
                           min='0'
                           onChange={this.onChangeSalaire}
                           name="salaire"/>
                        </InputGroup>
                      </FormGroup>
                     
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="default"
                          type="submit"
    
                        >
                          Confirmer l'ajout
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </div>
                  )}
  
              </div>
              </Modal>
      </>
    );
  }
}

export default Modals;