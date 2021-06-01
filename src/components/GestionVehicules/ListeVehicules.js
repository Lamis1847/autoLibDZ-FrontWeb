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
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AjouterVehicule from "./AjouterVehicule";
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import { duration } from "moment";

export const ListeVehicules = () => {

  //Relatif à l'API

  const myServerBaseURL = "https://autolib-dz.herokuapp.com";

  const [vehicules, setVehicules] = useState([]);
  const [loading, setLoading] = useState(null);


  const loadVehicules = useCallback(async () => {
    setLoading(true)
    const response = await axios.get(`${myServerBaseURL}/api/vehicules`);
    const vehicules = response.data;
    console.log(vehicules);
    setVehicules(vehicules);
    setLoading(false)
  }, []);

  let listeVehicules = vehicules.map(obj => Object.values(obj));
  const [idVehicule, setIdVehicule] = useState();
  const [slide, setSlide] = useState(null)
  const [success, setSuccess] = useState(false)

  const successMessage = (
    <div style={{margin:'20px 0px'}}>
             {success && (
                <Slide direction="up" in={slide} mountOnEnter unmountOnExit>
                <Alert severity="success" onClose={() => {setSlide(false)}}>
                    <AlertTitle>Succés</AlertTitle>
                    Le véhicule a été supprimé <strong>avec succés</strong>
                </Alert>
                </Slide>
             ) } { !success && (
                <Slide direction="up" in={slide} mountOnEnter unmountOnExit timeout={2000}>
                <Alert severity="error">
                    <AlertTitle>Erreur!</AlertTitle>
                    <strong>Erreur lors de la suppression du véhicule</strong>
                </Alert>
                </Slide>
             ) }
    </div>
  )

  const onSupprimerVehicule = useCallback( async () => {
    const response = await axios.delete(`${myServerBaseURL}/api/vehicules/${idVehicule}`)
                    .then((response) => {
                        setSlide(true)
                        setSuccess(true)
                        console.log("supprimé")
                        console.log(response);
                        handleClose()
                        loadVehicules()
                      }, (error) => {
                        setSlide(true)
                        setSuccess(false)
                        console.log("erreur")
                        console.log(error);
                        handleClose()
                      });
  });
  
  
  const preventDefault = event => event.preventDefault();

  //Charger la liste des véhicules
  useEffect(() => {
    loadVehicules();
  }, [loadVehicules]);

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
  

  const [openAjout, setOpenAjout] = React.useState(false);

  const handleOpenAjout = () => {
    setOpenAjout(true);
  };
  const handleCloseAjout = () => {
    setOpenAjout(false);
  };
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
                      <NavLink to={"/vehicules/historique/" + idVehicule} variant="inherit" style={{fontFamily:'Nunito', color:'black'}}>
                        Historique
                      </NavLink>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                      <NavLink to="#" variant="inherit" style={{fontFamily:'Nunito', color:'#FFCB00'}}>
                        Modifier
                      </NavLink>
                  </MenuItem>

                  <MenuItem onClick={onSupprimerVehicule}>
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
    onChangePage: currentPage => console.log('currentPage: ', currentPage),
    textLabels: {
      body: {
          noMatch: loading ?
              <CircularProgress /> :
              'Aucune donnée trouvée',
      },
  },

  };
  
  return (
    <React.Fragment>
      <div className="main-content">
        <div className="mt-40">
          <Container fluid>
            <div style={{padding:"12px"}}>
              <h1>Liste des véhicules </h1>
            </div>
            <div style={{padding:"12px 12px 20px 12px"}}>
              <Button variant="contained" onClick={handleOpenAjout} style={{backgroundColor:"#252834", textTransform:"capitalize", color:"white", fontWeight:'bold', width:'150px'}}>
              + Ajouter
              </Button>
              {successMessage}
            </div>
            <MUIDataTable
              data={listeVehicules}
              columns={columns}
              options={options}
            />
          </Container>
          <Dialog onClose={handleCloseAjout} aria-labelledby="customized-dialog-title" open={openAjout} fullWidth='true' maxWidth='sm'>
              <AjouterVehicule
                handleCloseAjout={handleCloseAjout} 
              />
          </Dialog>
        </div>
      </div>
    </React.Fragment>
    
      
   
  )
}


export default ListeVehicules
