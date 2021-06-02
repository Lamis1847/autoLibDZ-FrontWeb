import React from 'react';
//import AbonnementService from '../../services/LocataireService';
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
import axios from 'axios';

class Recharge extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeCredit = this.onChangeCredit.bind(this);
    this.saveCredit = this.saveCredit.bind(this);
    this.newCredit = this.newCredit.bind(this);

    this.state = {
      Credit: '',
      submitted: false,
      exampleModal: false,
    };

    //const myServerBaseURL = 'https://autolib-dz.herokuapp.com';
    // const [balanceLocataire, setVehicule] = useState([]);

    // const loadVehicule = useCallback(async () => {
    //   const response = await axios.get(
    //     `${myServerBaseURL}/api/abonnement/${props.id}`
    //   );

    //   setVehicule(balanceLocataire);
    //   console.log(balanceLocataire);
    // }, []);

    // //Charger la liste des véhicules
    // useEffect(() => {
    //   loadVehicule();
    // }, [loadVehicule]);
  }
  componentWillReceiveProps(nextProps) {
    const id = nextProps.id;
    console.log('ID', id);
    //const id = this.props.id;
    axios
      .get(`https://autolib-dz.herokuapp.com/api/abonnement/${id}`)
      .then((response) => {
        this.setState({
          Credit: response.data.balance,
        });
      })
      .catch((err) => {
        this.setState({ Credit: 'Erreur' });
      });
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
      Credit: '',
    });
  };
  onChangeCredit(e) {
    this.setState({
      Credit: e.target.value,
    });
  }

  getCredit = () => {
    AbonnementService.get()
      .then((response) => {
        // setBalance(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //setBalance(data) {}

  saveCredit() {
    var data = {
      credit: this.state.Credit,
    };

    AbonnementService.recharger(this.props.id, data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          submitted: true,
        });
      })
      .catch((e) => {
        return (
          <Col>
            <Alert color='danger'>
              s'il vous plait vous devez saisir correctement toutes les
              informations avec un email non déja utilisé
            </Alert>
          </Col>
        );
      });
  }

  newCredit() {
    this.setState({
      Credit: '',
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
                        Solde
                      </CardTitle>
                      <span className='h2 font-weight-bold mb-0'>
                        {this.state.Credit}
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
}

export default Recharge;
