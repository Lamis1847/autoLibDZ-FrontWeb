import React, { useState, useEffect, useCallback } from "react";
import MUIDataTable from "mui-datatables";
import { NavLink , useHistory } from 'react-router-dom'
import EtatVehiculeCol from './EtatVehiculeCol'
import MenuIcon from "@material-ui/icons/Menu";
import { Container } from "reactstrap";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api} from "../../scripts/Network"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AjouterVehicule from "./AjouterVehicule";
import ModifierVehicule from "./ModifierVehicule";
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import { duration } from "moment";
import axios from "axios";
import {getToken} from '../../scripts/Network.js'
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

const ListeVehicules = (props) => {


  //Relatif à l'API

  const myServerBaseURL = "https://autolib-dz.herokuapp.com";

  const [vehicules, setVehicules] = useState([]);
  const [vehicule, setVehicule] = useState(null);
  const [loading, setLoading] = useState(null);
  const [supprimer, setSupprimer] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleOpenSupprimer = () => {
    setSupprimer(true)
    handleClose()
    //setSlideSupp(true)
  }

  const handleCloseSupprimer = () => {
      setSupprimer(false)
      // setSlideSupp(false)
  }

  const loadVehicules = useCallback(async () => {
    setLoading(true)
    api.get(`/api/vehicules`).then( res => {
      const vehicules = res;
      console.log(vehicules);
      setVehicules(vehicules);
      setLoading(false)
    })
  }, []);

  const onSupprimerVehicule = useCallback( async () => {
    const response = await axios.put(`${myServerBaseURL}/api/vehicules/${idVehicule}`, 
    {
        numChassis: vehicule.numChassis,
        numImmatriculation: vehicule.numImmatriculation,
        modele: vehicule.modele,
        marque: vehicule.marque,
        couleur: vehicule.couleur,
        etat: "supprime",
        tempsDeRefroidissement: vehicule.tempsDeRefroidissement,
        pressionHuileMoteur: vehicule.pressionHuileMoteur,
        chargeBatterie: vehicule.chargeBatterie,
        anomalieCircuit: vehicule.anomalieCircuit,
        pressionPneus: vehicule.pressionPneus,
        niveauMinimumHuile: vehicule.niveauMinimumHuile,
        regulateurVitesse: vehicule.regulateurVitesse,
        limiteurVitesse: vehicule.limiteurVitesse,
        idAgentMaintenance: vehicule.idAgentMaintenance,
        idBorne: vehicule.idBorne,
        idCloudinary: vehicule.idCloudinary,
        secureUrl: vehicule.secureUrl,
        id: vehicule.id
        },
        { headers : { authorization : `Basic ${getToken()}`}},
                    )
                    .then((response) => {
                        setSlideSupp(true)
                        setSuppSuccess(true)
                        console.log("supprimé")
                        console.log(response);
                        window.setTimeout( function(){
                            handleCloseSupprimer()
                            setSuppSuccess(null)
                            window.location.href = "/vehicules";
                        }, 2000 );
                        }, (error) => {
                        setSlideSupp(true)
                        setSuppSuccess(false)
                        console.log("erreur")
                        console.log(error);
                        window.setTimeout( function(){
                          handleCloseSupprimer()
                          setSuppSuccess(null)
                          window.location.href = "/vehicules";
                        }, 2000 );
                        });
  });

  let listeVehicules = vehicules.map(obj => Object.values(obj));
  const [idVehicule, setIdVehicule] = useState(null);
  const [slide, setSlide] = useState(null)
  const [slideSupp, setSlideSupp] = useState(null)
  const [suppSuccess, setSuppSuccess] = useState(null)

  const suppSuccessMessage = (
    <div style={{margin:'20px 0px', padding:'12px'}}>
             {(suppSuccess == true) && (
                <Slide direction="up" in={slideSupp} mountOnEnter unmountOnExit>
                <Alert severity="success" onClose={() => {
                    setSlideSupp(false)
                    }}>
                    <AlertTitle>Succés</AlertTitle>
                    Le véhicule a été supprimé <strong>avec succés</strong>
                </Alert>
                </Slide>
             ) } { (suppSuccess == false) && (
                <Slide direction="up" in={slideSupp} mountOnEnter unmountOnExit>
                <Alert severity="error">
                    <AlertTitle>Erreur!</AlertTitle>
                    <strong>Erreur lors de la suppression du véhicule</strong>
                </Alert>
                </Slide>
             ) }
    </div>
  )

  const supprimerDialogue = (
    <div>
        <Dialog
            open={supprimer}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle style={{fontFamily:'Nunito-Regular', padding:'12px', margin:"8px", fontWeight:'bold', boxShadow:'none'}}>
            <Typography style={{fontWeight:'bold', fontSize:'22px', fontFamily:'Nunito-Regular'}}>
            Supprimer définitivement
            </Typography>
        </DialogTitle>
            <Typography style={{fontFamily:'Nunito-Regular', fontSize:'18px', padding:'14px 20px', boxShadow:'none'}}>
            Attention ! vous aller effectuer une operation irréversible
            <br></br>
            assurez-vous bien de cette étape avant de continuer
            </Typography>  
            <DialogActions>
            <Button onClick={onSupprimerVehicule} style={{textTransform:"capitalize", color:"#F5365C", fontFamily:'Nunito-Regular', margin:"12px 20px", fontWeight:"bold"}}>
                Confirmer
            </Button>
            <Button onClick={handleCloseSupprimer} style={{textTransform:"capitalize", backgroundColor:"#252834", color:"white", fontFamily:'Nunito-Regular', padding:"6px 12px", margin:"12px 20px"}}>
                Annuler
            </Button>
            </DialogActions>                  
            {suppSuccess ? suppSuccessMessage : <br></br>}
        </Dialog>
    </div>
)

const [slideBloquer, setSlideBloquer] = useState(null)
const [bloquerSuccess, setBloquerSuccess] = useState(null)
const [bloquer, setBloquer] = useState(null)

  const handleOpenBloquer = () => {
    setBloquer(true)
    handleClose()
  }

  const handleCloseBloquer = () => {
      setBloquer(false)
  }

const onBloquerVehicule = useCallback( async () => {
  const response = await axios.put(`${myServerBaseURL}/api/vehicules/${idVehicule}`,
    {
      numChassis: vehicule.numChassis,
      numImmatriculation: vehicule.numImmatriculation,
      modele: vehicule.modele,
      marque: vehicule.marque,
      couleur: vehicule.couleur,
      etat: "hors service",
      tempsDeRefroidissement: vehicule.tempsDeRefroidissement,
      pressionHuileMoteur: vehicule.pressionHuileMoteur,
      chargeBatterie: vehicule.chargeBatterie,
      anomalieCircuit: vehicule.anomalieCircuit,
      pressionPneus: vehicule.pressionPneus,
      niveauMinimumHuile: vehicule.niveauMinimumHuile,
      regulateurVitesse: vehicule.regulateurVitesse,
      limiteurVitesse: vehicule.limiteurVitesse,
      idAgentMaintenance: vehicule.idAgentMaintenance,
      idBorne: vehicule.idBorne,
      idCloudinary: vehicule.idCloudinary,
      secureUrl: vehicule.secureUrl,
      id: vehicule.id
                  },
      { headers : { authorization : `Basic ${getToken()}`}}
                  )
                  .then((response) => {
                      setSlideBloquer(true)
                      setBloquerSuccess(true)
                      console.log("bloqué")
                      console.log(response);
                      window.setTimeout( function(){
                          handleCloseBloquer()
                          setBloquerSuccess(null)
                          window.location.href = "/vehicules";
                        }, 2000 );
                      }, (error) => {
                      setSlideBloquer(true)
                      setBloquerSuccess(false)
                      console.log("erreur")
                      console.log(error);
                      window.setTimeout( function(){
                        handleCloseBloquer()
                        setBloquerSuccess(null)
                        window.location.href = "/vehicules";
                      }, 2000 );
                      });
});

const bloquerSuccessMessage = (
  <div style={{margin:'20px 0px', padding:'12px'}}>
           {(bloquerSuccess == true) && (
              <Slide direction="up" in={slideBloquer} mountOnEnter unmountOnExit>
              <Alert severity="success" onClose={() => {
                  setSlide(false)
                }}>
                  <AlertTitle>Succés</AlertTitle>
                  Le véhicule a été bloqué <strong>avec succés</strong>
              </Alert>
              </Slide>
           ) } { (bloquerSuccess == false) && (
              <Slide direction="up" in={slideBloquer} mountOnEnter unmountOnExit>
              <Alert severity="error">
                  <AlertTitle>Erreur!</AlertTitle>
                  <strong>Erreur lors de la suppression du véhicule</strong>
              </Alert>
              </Slide>
           ) }
  </div>
)

const bloquerDialogue = (
  <div>
      <Dialog
          open={bloquer}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
      <DialogTitle style={{fontFamily:'Nunito-Regular', padding:'12px', margin:"8px", fontWeight:'bold', boxShadow:'none'}}>
          <Typography style={{fontWeight:'bold', fontSize:'22px', fontFamily:'Nunito-Regular'}}>
          Bloquer le véhicule
          </Typography>
      </DialogTitle>
          <Typography style={{fontFamily:'Nunito-Regular', fontSize:'18px', padding:'14px 20px', boxShadow:'none'}}>
          Etes-vous sur de vouloir bloquer ce véhicule?
          </Typography>  
          <DialogActions>
          <Button onClick={onBloquerVehicule} style={{textTransform:"capitalize", color:"#F5365C", fontFamily:'Nunito-Regular', margin:"12px 20px", fontWeight:"bold"}}>
              Confirmer
          </Button>
          <Button onClick={handleCloseBloquer} style={{textTransform:"capitalize", backgroundColor:"#252834", color:"white", fontFamily:'Nunito-Regular', padding:"6px 12px", margin:"12px 20px"}}>
              Annuler
          </Button>
          </DialogActions>     

          {bloquerSuccess ? bloquerSuccessMessage : <br></br>}
      </Dialog>
  </div>
)
  
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

  const [openAjout, setOpenAjout] = React.useState(false);

  const handleOpenAjout = () => {
    setOpenAjout(true);
  };
  const handleCloseAjout = () => {
    setOpenAjout(false);
  };

  const [openModif, setOpenModif] = React.useState(false);

  const handleOpenModif = () => {
    setOpenModif(true);
    handleClose()
  };
  const handleCloseModif = () => {
    setOpenModif(false);
  };
  // Relatif à la table

  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setVehicule(vehicule);
    console.log(vehicule);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onRowSelect = (dataIndex) => {
    console.log(dataIndex)
  }

  const handleDetail = (idVehicule) =>{
    window.location.href =  `/vehicules/${idVehicule}`
  }

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
        customBodyRenderLite: (dataIndex) => {
          return (
            props.noadd ?
            null
            :
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  onClick={(e) => { e.preventDefault(); onRowSelect(dataIndex); handleDetail(idVehicule) ;}}
                >
                      Détails
                </DropdownItem>
                <DropdownItem
                  href="#"
                  onClick={(e) => { e.preventDefault(); onRowSelect(dataIndex); handleOpenBloquer() }}
                >
                  Bloquer
                </DropdownItem>
                <DropdownItem
                  href="#"
                  onClick={(e) => { e.preventDefault(); onRowSelect(dataIndex); }}
                >
                <NavLink to={"/vehicules/historique/" + idVehicule} variant="inherit" style={{fontFamily:'Nunito', color:'black'}}>
                      Historique
                </NavLink>
                </DropdownItem>
                <DropdownItem
                  href="#"
                  onClick={(e) => { e.preventDefault(); onRowSelect(dataIndex); handleOpenModif()}}
                  style={{fontFamily:'Nunito', color:'#FFCB00'}}
                >
                  Modifier
                </DropdownItem>
                <DropdownItem
                  href="#"
                  onClick={(e) => { e.preventDefault(); onRowSelect(dataIndex); handleOpenSupprimer()}}
                  style={{fontFamily:'Nunito', color:'#F5365C',border:"none", textAlign:"left"}}>
                  Supprimer
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        }
      }
    }
  ];

  const onRowSelection = async(rowData, rowState) => {
    await setIdVehicule(rowData[0]);
    let vehicule = vehicules.find(vehicule => vehicule.numChassis == idVehicule)
    await setVehicule(vehicule);
    setIdVehicule(rowData[0]);
    if (props.setSel)props.setSel(rowData[0]);
    console.log(idVehicule)
    console.log(vehicule)
  }

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
    onRowClick: onRowSelection,
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
    }
  };
  
  return (
    <React.Fragment>
      <div className="main-content">
        <div className="mt-40">
          <Container fluid>
                <div style={{padding:"12px"}}>
                <h1>Liste des véhicules </h1>
              </div>
            {
              props.noadd ?
              null
              :
              <>
              <div style={{padding:"12px 12px 20px 12px"}}>
                <Button variant="contained" onClick={handleOpenAjout} style={{backgroundColor:"#252834", textTransform:"capitalize", color:"white", fontWeight:'bold', width:'150px'}}>
                + Ajouter
                </Button>
              </div>
              </>
            }
            
            <MUIDataTable
              data={listeVehicules}
              columns={columns}
              options={options}
            />
            {supprimerDialogue}
            {bloquerDialogue}
          </Container>
          <Dialog onClose={handleCloseAjout} aria-labelledby="customized-dialog-title" open={openAjout} fullWidth='true' maxWidth='sm'>
              <AjouterVehicule
                handleCloseAjout={handleCloseAjout} 
              />
          </Dialog>

          <Dialog onClose={handleCloseModif} aria-labelledby="customized-dialog-title" open={openModif} fullWidth='true' maxWidth='sm'>
              <ModifierVehicule
                handleCloseModif={handleCloseModif} 
                idVehicule={idVehicule}
              />
          </Dialog>

        </div>
      </div>
    </React.Fragment>
   
  )
}

export default ListeVehicules
