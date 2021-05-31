import MUIDataTable from "mui-datatables";
import {Row,Col } from "reactstrap";
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import React,{useEffect,useMemo,useState,useRef,useTable} from "react";
import  OperateurService from "../../services/OperateurService";

import {NavLink} from 'react-router-dom';
import AddModal from './AddOperateur';
import { withRouter } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
} from "reactstrap";
const ListOperateurs=() => {

  const [operateurs, setOperateurs] = useState([]);
  const OperateursRef = useRef();
  OperateursRef.current =operateurs;  
  const retrieveOperateurs = () => {
    OperateurService.getAll()
      .then((response) => {
        setOperateurs(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrieveOperateurs, []);
  let listeOperateurs =  operateurs.map(obj => Object.values(obj));
  const [idOperateur, setIdOperateur] = useState();
  const [rowIndex, setRowIndex] = useState();
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
      name: "id",
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
                    <NavLink to={"/operateurs/" + idOperateur} style={{color:'#FFCB00'}}>
                        Détails
                      </NavLink>
                    </DropdownItem>
                    
                    <DropdownItem onClick={() => { if (window.confirm('êtes-vous sûr de vouloir supprimer cet operateur de maintenanace?')) deleteOperateur( idOperateur)}}style={{color:"#F5365C"}}>
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
    elevation:0,
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    searchPlaceholder: 'Saisir un nom..',
    isRowSelectable:false,
    onRowClick: (rowData, rowState) => {
      setIdOperateur(rowData[0]);
      setRowIndex(rowState.rowIndex);
      console.log(rowData);
      console.log(idOperateur);
    },
   
    onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
    onChangePage: currentPage => console.log('currentPage: ', currentPage)

  };
  const deleteOperateur = (props) => {
        OperateurService.remove(idOperateur)
      .then((response) => {
      
        let newOperateurs = [...OperateursRef.current];
        newOperateurs.splice(rowIndex, 1);
        setOperateurs(newOperateurs);
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
               title="Liste des operateurs"
              data={listeOperateurs}
              columns={columns}
              options={options}
            />
          </>

    
      
   
  )
  
  }
  
  export default withRouter(ListOperateurs);