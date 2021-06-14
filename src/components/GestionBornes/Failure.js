import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter} from "reactstrap";

class Failure extends Component{
    constructor(props){
        super(props)
            this.state = {
                isOpen: this.props.shown,
                         }
    }
    setModalOpen(value){
        this.setState({isOpen:value})
    }


    render(){  
    return(
        <Modal toggle={() => this.setModalOpen(!this.state.isOpen)} isOpen={this.state.isOpen}>
        <div className=" modal-header">
          <h2 className=" modal-title" id="exampleModalLabel">
            Resultat
          </h2>
          </div>
        <ModalBody>
        L'opération a échouée !
        </ModalBody>
        <ModalFooter>
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
export default Failure; 