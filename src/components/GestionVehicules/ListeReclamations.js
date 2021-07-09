import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import EtatReservationCol from './EtatReservationCol'
import axios from "axios";
import { Container } from "reactstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
import {getToken} from '../../scripts/Network.js'
import TypeReclamation from "./TypeReclamation";

export const ListeReclamations = () => {
  const myServerBaseURL = "https://autolib-dz.herokuapp.com";

  const [loading, setLoading] = useState(null);
  const [reclamations, setReclamations] = useState([]) 
  const loadReclamations = useCallback(async () => {
    setLoading(true)
    const response = await axios.get(`${myServerBaseURL}/api/reclamation`, { headers : { authorization : `Basic ${getToken()}`}});
    var data = response.data;
    console.log(data) 
    data = data.map(reclamation => ({
      ...reclamation, 
      date: reclamation.date ? new Date(reclamation.date).getUTCDate() + "/" + (new Date(reclamation.date).getUTCMonth()+1) + "/" + new Date(reclamation.date).getUTCFullYear() : "-", 
    }))
    setReclamations(data.map(obj => {
        return [obj.idReclamation,
                (obj.nomLocataire + " " + obj.prenomlocataire),
                obj.date,
                obj.description,
                obj.type]
      }))
    setLoading(false)
    }, [reclamations]);

  useEffect(() => {
    loadReclamations();
  }, [loadReclamations]);
  
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false
      }
    },
    {
      name: "nomLocataire",
      label: "Locataire"
    },
    {
      name: "date",
      label: "Date"
    },
    {
        name: "description",
        label: "Description"
    },
    {
        name: "type",
        label: "Type",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <TypeReclamation
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
    selectableRowsHeader: true,
    selectableRows:true,
    textLabels: {
        body: {
          noMatch: loading ?
          <CircularProgress /> :
          'Aucune donnée trouvée',
          toolTip: "Trier",
        },
        pagination: {
          next: "Page suivante",
          previous: "Page précédente",
          rowsPerPage: "Ligne par page:",
          displayRows: "/",
        },
        selectedRows: {
          text: "ligne(s) sélectionné(s)",
          delete: "Supprimer",
          deleteAria: "Supprimer les lignes choisies",
        },
    },
    onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
    onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
    onChangePage: currentPage => console.log('currentPage: ', currentPage),

  };
  
  return (
    <React.Fragment>
      <div className="main-content">
        <div className="mt-40">
          <Container fluid>
            <div style={{padding:"12px"}}>
              <h1>Liste des réclamations</h1>
            </div>
            
            <MUIDataTable
              data={reclamations}
              columns={columns}
              options={options}
            />
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}
