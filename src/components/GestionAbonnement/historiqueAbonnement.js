import React from 'react';
//import AbonnementService from '../../services/LocataireService';
import AbonnementService from '../../services/AbonnementService';
import http from '../../scripts/Network';
import MUIDataTable from 'mui-datatables';
import { Container, Row, Col } from 'reactstrap';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Historique from './Historique';
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
  Spinner,
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
  useTable,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import axios from 'axios';

class Recharge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Credit: '',
      id: '',
      exampleModal: false,
      showHideSpinner: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      Credit: '',
      id: nextProps.id,
      showHideSpinner: true,
    });
    const id = nextProps.id;
    console.log('ID', id);
    //const id = this.props.id;
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

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
          <u>Historique {'>'}</u>
        </Button>
        <Modal
          backdrop='static'
          keyboard={false}
          className='modal-dialog-centered'
          isOpen={this.state.exampleModal}
          toggle={() => this.toggleModal('exampleModal')}
        >
          <div className='submit-form'>
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
                      Historique
                    </CardTitle>
                  </div>
                  <Historique id={this.state.id}></Historique>
                </CardBody>
              </Card>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default Recharge;
