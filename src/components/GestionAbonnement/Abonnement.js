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
} from 'react';
import http from '../../scripts/Network';
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

const Confirm = () => {
  var [locataires, setLocataires] = useState([]);

  const LocatairesRef = useRef();
  LocatairesRef.current = locataires;
  const retrieveLocataires = () => {
    LocataireService.getAll()
      .then((response) => {
        setLocataires(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrieveLocataires, []);
  locataires = locataires.filter(function (e) {
    return (e.Active = true);
  });
  let listeLocataires = locataires.map((obj) => Object.values(obj));

  const [idLocataire, setIdLocataire] = useState();
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
      name: 'idLocataire',
      label: 'id',
      options: {
        filter: false,
      },
    },
    {
      name: 'nom',
      label: 'Nom',
    },
    {
      name: 'prenom',
      label: 'Prénom',
    },
    {
      name: 'email',
      label: 'Email',
    },
    {
      name: 'motdepasse',
      label: 'Mot de passe',
      options: {
        display: false,
        filter: false,
        customBodyRender: (props) => {
          return props ? '*******' : '*******';
        },
      },
    },
    {
      name: 'Active',
      label: 'Status',
      options: {
        customBodyRender: (props) => {
          return props ? (
            <h5 style={{ color: '#2dce89' }}>Actif</h5>
          ) : (
            <h5 style={{ color: '#f5365c' }}>Bloqué</h5>
          );
        },
      },
    },
    {
      label: 'Action',
      options: {
        display: false,
        filter: false,
        customBodyRender: (props) => {
          return props ? '*******' : '*******';
        },
      },
    },
    {
      name: 'Abonnement',
      label: 'Abonnement',
      options: {
        customBodyRender: (props) => {
          return props ? (
            <AddModal id={idLocataire}></AddModal>
          ) : (
            <AddModal id={idLocataire}></AddModal>
          );
        },
      },
    },
    {
      label: 'Hystoriques abonnement',
      options: {
        customBodyRender: (props) => {
          return props ? (
            <Historique id={idLocataire}></Historique>
          ) : (
            <Historique id={idLocataire}></Historique>
          );
        },
      },
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
    onRowClick: (rowData, rowState) => {
      setIdLocataire(rowData[0]);
    },

    onColumnSortChange: (changedColumn, direction) =>
      console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log('numberOfRows: ', numberOfRows),
    onChangePage: (currentPage) => console.log('currentPage: ', currentPage),
  };

  return (
    <>
      <MUIDataTable
        title='Liste des locataires'
        data={listeLocataires}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default withRouter(Confirm);
