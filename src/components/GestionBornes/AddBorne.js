import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Button, Modal, ModalBody, ModalFooter, Row,Col } from "reactstrap";



class AddBorne extends Component{
    constructor(props){
        super(props)
        this.setModalOpen = this.setModalOpen.bind(this);
        this.handleChangeLongitude = this.handleChangeLongitude.bind(this);
        this.handleChangeLatitude = this.handleChangeLatitude.bind(this); 
        this.handleChangeCapacite = this.handleChangeCapacite.bind(this);
        this.handleChangeWilaya =  this.handleChangeWilaya.bind(this);
        this.handleChangeCommune = this.handleChangeCommune.bind(this);
        this.handleChangeNom = this.handleChangeNom.bind(this);
        this.required = this.required.bind(this);
        this.greaterThanOne = this.greaterThanOne.bind(this);
            this.state = {
                isOpen: this.props.shown,
                longitude: 0,
                latitude: 0,
                wilaya: '',
                commune: '',
                nom: '',
                capacite: 1,
                isValid: false,
         }
    }
    setModalOpen(value){
        this.props.onHide(true);
        this.setState({isOpen:value})
    }
    handleChangeLongitude(e){
        this.setState(
            {
                longitude: e.target.value,
            }
        )
    }
    handleChangeLatitude(e){
        this.setState(
            {
                latitude: e.target.value,
            }
        )
    }
    handleChangeWilaya(e){
        this.setState(
            {
                wilaya: e.target.value,
            }
        )
    }
    handleChangeCommune(e){
        this.setState(
            {
                commune: e.target.value,
            }
        )
    }
    handleChangeCapacite(e){
        this.setState(
            {
                capacite: e.target.value,
            }
        )
    }
    handleChangeNom(e){
        this.setState(
            {
                nom: e.target.value,
            }
        )
    }
    required(value){
        if (!value) {
            this.setState({isValid:false})
          return (
            <div className="alert alert-danger" role="alert">
              Ce champs est obligatoire!
            </div>
          );
        }
      };
      greaterThanOne(value){
        if (value<1) {
            this.setState({isValid:false})
          return (
            <div className="alert alert-danger" role="alert">
              La Capacité doit être supérieure à 0!
            </div>
          );
        }
      };

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isValid = true;
    this.form.validateAll();
    if(this.state.isValid){
        console.log(this.state.wilaya,this.state.longitude)

        //TODO: 
        /*
        -create alerts (small modals)
        -at this stage you have the information of a new borne despite wilaya and commune
        -do the request to backend, if added -> close modal with the function of props pass true and the new borne so it can be added to data in listeBornes
        -for deleting a born: 
            - create an alert of irreversible operation supprimer show this modal and confirmer of this modal calls the real event of deleting
        */
    }
  }

  handleChange() {
    this.setState({ isValid: true });
  }
    


    render(){      
    return(
        <Modal toggle={() => this.setModalOpen(!this.state.isOpen)} isOpen={this.state.isOpen}>
        <div className=" modal-header">
          <h2 className=" modal-title" id="exampleModalLabel">
            Nouvelle borne
          </h2>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => this.setModalOpen(!this.state.isOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <Form
            ref={c => {
              this.form = c;
            }}
            onSubmit={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)}
        >
        <ModalBody>
        <div className="form-group">
            <Row>
                <Col>
                <label htmlFor="Longitude">Longitude</label>
                <Input /* input (I) en majiscule utilise le composant importé depuis react-validation sinon input standard de react*/
                type="number"
                className="form-control"
                name = "Longitude"
                value={this.state.longitude}
                onChange={this.handleChangeLongitude}
                validations={[this.required]}
                />
                </Col>
                <Col>
                 <label htmlFor="Longitude">Latitude</label>
                <Input 
                type="number"
                className="form-control"
                name = "Latitude"
                value={this.state.latitude}
                onChange={this.handleChangeLatitude}
                validations={[this.required]}
                />
                </Col>
                </Row>
               </div>
               <div className="form-group">
                <label htmlFor="wilaya">Wilaya</label>
                <Input
                type="text"
                className="form-control"
                name = "wilaya"
                value={this.state.wilaya}
                onChange={this.handleChangeWilaya}
                validations={[this.required]}
                />
               </div>
               <div className="form-group">
                <label htmlFor="capacite"> Capacité </label>
                <Input
                type="number"
                className="form-control"
                name = "capacite"
                value={this.state.capacite}
                onChange={this.handleChangeCapacite}
                validations={[this.required,this.greaterThanOne]}
                />
               </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => this.setModalOpen(!this.state.isOpen)}
          >
            Annuler
          </Button>
          <Button 
          id="ajouterBorne"
          color="primary"
          type="submit"
          disabled={this.state.isValid ? "" : "disabled"}
          >
            Confirmer
          </Button>
        </ModalFooter>
        </Form>
      </Modal>
        
     )
    }
}
export default AddBorne; 