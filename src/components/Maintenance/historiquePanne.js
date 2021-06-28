import MUIDataTable from "mui-datatables";
import { Container,Row,Col } from "reactstrap";
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import React,{useEffect,useMemo,useState,useRef,useTable} from "react";
import PanneService from "../../services/HistoriquePanne";

import {NavLink} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
} from "reactstrap";
const Confirm=() => {

  const [pannes, setPannes] = useState([]);
  const PannesRef = useRef();
  PannesRef.current = pannes;  
  const retrievePannes = () => {
    PanneService.getAll()
      .then((response) => {
        setPannes(response.data);
        console.log(pannes)
;      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(retrievePannes, []);
  let listePannes = pannes.map(obj => Object.values(obj));
  const [rowIndex, setRowIndex] = useState();
  const [rowData, setRowData] = useState();
 
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
      name: "description",
      label: "Description"
    },
    {
      name: "latitude",
      label: "Latitude"
    },
    {
      name: "longitude",
      label: "Longitude"
    },
    {
      name: "etat",
      label: "Etat",
      options:{
        customBodyRender: (props) => {
          return (
               props ? <h5 style={{color:'#2dce89'}}> Réglé </h5> : <h5 style={{color:'#f5365c'}}> Non reglé </h5>
          )
        }
      }
    },
    {
        name: "vehicule",
        label: "Vehicule"
      },
  ];
  
  const options = {
    selectableRows: 'none',
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
    textLabels: {
      body: {
        noMatch: "Désolé, Aucune donnée trouvée",
        toolTip: "Trier",
      },
      pagination: {
        next: "Page suivante",
        previous: "Page précédente",
        rowsPerPage: "Ligne par page:",
        displayRows: "/",
      },
    },
    onRowClick: (rowData, rowState) => {
      setRowIndex(rowState.rowIndex);
      setRowData(rowData);
      console.log(rowIndex);
    },
   
    onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
    onChangePage: currentPage => console.log('currentPage: ', currentPage)

  };
  
  
const refreshPage=() => {
  window.location.reload(false);
};
const showValidModel =(idLocateur) =>{
  console.clear();
  console.log("id =>" ,idLocateur);
  
}

  return (
    <div className="main-content">
    <Container className="mt-5 pb-5" fluid>
            <MUIDataTable
               title="Historique des pannes"
              data={listePannes}
              columns={columns}
              options={options}
            />
    </Container>
</div>   
  )
  
  }
  
  export default withRouter(Confirm);
