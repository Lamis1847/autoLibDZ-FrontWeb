import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import ListeVehicules from "./components/GestionVehicules/ListeVehicules"
import { Container } from "reactstrap";
import HistoriqueVehicule from "./components/GestionVehicules/HistoriqueVehicule"
import DetailsVehicule from "./components/GestionVehicules/DetailsVehicule"

//Dashboard
//import DashboardView from "./components/Dashboard/DashboardView"
import LocationParSaison from "./components/Dashboard/LocationParSaison"

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
  return (

      <Router>
        <Sidebar> 
        </Sidebar>
        <Switch>
          <Route path="/dashboard">
            <LocationParSaison></LocationParSaison>
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
          
        </Switch>
        
      </Router>

    
    
  );
}

export default App;
