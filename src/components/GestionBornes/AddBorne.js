import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter, Row,Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Alert} from "reactstrap";
import { Select } from '@material-ui/core';

const API_All_WILAYAS= process.env.REACT_APP_ALGERIA_CITIES_URL;
const API_ADD_BORNE= process.env.REACT_APP_GESTION_BORNES_URL;
class AddBorne extends Component{
    constructor(props){
        super(props)
        this.setModalOpen = this.setModalOpen.bind(this);
        this.handleChangeLongitude = this.handleChangeLongitude.bind(this);
        this.handleChangeLatitude = this.handleChangeLatitude.bind(this); 
        this.handleChangeCapacite = this.handleChangeCapacite.bind(this);
        this.handleChangeNomBorne =  this.handleChangeNomBorne.bind(this);
        this.handleChangeNom = this.handleChangeNom.bind(this);
        this.required = this.required.bind(this);
        this.greaterThanOne = this.greaterThanOne.bind(this);
        this.toggleDrop =this.toggleDrop.bind(this);
        this.toggleDrop2=this.toggleDrop2.bind(this);
        this.createSelectItems =this.createSelectItems.bind(this);
        this.createCommunes =this.createCommunes.bind(this);
        this.onDropdownSelected  =this.onDropdownSelected.bind(this);
        this.onCommuneSelected =this.onCommuneSelected.bind(this);
            this.state = {
                isOpen: this.props.shown,
                longitude: 0,
                latitude: 0,
                nomBorne:'',
                wilaya: '',
                commune: '',
                nom: '',
                capacite: 1,
                isValid: false,
                dropOpen: false,
                dropOpen2: false,
                wilayas: [],
                communes: [],
                wilayaSelected:false,
                showAlertcw:false,
         }
    }
    componentDidMount(){   
      axios.get(API_All_WILAYAS)
      .then((res) => {
         this.setState({wilayas:res.data});
      })
      .catch(err => {
        if (err.response) {
          window.alert(err.response.data)
        } else if (err.request) {
          // client never received a response, or request never left
          window.alert("Pas de réponse ou requête non envoyée ! liste de wilayas n'est pas récupérée !")
        } else {
          window.alert("une erreur est survenue ! liste de wilayas n'est pas récupérée ")
        }}
        )
      }
    setModalOpen(value,isSuccess,newBorne){
        this.props.onHide(isSuccess,newBorne);
        this.setState({isOpen:value})
    }
    toggleDrop(value){
      this.setState({dropOpen:value})
    }
    toggleDrop2(value){
      this.setState({dropOpen2:value})
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
    handleChangeNomBorne(e){
        this.setState(
            {
                nomBorne: e.target.value,
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
        if(this.state.commune=='' || this.state.wilaya==''){
          this.setState({isValid:false,showAlertcw:true})
        }
        else{ 
         let newBorne = {
            nomBorne: this.state.nomBorne,
            wilaya: this.state.wilaya,
            commune: this.state.commune,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            nbVehicules: "0",
            nbPlaces: this.state.capacite,
          }
          console.log(newBorne)
          axios.post(API_ADD_BORNE,newBorne)
          .then((res) => {
            this.setModalOpen(false,true,res.data)
          })
          .catch(err => {
            if (err.response) {
              console.log(err.response.data)
            } else if (err.request) {
              // client never received a response, or request never left
              window.alert("Pas de réponse ou requête non envoyée ! Borne non ajoutée !")
            } else {
              window.alert("une erreur est survenue ! Borne non ajoutée ")
            }}
            )      
        }

        //TODO: 
        /*
        -create alerts for error cases
        */
    }
  }

  handleChange() {
    this.setState({ isValid: true });
  }

  createSelectItems() {
    let items = [];       
    if(!this.state.wilayas.length==0)  {
    for (let i = 0; i < this.state.wilayas.length; i++) {  
         items.push(<DropdownItem key={i} value={i} onClick={e => this.onDropdownSelected(e)}>{this.state.wilayas[i].wilaya}</DropdownItem>);   
    }}
    return items;
}  

createCommunes(){
  let items = [];       
    if(!this.state.communes.length==0)  {
    for (let i = 0; i < this.state.communes.length; i++) {  
         items.push(<DropdownItem key={i} value={i} onClick={e => this.onCommuneSelected(e)}>{this.state.communes[i].commune}</DropdownItem>);   
    }}
    return items;
}

    onDropdownSelected(e) {
      let wilaya = this.state.wilayas[e.target.value].wilaya
      if(wilaya!=this.state.wilaya){
        this.setState({wilaya:wilaya,commune:''})
      axios.get(API_All_WILAYAS+wilaya+"/commune")
      .then((res) => {
         this.setState({communes:res.data,wilayaSelected:true});
      })
      .catch(err => {
        if (err.response) {
          window.alert(err.response.data)
        } else if (err.request) {
          // client never received a response, or request never left
          window.alert("Pas de réponse ou requête non envoyée ! liste de communes n'est pas récupérée !")
        } else {
          window.alert("une erreur est survenue ! liste de communes n'est pas récupérée ")
        }}
        )    
    }
    }
     onCommuneSelected(e){
      let commune = this.state.communes[e.target.value].commune
      this.setState({commune:commune})
      if(this.state.showAlertcw){
        this.setState({showAlertcw:false})
        this.handleChange();
      }
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
        <label htmlFor="NomBorne">Nom </label>
                <Input /* input (I) en majiscule utilise le composant importé depuis react-validation sinon input standard de react*/
                type="text"
                className="form-control"
                name = "NomBorne"
                value={this.state.nomBorne}
                onChange={this.handleChangeNomBorne}
                validations={[this.required]}
                />
        </div>
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
                    <Row>
                      <Col>
              <Dropdown className="largeDrop mt-3" isOpen={this.state.dropOpen} toggle={() => {this.toggleDrop(!this.state.dropOpen)}}>
                        {(this.state.wilaya=='')?
                        <DropdownToggle id="wilaya" className="largeDrop" caret color="secondary">
                          Wilaya
                        </DropdownToggle>
                        :
                        <DropdownToggle id="wilaya" className="largeDrop" caret color="secondary">
                           {this.state.wilaya}
                        </DropdownToggle>
                       }
                        <DropdownMenu className="largeDrop">
                          {this.createSelectItems()}
                         </DropdownMenu>
                           
              </Dropdown>   
              </Col>
              <Col>
              <Dropdown className="largeDrop mt-3" isOpen={this.state.dropOpen2} toggle={() => {this.toggleDrop2(!this.state.dropOpen2)}} disabled={!this.state.wilayaSelected}>
                        {(this.state.commune=='')?
                        <DropdownToggle id="commune" className="largeDrop" caret color="secondary">
                          Commune
                        </DropdownToggle>
                        :
                        <DropdownToggle id="commune" className="largeDrop" caret color="secondary">
                           {this.state.commune}
                        </DropdownToggle>
                       }
                        <DropdownMenu className="largeDrop">
                          {this.createCommunes()}
                         </DropdownMenu>
                           
              </Dropdown>  
              </Col>  
              </Row>     
              <Row>{
                    (this.state.showAlertcw)?
                <Alert className="mt-3 center" color="danger">
                  This is a danger alert — check it out!
                </Alert>:<></>
                }
                </Row>
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
          disabled={this.state.isValid ? false : true}
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