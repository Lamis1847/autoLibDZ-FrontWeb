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
class Valide extends React.Component{
    constructor(props){
        super(props);
        this.onChangeValide = this.onChangeValide.bind(this);
        this.state = {
            valide: false,
            valideModal: false,
            photoModal: false,
            permisModal: false,
            nom: "badreddine",
            prenom: "zatout",
        }
    }
    toggleModal = state => {
        this.setState({
         [state]: !this.state[state]
       });
   }
   onChangeValide(e){
       this.setState({
            valide: e.target.value
       });
   }
   render(){
       return(
           <>
                <Button
                  color="default"
                  type="button"
                  size="sm"
                  onClick={() => this.toggleModal("valideModal")}
                >
                  <i className="ni ni-fat-add" />
                  Valider un locataire
                </Button> 
                <Modal
                    backdrop="static" keyboard={false}
                    className="modal-dialog-centered"
                    isOpen={this.state.valideModal}
                    toggle={() => this.toggleModal("valideModal")}
                >
                    <Card className="bg-secondary shadow border-0">
                        <button
                          style={{margin:"3%"}}
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => this.toggleModal("valideModal")}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <h1>Etat du Locataire</h1>
                            </div>
                            <div>
                                <h3>Informations saisies par le locataire: </h3>
                                <div>
                                    <Form>
                                        <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                          <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                              Nom
                                            </InputGroupText>
                                          </InputGroupAddon>
                                          <Input 
                                            type="text"
                                            className="form-control p-3"
                                            id="nom"
                                            disabled
                                            value={this.state.nom}
                                           />
                                        </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                        <InputGroup className="input-group-alternative">
                                          <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                              Prenom
                                            </InputGroupText>
                                          </InputGroupAddon>
                                          <Input 
                                            type="text"
                                            className="form-control p-3"
                                            id="dn"
                                            disabled
                                            value={this.state.prenom}
                                           />
                                        </InputGroup>
                                        </FormGroup>
                                    </Form>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Images forunies par le locataire</h3>
                                    </div>
                                    <div className="col-sm-3 mt-3">
                                        <i className="far fa-file fa-2x" />
                                    </div>
                                    <div className="col-sm-9 mt-3">
                                        <Button
                                          onClick={() => this.toggleModal("permisModal")}
                                        >
                                          Visualiser la photo de permis de conduite
                                        </Button>
                                    </div>
                                    <div className="col-sm-3 my-3">
                                        <i className="far fa-image fa-2x" />
                                    </div>
                                    <div className="col-sm-9 my-3">
                                        <Button
                                          onClick={() => this.toggleModal("photoModal")}
                                        >
                                          Visualiser la photo de locataire
                                        </Button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Decision</h3>
                                    </div>
                                    <div>
                                        <Form>
                                            {/* <FormGroup>
                                                  <Input 
                                                    type="radio"
                                                    className=""
                                                    id="valide"
                                                    required
                                                    value={this.state.valide}
                                                    name="valide"
                                                   />
                                            </FormGroup> */}
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Modal>
                <Modal
                  backdrop="static" keyboard={false}
                  className="modal-dialog-centered"
                  isOpen={this.state.photoModal}
                  toggle={() => this.toggleModal("photoModal")}
                >
                  <Card className="bg-secondary shadow border-0">
                  <button
                          style={{margin:"3%"}}
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => this.toggleModal("photoModal")}
                        >
                          <span aria-hidden={true}>×</span>
                  </button>
                  <CardBody>
                    <div className="text-center text-muted mb-4">
                        <h1>Photo de Locataire</h1>
                    </div>
                  </CardBody>

                  </Card>
                </Modal>
                <Modal
                  backdrop="static" keyboard={false}
                  className="modal-dialog-centered"
                  isOpen={this.state.permisModal}
                  toggle={() => this.toggleModal("permisModal")}
                >
                  <Card className="bg-secondary shadow border-0">
                  <button
                          style={{margin:"3%"}}
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => this.toggleModal("permisModal")}
                        >
                          <span aria-hidden={true}>×</span>
                  </button>
                  <CardBody>
                    <div className="text-center text-muted mb-4">
                        <h1>Permis de Conduite</h1>
                    </div>
                  </CardBody>

                  </Card>
                </Modal>

           </>
       )
   }
}
export default Valide;