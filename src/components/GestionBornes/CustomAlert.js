import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter} from "reactstrap";

class CustomAlert extends Component{
    constructor(props){
        super(props)
            this.state = {
                isOpen: this.props.shown,
                         }
    }
    setModalOpen(value,result){
        this.props.onHide(result);
        this.setState({isOpen:value})
    }


    render(){  
    return(
        <Modal toggle={() => this.setModalOpen(!this.state.isOpen)} isOpen={this.state.isOpen}>
        <div className=" modal-header">
          <h2 className=" modal-title" id="exampleModalLabel">
            Opération irréversible
          </h2>
          </div>
        <ModalBody>
        Attention ! vous vous apprétez à effectuer une opération irréversible. Assurez-vous de cette étape avant de continuer 
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => this.setModalOpen(false,false)}
          >
            Annuler
          </Button>
          <Button 
          color="danger"
          onClick={() => this.setModalOpen(false,true)}
            >
            Confirmer
          </Button>
        </ModalFooter>
      </Modal>
        
     )
    }
}
export default CustomAlert; 