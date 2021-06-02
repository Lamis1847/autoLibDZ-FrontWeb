import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AbonnementService from '../../services/AbonnementService';
import http from '../../scripts/Network';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  Alert,
  Col,
  Row,
} from 'reactstrap';

function refreshPage() {
  window.location.reload(false);
}
function toggleModal(state) {
  this.setState({
    [state]: !this.state[state],
  });
}
function Recharge() {
  const [post, setPosts] = useState([]);
  const myServerBaseURL = 'https://autolib-dz.herokuapp.com';
  useEffect(() => {
    axios
      .get(`${myServerBaseURL}/api/abonnement/${props.id}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Button
        color='gray'
        type='button'
        size='sm'
        onClick={() => this.toggleModal('exampleModal')}
      >
        <u>Abonnement {'>'}</u>
      </Button>
      <Modal
        backdrop='static'
        keyboard={false}
        className='modal-dialog-centered'
        isOpen={this.state.exampleModal}
        toggle={() => this.toggleModal('exampleModal')}
      >
        <div className='submit-form'>
          {this.state.submitted ? (
            <>
              <Row>
                <Col>
                  <Alert color='success'>
                    <strong>Susccés!</strong> ! vous avez recharger la balance
                    de locataire avec succées
                  </Alert>
                </Col>
              </Row>
              <Row>
                <Col style={{ margin: '2%' }}>
                  <Button
                    color='secondary'
                    size='sm'
                    type='button'
                    onClick={this.refreshPage}
                  >
                    Retour
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <div className='modal-body p-0'>
              <Card className='bg-secondary shadow border-0'>
                <button
                  style={{ margin: '3%' }}
                  aria-label='Close'
                  className='close'
                  data-dismiss='modal'
                  type='button'
                  onClick={() => this.toggleModal('exampleModal')}
                >
                  <span aria-hidden={true}>×</span>
                </button>
                <CardBody className='px-lg-5 py-lg-5'>
                  <div className='col'>
                    <CardTitle className='text-uppercase text-muted mb-0 text-center'>
                      Solde
                    </CardTitle>
                    <span className='h2 font-weight-bold mb-0'>
                      {'balanceLocataire.balance'}
                    </span>
                  </div>
                  <p className='mt-3 mb-0 text-muted text-sm'>
                    <span className='text-nowrap text-center'>Recharger</span>
                  </p>
                  <Form role='form'>
                    <Row>
                      <FormGroup>
                        <Col>
                          <InputGroup className='input-group-alternative'>
                            <Input
                              type='text'
                              className='form-control'
                              id='nom'
                              required
                              value={this.state.nom}
                              onChange={this.onChangeCredit}
                              name='nom'
                              placeholder='Montant'
                            />
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <Col>
                        <Button
                          className='text-center'
                          color='default'
                          type='button'
                          onClick={this.saveLocataire}
                        >
                          Confirmer
                        </Button>
                      </Col>
                    </Row>
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
export default Recharge;
