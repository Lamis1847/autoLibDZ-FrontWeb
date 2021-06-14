import React from 'react';
//import AbonnementService from '../../services/LocataireService';
import AbonnementService from '../../services/AbonnementService';
import http from '../../scripts/Network';

import MUIDataTable from 'mui-datatables';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
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
  Spinner,
} from 'reactstrap';
import axios from 'axios';

class Recharge extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeCredit = this.onChangeCredit.bind(this);
    this.saveCredit = this.saveCredit.bind(this);
    this.newCredit = this.newCredit.bind(this);

    this.state = {
      Credit: '',
      newCredit: '',
      submitted: false,
      exampleModal: false,
      showHideSpinner: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Credit: '',
      showHideSpinner: true,
    });
    const id = nextProps.id;
    console.log('ID', id);
    //const id = this.props.id;
    axios
      .get(`https://autolib-dz.herokuapp.com/api/abonnement/${id}`)
      .then((response) => {
        this.setState({
          showHideSpinner: false,
          Credit: response.data.balance,
        });
      })
      .catch((err) => {
        this.setState({ showHideSpinner: false, Credit: 'Erreur' });
      });
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
      newCredit: '',
    });
  };
  onChangeCredit(e) {
    this.setState({
      newCredit: e.target.value,
    });
  }

  saveCredit() {
    var n = Number(this.state.newCredit);
    var data = {
      id: this.props.id,
      value: n,
    };

    axios
      .post(
        `https://autolib-dz.herokuapp.com/api/abonnement/rechargez-carte-abonnement/${this.props.id}`,
        data
      )
      .then((response) => {
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        return (
          <Col>
            <Alert color='danger'>
              Erreur, veuillez réessayer le rechargement de la balance
            </Alert>
          </Col>
        );
      });
  }

  newCredit() {
    this.setState({
      Credit: '',
      newCredit: '',
      submitted: false,
    });
  }
  refreshPage() {
    window.location.reload(false);
  }
  render() {
    return (
      <>
        <Button
          color='gray'
          type='button'
          size='sm'
          onClick={() => {
            this.toggleModal('exampleModal');
          }}
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
                        Solde (DZD)
                      </CardTitle>

                      <span
                        className='h2 font-weight-bold mb-0 text-center'
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {this.state.showHideSpinner && (
                          <Spinner color='primary' />
                        )}
                        <br /> <br /> {this.state.Credit}
                      </span>
                      <p className='mt-3 mb-0 text-muted text-sm'>
                        <span
                          className='text-nowrap text-center'
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <br /> Recharger &nbsp; &nbsp; <br />{' '}
                        </span>
                      </p>
                    </div>

                    <Form
                      role='form'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: '3%',
                      }}
                    >
                      <Row>
                        <FormGroup>
                          <Col>
                            <InputGroup className='input-group-alternative'>
                              <Input
                                type='text'
                                className='form-control'
                                id='newCredit'
                                required
                                value={this.state.newCredit}
                                onChange={this.onChangeCredit}
                                name='newCredit'
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
                            onClick={this.saveCredit}
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
}

export default Recharge;
