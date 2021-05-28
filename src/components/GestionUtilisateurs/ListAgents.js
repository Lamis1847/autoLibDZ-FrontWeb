import MUIDataTable from "mui-datatables";
import {Row,Col } from "reactstrap";
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import React,{useEffect,useMemo,useState,useRef,useTable} from "react";
import  AgentService from "../../services/AgentService";

import {NavLink} from 'react-router-dom';
import AddModal from './AddAdmin';
import { withRouter } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
} from "reactstrap";
const ListAgents=() => {

  const [agents, setAgents] = useState([]);
  const AgentsRef = useRef();
  AgentsRef.current =agents;  
  const retrieveAgents = () => {
    AgentService.getAll()
      .then((response) => {
        setAgents(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrieveAgents, []);
  let listeAgents =  agents.map(obj => Object.values(obj));
  const [idAgent, setIdAgent] = useState();
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
                    <NavLink to={"/agents/" + idAgent} style={{color:'#FFCB00'}}>
                        Détails
                      </NavLink>
                    </DropdownItem>
                    
                    <DropdownItem onClick={() => { if (window.confirm('êtes-vous sûr de vouloir supprimer cet agent de maintenanace?')) deleteAgent( idAgent)}}style={{color:"#F5365C"}}>
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
      setIdAgent(rowData[0]);
      console.log(rowData);
      console.log(idAgent);
    },
   
    onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
    onChangePage: currentPage => console.log('currentPage: ', currentPage)

  };
  const deleteAgent = (props) => {
        AgentService.remove(idAgent)
      .then((response) => {
      
        let newAgents = [...AgentsRef.current];
        newAgents.splice(idAgent, 1);
        setAgents(newAgents);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  
  return (
          <>
            
            <MUIDataTable
               title="Liste des agents de maintenance"
              data={listeAgents}
              columns={columns}
              options={options}
            />
          </>

    
      
   
  )
  
  }
  
  export default withRouter(ListAgents);