import MUIDataTable from "mui-datatables";
import {Row,Col } from "reactstrap";
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import React,{useEffect,useMemo,useState,useRef,useTable} from "react";
import  AdministrateurService from "../../services/AdministrateurService";

import {NavLink} from 'react-router-dom';
import AddModal from './AddAdmin';
import { withRouter } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
} from "reactstrap";
const ListAdmin=() => {

  const [administrateurs, setAdministrateurs] = useState([]);
  const AdministrateursRef = useRef();
  AdministrateursRef.current =administrateurs;  
  const retrieveAdministrateurs = () => {
    AdministrateurService.getAll()
      .then((response) => {
        setAdministrateurs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrieveAdministrateurs, []);
  let listeAdministrateurs =  administrateurs.map(obj => Object.values(obj));
  const [idAdministrateur, setIdAdministrateur] = useState();
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
      name: "idAdministrateur",
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
        name: "salaire",
        label: "Salaire"
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
                    <NavLink to={"/administrateurs/" + idAdministrateur} style={{color:'#FFCB00'}}>
                        Détails
                      </NavLink>
                    </DropdownItem>
                    
                    <DropdownItem onClick={() => { if (window.confirm('êtes-vous sûr de vouloir supprimer cet administrataire?')) deleteAdministrateur( idAdministrateur)}}style={{color:"#F5365C"}}>
                      Supprimer
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
      setIdAdministrateur(rowData[0]);
      console.log(rowData);
      console.log(idAdministrateur);
    },
   
    onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
    onChangePage: currentPage => console.log('currentPage: ', currentPage)

  };
  const deleteAdministrateur = (props) => {
        AdministrateurService.remove(idAdministrateur)
      .then((response) => {
      
        let newAdministrateurs = [...AdministrateursRef.current];
        newAdministrateurs.splice(idAdministrateur, 1);
        setAdministrateurs(newAdministrateurs);
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
               title="Liste des Administrateurs"
              data={listeAdministrateurs}
              columns={columns}
              options={options}
            />
          </>

    
      
   
  )
  
  }
  
  export default withRouter(ListAdmin);