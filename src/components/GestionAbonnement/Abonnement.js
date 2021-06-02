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

import AbonnementService from '../../services/AbonnementService';
import LocataireService from '../../services/LocataireService';
//import AbonnementService from '../../services/AbonnementService';
import AddModal from './RechargerAbonnement';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

// import http from '../../scripts/Network';

// const get = (id) => {
//   return http.get(`/abonnement/${id}`);
// };

const Confirm = () => {
  const [locataires, setLocataires] = useState([]);
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
  let listeLocataires = locataires.map((obj) => Object.values(obj));
  const [idLocataire, setIdLocataire] = useState();
  // const [balanceLocataire, setBalanceLocataire] = useState();
  const [responsive, setResponsive] = useState('vertical');
  const [tableBodyHeight, setTableBodyHeight] = useState('400px');
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const retrieveBalance = () => {
  //   get()
  //     .then((response) => {
  //       console.log(response.data);
  //       setBalanceLocataire(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setBalanceLocataire('Bla');
  //     });
  // };
  // useEffect(retrieveBalance, []);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

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
      // console.log(rowData);
      // console.log(idLocataire);
    },

    onColumnSortChange: (changedColumn, direction) =>
      console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: (numberOfRows) =>
      console.log('numberOfRows: ', numberOfRows),
    onChangePage: (currentPage) => console.log('currentPage: ', currentPage),
  };
  const deleteLocataire = (props) => {
    LocataireService.remove(idLocataire)
      .then((response) => {
        let newLocataires = [...LocatairesRef.current];
        newLocataires.splice(idLocataire, 1);
        setLocataires(newLocataires);
      })
      .catch((e) => {
        console.log(e);
      });
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
