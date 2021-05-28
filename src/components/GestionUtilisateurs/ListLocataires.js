
import MUIDataTable from "mui-datatables";
import { Container,Row,Col } from "reactstrap";
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import React,{useEffect,useMemo,useState,useRef,useTable} from "react";
import LocataireService from "../../services/LocataireService";

import {NavLink} from 'react-router-dom';
import AddModal from './AddLocataire';
import { withRouter } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
} from "reactstrap";
const Confirm=() => {

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
  let listeLocataires = locataires.map(obj => Object.values(obj));
  const [idLocataire, setIdLocataire] = useState();
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5"
    }
  })((props) => (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
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
      name: "idLocataire",
      label: "id",
      options: {
        filter: false
        
      }
    },
    
    {
      name: "nom",
      label: "Nom"
    },
    {
      name: "prenom",
      label: "Prénom"
    },
    {
      name: "email",
      label: "Email"
    },
    {
      name: "motdepasse",
      label: "Mot de passe",
      options: {
        display: false,
        filter:false,
          customBodyRender: (props) => {
            return (
                 props? "*******" : "*******"
            )
            }
      
      }
    },
    {
      name: "Active",
      label: "Status",
      options:{
        customBodyRender: (props) => {
          return (
               props? <h5 style={{color:'#2dce89'}}>Actif</h5> : <h5 style={{color:'#f5365c'}}>Bloqué</h5>
          )
        }
      }
     
    },
    { 
    label: "Action",
     options: {
        customBodyRender: () => {
          return (
            <>
            <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={e => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem>
                    <NavLink to={"/locataires/" + idLocataire} style={{color:'#FFCB00'}}>
                        Détails
                      </NavLink>
                    </DropdownItem>
                    
                    <DropdownItem onClick={() => { if (window.confirm('êtes-vous sûr de vouloir supprimer cet locataire?')) deleteLocataire( idLocataire)}}style={{color:"#F5365C"}}>
                      Supprimer
                    </DropdownItem>
                    <DropdownItem>
                      Valider 
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
            </>
          )
        }
      }
    },
  ];
  
  const options = {
    filter: true,
    download:false,
    print:false,
    viewColumns:false,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    searchPlaceholder: 'Saisir un nom..',
    isRowSelectable:false,
    onRowClick: (rowData, rowState) => {
      setIdLocataire(rowData[0]);
      console.log(rowData);
      console.log(idLocataire);
    },
   
    onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
    onChangePage: currentPage => console.log('currentPage: ', currentPage)

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
            <Row>
                <Col>
               
                <div style={{paddingBottom:"6px"}}>
                <AddModal></AddModal>
                </div>
              
                </Col>

            </Row>
            
            <MUIDataTable
               title="Liste des locataires"
              data={listeLocataires}
              columns={columns}
              options={options}
            />
          </>

    
      
   
  )
  
  }
  
  export default withRouter(Confirm);