import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import ListeVehicules from "./components/GestionVehicules/ListeVehicules"
import HistoriqueVehicule from "./components/GestionVehicules/HistoriqueVehicule"
import DetailsVehicule from "./components/GestionVehicules/DetailsVehicule"

//Dashboard
import DashboardView from "./components/Dashboard/DashboardView"

import ListLocataires from "./components/GestionUtilisateurs/ListLocataires"
import ListBornes from "./components/ListBornes.js"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Locataire from './components/GestionUtilisateurs/Locataire';
import Navs from './components/GestionUtilisateurs/Tab'

function App() {
  return (

      <Router>
        <Sidebar> 
        </Sidebar>
        <Switch>
          <Route path="/dashboard">
            <DashboardView></DashboardView>
          </Route>
          <Route exact path="/vehicules">
              <ListeVehicules></ListeVehicules>          
          </Route>
          <Route path="/historique">
            <HistoriqueVehicule></HistoriqueVehicule>
          </Route>
          <Route path="/vehicules/:id" component= {props => (
            <DetailsVehicule
              {...props}
            />
          )} />
          <Route exact path="/bornes">
              <ListBornes bornes={null}></ListBornes>         
          </Route>
          
          <Route exact path="/utilisateurs">
              <Navs></Navs>          
          </Route>
          <Route path="/locataires/:id" component={Locataire}/>
        </Switch>
        
      </Router>

  );
}

export default App;
