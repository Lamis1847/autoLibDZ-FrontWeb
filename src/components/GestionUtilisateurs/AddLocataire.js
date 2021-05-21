import React from "react";
import LocataireService from "../../services/LocataireService";

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
    this.saveLocataire = this.saveLocataire.bind(this);
    this.newLocataire= this.newLocataire.bind(this);

    this.state = { 
      nom: "",
      prenom: "", 
      email:"",
      motdepasse:"",
      submitted: false,
      exampleModal: false
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
      motdepasse: e.target.value
    });
  }
  saveLocataire() {
    var data = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      motdepasse: this.state.motdepasse,
    };

    LocataireService.create(data)
      .then(response => {
        this.setState({
          nom: response.data.nom,
          prenom: response.data.prenom,
          email: response.data.email,
          motdepasse: response.data.motdepasse,
          submitted: true,
        });
        console.log(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  }

  newLocataire() {
    this.setState({
      nom: "",
      prenom: "", 
      email:"",
      motdepasse:"",
      submitted: false
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
          Ajouter un locataire
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
                  <strong>Susccés!</strong> ! vous avez ajouté un nouveau locataire avec succées 
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
                     <h1>Ajouter un nouveau locataire</h1> 
                    </div>
                    <Form role="form">
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
                           type="text"
                           className="form-control"
                           id="email"
                           required
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
                      </FormGroup>
                     
                      <div className="text-center">
                        <Button
                          className="my-4"
                          color="default"
                          type="button"
                          onClick={this.saveLocataire}
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