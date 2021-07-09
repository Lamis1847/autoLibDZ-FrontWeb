import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import ListeVehicules from "./components/GestionVehicules/ListeVehicules"
import HistoriqueVehicule from "./components/GestionVehicules/HistoriqueVehicule"
import DetailsVehicule from "./components/GestionVehicules/DetailsVehicule"
import AjouterVehicule from "./components/GestionVehicules/AjouterVehicule"
import ImageUpload from './components/ImageUpload';
import Login from "./components/Auth/Connexion"
//Dashboard
import DashboardView from "./components/Dashboard/DashboardView"

import ListLocataires from "./components/GestionUtilisateurs/ListLocataires"
import { BrowserRouter as Router, Switch, Route, Redirect, BrowserRouter } from "react-router-dom"
import ListBornes from "./components/GestionBornes/ListBornes"
import Locataire from './components/GestionUtilisateurs/Locataire';
import Navs from './components/GestionUtilisateurs/Tab'
import Admin from './components/GestionUtilisateurs/Admin';
import Agent from './components/GestionUtilisateurs/Agent';
import Surveillance from './components/Surveillance/Surveillance'
import Operateur from './components/GestionUtilisateurs/Operateur';
import Dirigeant from './components/GestionUtilisateurs/Dirigeant';
import Panne from './components/Maintenance/historiquePanne';
import { isTypeAuthenticated , isAuth  } from "./scripts/Network"
import RechercheBorne from './components/GestionBornes/RechercheBorne/RechercheBorne'
import Abonnement from './components/GestionAbonnement/Tab'
import NavBar from './components/Sidebar/Navbar' ;
import { ListeReclamations } from './components/GestionVehicules/ListeReclamations';

function App() {

  return (

    <Router>

      <Switch>
        {
          !  isAuth() ?
            <>

              <Redirect to="/login" />
              <Route path="/login">
                <Login />
              </Route>

            </>
            :
            <>
              <Sidebar/>
              <Route path="/nav">
                <NavBar/>
              </Route>
              <Route path="/dashboard">
                <DashboardView></DashboardView>
                
              </Route> 
              {
                isTypeAuthenticated("administrateur") ? 
                  <>
                  <Route exact path="/vehicules">
                    <ListeVehicules/>
                  </Route>
                  <Route exact path="/vehicules/historique/:id" component={props => (
                    <HistoriqueVehicule
                      {...props} />
                  )} />
                  <Route exact path="/vehicules/:id" component={props => (
                    <DetailsVehicule
                      {...props}
                    />
                  )} />
                  <Route path="/surveillance">
                    <Surveillance/>
                  </Route>
                  <Route path="/reclamations">
                    <ListeReclamations/>
                  </Route>
                  <Route path="/bornes">
                    <RechercheBorne></RechercheBorne>
                  </Route>

                  <Route path="/utilisateurs">
                    <Navs></Navs>
                  </Route>
                  <Route path="/locataires/:id" component={Locataire} />
                  <Route path="/administrateurs/:id" component={Admin} />
                  <Route path="/agents/:id" component={Agent} />
                  <Route path="/operateurs/:id" component={Operateur} />
                  <Route path="/dirigeants/:id" component={Dirigeant} />
                  <Route path="/Abonnement">
                    <Abonnement></Abonnement>
                  </Route>
                  <Route path="/maintenance" component={Panne} />
                  
                  </>
                :
                  isTypeAuthenticated("operateur") ?  
                  <Route path="/Abonnement">
                    <Panne></Panne>
                  </Route>
                  : null       
                }
            </>
        }

      </Switch>
    </Router>

  );
}

export default App;
