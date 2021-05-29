import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import historiqueVehicule from '../../mockdata/historiqueVehicule'
import EtatReservationCol from './EtatReservationCol'
// import '../App.css';
import axios from "axios";
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Container } from "reactstrap";

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref} to="/" {...props} />
  ));

//Add later to props { id = [], onCreateNewVehicule }
export const HistoriqueVehicule = (vehicule) => {
//   const myServerBaseURL = "http://localhost:3000";
//   const idVehicule = vehicule.id;

//   const [vehicule, setHistoriqueVehicule] = useState([]);

//   const loadHistoriqueVehicule = useCallback(async () => {
//     const response = await axios.get(`${myServerBaseURL}/vehicules/${idVehicule}`);
//     const vehicules = response.data;
//     setVehicules(vehicules);
//   }, []);

//   //Charger la liste des véhicules
//   useEffect(() => {
//     loadVehicules();
//   }, [loadVehicules]);

//   const onCreateNewVehicule = useCallback(
//     async (newVehicule) => {
//       try {
//         await axios.post(`${myServerBaseURL}/vehicules`, {
//           numChassis: newVehicule.numChassis,
//           numImmatriculation: newVehicule.numImmatriculation,
//           modele: newVehicule.modele,
//           couleur: newVehicule.couleur,
//           etat: newVehicule.etat,
//           tempsDeRefroidissement: newVehicule.tempsDeRefroidissement,
//           pressionHuileMoteur: newVehicule.pressionHuileMoteur,
//           chargeBatterie: newVehicule.chargeBatterie,
//           anomalieCircuit: newVehicule.anomalieCircuit,
//           pressionPneus: newVehicule.pressionPneus,
//           niveauMinimumHuile: newVehicule.niveauMinimumHuile,
//           regulateurVitesse: newVehicule.regulateurVitesse,
//           limiteurVitesse: newVehicule.limiteurVitesse,
//           idAgentMaintenance: newVehicule.idAgentMaintenance,
//           idBorne: newVehicule.idBorne,


//         });
//         loadVehicules();
//       } catch (error) {
//         if (error.response.status === 500) {
//           alert("Erreur au niveau du serveur.");
//         } else {
//           alert("Unknown error.");
//         }
//       }
//     },
//     [loadVehicules]
//   );

  const columns = [
    {
      name: "id",
      options: {
        filter: false
      }
    },
    {
      name: "locataire",
      label: "Locataire"
    },
    {
      name: "date_debut",
      label: "Date Début"
    },
    {
      name: "data_fin",
      label: "Date_Fin"
    },
    {
      name: "kms_parcourus",
      label: "KMs parcourus"
    },
    {
        name: "prix",
        label: "Prix(da)"
    },
    {
      name: "etat",
      label : "Etat",
      options: {
        filter: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <EtatReservationCol
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
            <Router>
            <div>
            <Button variant="contained" component={LinkBehavior}>
            Détails
            </Button>
            </div>
            </Router>
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
    searchPlaceholder: 'Saisir un nom ou in ID..',
    selectableRowsHeader: false,
    selectableRows:false,
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
              <h1>Historique des réservations </h1>
            </div>
            <MUIDataTable
              title={"Véhicule : 0002458"}
              data={historiqueVehicule}
              columns={columns}
              options={options}
            />
          </Container>
        </div>
      </div>
    </React.Fragment>
    
      
   
  )
}


export default HistoriqueVehicule
