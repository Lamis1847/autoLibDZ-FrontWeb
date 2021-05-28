import React, { useState, useEffect, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink } from 'react-router-dom'
import EtatVehiculeCol from './EtatVehiculeCol'
import MenuIcon from "@material-ui/icons/Menu";
import { Container } from "reactstrap";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

export const ListeVehicules = () => {

  //Relatif à l'API

  const myServerBaseURL = "https://autolib-dz.herokuapp.com";

  const [vehicules, setVehicules] = useState([]);

  const loadVehicules = useCallback(async () => {
    const response = await axios.get(`${myServerBaseURL}/api/vehicules`);
    const vehicules = response.data;
    setVehicules(vehicules);
  }, []);

  let listeVehicules = vehicules.map(obj => Object.values(obj));
  const [idVehicule, setIdVehicule] = useState();
  
  const preventDefault = event => event.preventDefault();

  //Charger la liste des véhicules
  useEffect(() => {
    loadVehicules();
  }, [loadVehicules]);

  //Lors de l'ajout d'un nouveau véhicule
  const onCreateNewVehicule = useCallback(
    async (newVehicule) => {
      try {
        await axios.post(`${myServerBaseURL}/vehicules`, {
          numChassis: newVehicule.numChassis,
          numImmatriculation: newVehicule.numImmatriculation,
          modele: newVehicule.modele,
          marque: newVehicule.marque,
          couleur: newVehicule.couleur,
          etat: newVehicule.etat,
          tempsDeRefroidissement: newVehicule.tempsDeRefroidissement,
          pressionHuileMoteur: newVehicule.pressionHuileMoteur,
          chargeBatterie: newVehicule.chargeBatterie,
          anomalieCircuit: newVehicule.anomalieCircuit,
          pressionPneus: newVehicule.pressionPneus,
          niveauMinimumHuile: newVehicule.niveauMinimumHuile,
          regulateurVitesse: newVehicule.regulateurVitesse,
          limiteurVitesse: newVehicule.limiteurVitesse,
          idAgentMaintenance: newVehicule.idAgentMaintenance,
          idBorne: newVehicule.idBorne,
        });
        loadVehicules();
      } catch (error) {
        if (error.response.status === 500) {
          alert("Erreur au niveau du serveur.");
        } else {
          alert("Unknown error.");
        }
      }
    },
    [loadVehicules]
  );

  // Relatif à la table

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
      name: "numChassis",
      label: "N° de chassis",
      options: {
        filter: false
      }
    },
    {
      name: "matricule",
      label: "Matricule"
    },
    {
      name: "modele",
      label: "Modèle"
    },
    {
      name: "marque",
      label: "Marque"
    },
    {
      name: "couleur",
      label: "Couleur"
    },
    
    {
      name: "etat",
      label: "Etat",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <EtatVehiculeCol
              value={value}
              index={tableMeta.columnIndex}
              change={event => updateValue(event)}
            />
          )
        }
      }
    },
    {
      options: {
        viewColumns: false,
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MenuIcon />
              </Button>
                <StyledMenu>
                  <MenuItem onClick={handleClose}>
                      <NavLink to={"/vehicules/" + idVehicule} variant="inherit" style={{fontFamily:'Nunito', color:'black'}}>
                        Détails
                      </NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                      <NavLink to="#" variant="inherit" style={{fontFamily:'Nunito', color:'black'}}>
                        Bloquer
                      </NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                      <NavLink to="#" variant="inherit" style={{fontFamily:'Nunito', color:'black'}}>
                        Historique
                      </NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                      <NavLink to="#" variant="inherit" style={{fontFamily:'Nunito', color:'#FFCB00'}}>
                        Modifier
                      </NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                      <NavLink to="#" variant="inherit" style={{fontFamily:'Nunito', color:'#F5365C'}}>
                        Supprimer
                      </NavLink>
                  </MenuItem>
                  </StyledMenu>              
              
                
            </div>
          );
        }
      }
    }
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
    searchPlaceholder: 'Saisir un nom ou un ID..',
    onRowClick: (rowData, rowState) => {
      setIdVehicule(rowData[0]);
      console.log(rowData);
      console.log(idVehicule);
    },
    onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
    onChangePage: currentPage => console.log('currentPage: ', currentPage)

  };
  
  return (
    <React.Fragment>
      <div className="main-content">
        <div className="mt-40">
          <Container fluid>
            <div style={{padding:"12px"}}>
              <h1>Liste des véhicules </h1>
            </div>
            <div className="shadow card">
              <MUIDataTable
                className="card-body"
                data={listeVehicules}
                columns={columns}
                options={options}
              />
            </div>
          </Container>
        </div>
      </div>
    </React.Fragment>
    
      
   
  )
}


export default ListeVehicules
