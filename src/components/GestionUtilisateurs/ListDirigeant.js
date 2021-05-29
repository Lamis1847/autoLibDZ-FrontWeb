import MUIDataTable from "mui-datatables";
import {Row,Col } from "reactstrap";
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import React,{useEffect,useMemo,useState,useRef,useTable} from "react";
import DirigeantService from "../../services/DirigeantService";

import {NavLink} from 'react-router-dom';
import AddModal from './AddAdmin';
import { withRouter } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
} from "reactstrap";
const ListDirigeants=() => {

  const [dirigeants, setDirigeants] = useState([]);
  const DirigeantsRef = useRef();
  DirigeantsRef.current =dirigeants;  
  const retrieveDirigeants = () => {
    DirigeantService.getAll()
      .then((response) => {
        setDirigeants(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrieveDirigeants, []);
  let listeDirigeants =  dirigeants.map(obj => Object.values(obj));
  const [idDirigeant, setIdDirigeant] = useState();
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
                    <NavLink to={"/dirigeants/" + idDirigeant} style={{color:'#FFCB00'}}>
                        Détails
                      </NavLink>
                    </DropdownItem>
                    
                    <DropdownItem onClick={() => { if (window.confirm('êtes-vous sûr de vouloir supprimer cet dirigeant de maintenanace?')) deleteDirigeant( idDirigeant)}}style={{color:"#F5365C"}}>
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
      setIdDirigeant(rowData[0]);
      console.log(rowData);
      console.log(idDirigeant);
    },
   
    onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
    onChangePage: currentPage => console.log('currentPage: ', currentPage)

  };
  const deleteDirigeant = (props) => {
        DirigeantService.remove(idDirigeant)
      .then((response) => {
      
        let newDirigeants = [...DirigeantsRef.current];
        newDirigeants.splice(idDirigeant, 1);
        setDirigeants(newDirigeants);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  
  return (
          <>

            
            <MUIDataTable
               title="Liste des dirigeants"
              data={listeDirigeants}
              columns={columns}
              options={options}
            />
          </>

    
      
   
  )
  
  }
  
  export default withRouter(ListDirigeants);