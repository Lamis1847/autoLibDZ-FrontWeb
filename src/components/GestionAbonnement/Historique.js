import MUIDataTable from 'mui-datatables';
import { Container, Row, Col } from 'reactstrap';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
  useRef,
  useTable,
  props,
} from 'react';

import { getToken } from '../../scripts/Network';

import AbonnementService from '../../services/AbonnementService';
import LocataireService from '../../services/LocataireService';
import AddModal from './RechargerAbonnement';
import Historique from './historiqueAbonnement';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Confirm = (props) => {
  var [locataires, setLocataires] = useState([]);

  const LocatairesRef = useRef();
  LocatairesRef.current = locataires;
  const retrieveLocataires = () => {
    var token = getToken();
    console.log(token);
    var data = {
      modePaiement: 'Rechargement',
    };
    axios
      .post(
        `https://autolib-dz.herokuapp.com/api/transaction/${props.id}/filter`,
        data,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLocataires(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrieveLocataires, [props.id]);

  let listeLocataires = locataires.map((obj) => Object.values(obj));
  console.log(listeLocataires);
  const [responsive, setResponsive] = useState('vertical');
  const [tableBodyHeight, setTableBodyHeight] = useState('400px');
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      id='simple-menu'
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const columns = [
    {
      name: 'idTransaction',
      label: 'idTransaction',
      options: {
        display: false,
      },
    },
    {
      name: 'dateTransaction',
      label: 'Date',
    },
    {
      name: 'montant',
      label: 'montant(DZD)',
    },
  ];

  const options = {
    filter: true,
    download: false,
    print: false,
    viewColumns: false,
    filterType: 'dropdown',
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    searchPlaceholder: 'Saisir un nom..',
    isRowSelectable: false,

    onColumnSortChange: (changedColumn, direction) =>
      console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log('numberOfRows: ', numberOfRows),
    onChangePage: (currentPage) => console.log('currentPage: ', currentPage),
  };

  return (
    <>
      <MUIDataTable
        title='Historique'
        data={listeLocataires}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default withRouter(Confirm);
