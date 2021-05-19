import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import ListeVehicules from "./components/GestionVehicules/ListeVehicules"
import HistoriqueVehicule from "./components/GestionVehicules/HistoriqueVehicule"
import DetailsVehicule from "./components/GestionVehicules/DetailsVehicule"
import ListLocataires from "./components/GestionUtilisateurs/ListLocataires"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Locataire from './components/GestionUtilisateurs/Locataire';
import Navs from './components/GestionUtilisateurs/Tab'

function App() {
  return (

      <Router>
        <Sidebar> 
        </Sidebar>
        <Switch>
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
          <Route exact path="/utilisateurs">
              <Navs></Navs>          
          </Route>
          <Route path="/locataires/:id" component={Locataire}/>
        </Switch>
        
      </Router>

    
    
  );
}

export default App;
