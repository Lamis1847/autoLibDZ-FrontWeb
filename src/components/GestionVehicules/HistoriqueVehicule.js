import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import EtatReservationCol from './EtatReservationCol'
import axios from "axios";
import Button from '@material-ui/core/Button';
import { Container } from "reactstrap";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LabelIcon from '@material-ui/icons/Label';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TodayIcon from '@material-ui/icons/Today';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { useParams } from 'react-router';
import {getToken} from '../../scripts/Network.js'

export const HistoriqueVehicule = () => {

  let idVehicule = window.location.pathname.split("/")[3]

  const myServerBaseURL = "https://autolib-dz.herokuapp.com";

  const [historique, setHistorique] = useState([]) 
  const [loading, setLoading] = useState(null);
  const [historiqueList, setHistoriqueList] = useState([]) 
  const loadHistorique = useCallback(async () => {
    setLoading(true)
    const response = await axios.get(`${myServerBaseURL}/api/vehicules/historique-reservation/${idVehicule}`, { headers : { authorization : `Basic ${getToken()}`}});
    var data = response.data;
    console.log(data) 
    data = data.map(reservation => ({
      ...reservation, 
      dateDebut: reservation.dateDebut ? new Date(reservation.dateDebut).getUTCFullYear() + "/" + (new Date(reservation.dateDebut).getUTCMonth()+1) + "/" + new Date(reservation.dateDebut).getUTCDate() : "-", 
      dateFin : reservation.dateFin ? new Date(reservation.dateFin).getUTCFullYear() + "/" + (new Date(reservation.dateFin).getUTCMonth()+1) + "/" + new Date(reservation.dateFin).getUTCDate() : "-"
    }))
    setHistorique(data)
    setHistoriqueList(historique.map(obj => {
      return [obj.idReservation,
              (obj.nomLocataire + " " + obj.prenomLocataire),
              obj.dateDebut,
              obj.dateFin,
              obj.nomBorneDepart,
              obj.nomBorneDestination,
              obj.etatReservation,
              obj.etatReservation == "Terminée" ? obj.nbKm : obj.nbKmEstime,
              obj.etatReservation == "Terminée" ?  obj.tempsEstime : obj.tempsReel,
              obj.etatReservation == "Terminée" ? obj.prixAPayer : obj.prixEstime]
    }))
    setLoading(null)
  }, [historiqueList]);

  useEffect(() => {
    loadHistorique();
  }, [loadHistorique]);
  
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
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      name: "id",
      options: {
        filter: false
      }
    },
    {
      name: "nomLocataire",
      label: "Locataire"
    },
    {
      name: "dateDebut",
      label: "Date Début"
    },
    {
      name: "dateFin",
      label: "Date Fin"
    },
    {
      name: "nomBorneDepart",
      label: "Borne Depart"
    },
    {
        name: "nomBorneDestination",
        label: "Borne Destination"
    },
    {
      name: "etatReservation",
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
            <div>
            <Button variant="contained" onClick={handleOpen}>
            Détails
            </Button>
            </div>
          );
        }
      }
    }
  ];
  const [selectedReservation, setSelectedReservation] = useState({})

  const detailsRes = (
    
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth='true' maxWidth='sm'>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}> 
              Détails de la réservation : {selectedReservation ? selectedReservation.idReservation : "-"}
            </DialogTitle>
            <div className="flex-item" style={{fontSize: '3em',textAlign:'center'}}>
                <h3> Locataire : {selectedReservation ? (selectedReservation.nomLocataire +  " " + selectedReservation.prenomLocataire) : '-'} </h3>
            </div>
            <div style={{padding:"4px"}}>
            <Divider variant='middle'/>
            </div>
            <div className="flex-container" style={{margindisplay: "flex", flexFlow:'row wrap', justifyContent:'space-between'}}>
                        <div className="flex-item" style={{fontSize: '3em',textAlign:'center'}}>
                            <List>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                    primary={
                                      <div className="flex-container" style={{display: "flex", flexWrap:'wrap', gap:'30px', justifyContent:'center', alignItems:'center'}}>
                                            <div>
                                            <h3> <LocationOnIcon style={{color:'#F5365C'}}/> Borne de départ : {selectedReservation ? selectedReservation.nomBorneDepart : '-'} </h3>
                                            <br></br>
                                            <h3> <LocationOnIcon style={{color:'#F5365C'}}/> Borne d'arrivée : {selectedReservation ? selectedReservation.nomBorneDestination : '-'} </h3>
                                            </div>
                                            
                                      </div>
                                    }
                                    />
                                </ListItem>
                            </List>
                        </div>
            </div>
            <Divider/>
            <div style={{padding:'20px 0px 10px 30px'}}>
              <h2 style={{fontWeight:"bold", textAlign:"center"}}>Trajet</h2>
            </div>
            <div className="flex-container" style={{display: "flex", flexFlow:'row', justifyContent:'space-around'}}>
                <div className="flex-item" style={{fontSize: '3em',textAlign:'center'}}>
                  <List>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                        primary={
                            <div style={{textAlign:'center'}}>
                                <h3> <TodayIcon/> Date début : 
                                {selectedReservation.dateDebut == "" ? " - "
                                  : " " +selectedReservation.dateDebut }</h3>
                            </div>
                        }
                        />
                    </ListItem>
                    <Divider/>
                    <ListItem alignItems="flex-start">
                    <ListItemText
                    primary={
                        <div style={{textAlign:'center', display: "flex", flexFlow:'row wrap', justifyContent:'center'}}>
                            <h3> <TodayIcon/> Date fin : {selectedReservation.dateFin== "" ? "-"
                                  : ' ' + selectedReservation.dateFin}</h3>
                        </div>
                    }
                    />
                    </ListItem>
                    <Divider/>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                        primary={
                            
                            <div style={{textAlign:'center'}}>
                                <h3> <AccessTimeIcon/>
                                 Durée {selectedReservation && selectedReservation.etatReservation == "Terminée" ? "" : "estimée"} du trajet :
                                {selectedReservation.tempsReel == "" ? ' ' + selectedReservation.tempsEstime
                                  : ' ' + selectedReservation.tempsReel
                                }</h3>
                            </div>   
                        }
                        />
                    </ListItem>  
                    <Divider/>
                    <ListItem alignItems="flex-start">
                    <ListItemText
                    primary={
                        <div style={{textAlign:'center'}}>
                            <h3> <DirectionsCarIcon/> Distance parcourue {selectedReservation && selectedReservation.etatReservation == "Terminée" ? "" : "estimée"} : 
                            {selectedReservation.nbKmEstime == "" ? ' ' + selectedReservation.nbKm : ' ' + selectedReservation.nbKmEstime} KM</h3>
                        </div>
                    }
                    />
                    </ListItem>
                    <Divider/>
                    <ListItem alignItems="flex-start">
                    <ListItemText
                    primary={
                        <div style={{textAlign:'center'}}>
                            <h3> <LocalAtmIcon/> Prix {selectedReservation && selectedReservation.etatReservation == "Terminée" ? "" : "estimé"} : 
                            {selectedReservation.prixAPayer == "" ? ' ' + selectedReservation.prixEstime
                              : ' ' + selectedReservation.prixAPayer} DA
                            </h3>
                        </div>     
                    }
                    />
                    </ListItem>                                                   
                    </List>
                </div>
                    
                    
                </div>
    </Dialog> 
  )

  const options = {
    filter: true,
    download:false,
    print:false,
    viewColumns:false,
    filterType: "dropdown",
    searchPlaceholder: 'Saisir un nom ou in ID..',
    selectableRowsHeader: false,
    selectableRows:false,
    textLabels: {
      body: {
        noMatch: 
        !loading ?
          <CircularProgress /> :
          "Ce véhicule n'a pas de réservations",
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
    onRowClick: (rowData, rowState) => {
      let idReservation = rowData[0]
      let reservation = historique.find(reservation => reservation.idReservation == idReservation)
      console.log(reservation)
      setSelectedReservation(reservation)
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
              <h1>Historique des réservations </h1>
            </div>
            
            <MUIDataTable
              title={"Véhicule : " + idVehicule}
              data={historiqueList}
              columns={columns}
              options={options}
            />
            
            {detailsRes}
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}


export default HistoriqueVehicule
