import React, { Component } from 'react';
import ModifBorne from './ModifBorne';
import VehiculesBorne from './VehiculesBorne';
import { Button, ModalBody, Modal, Container, Row, Col } from 'reactstrap';


class VisuAndModifBorne extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: this.props.shown
        }

        this.setModalOpen = this.setModalOpen.bind(this)
        this.receiveBorne = this.receiveBorne.bind(this)
    }

    setModalOpen(value, newBorne) {
        this.props.onHide(false, newBorne);
        this.setState({ isOpen: value })
    }

    receiveBorne(borne, changed = false) {
        this.props.onHide(changed, borne);
    }

    render() {
        return (
            <>
                <Modal size="lg" toggle={() => this.setModalOpen(!this.state.isOpen, this.props.borne)} isOpen={this.state.isOpen}>
                    <div className=" modal-header">
                        <h2 className=" modal-title" id="exampleModalLabel">
                            Visualisation d’une borne
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
                    <ModalBody>
                        <Container fluid={true}>
                            <Row>
                                <Col xs={12} md={4}>
                                    <ModifBorne borne={this.props.borne} receiveBorne={this.receiveBorne}></ModifBorne>
                                </Col>
                                <Col xs={12} md={8}>
                                    <VehiculesBorne borne={this.props.borne}></VehiculesBorne>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

export default VisuAndModifBorne;