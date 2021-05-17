import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import ListeVehicules from "./components/GestionVehicules/ListeVehicules"
import { Container } from "reactstrap";
import HistoriqueVehicule from "./components/GestionVehicules/HistoriqueVehicule"
import DetailsVehicule from "./components/GestionVehicules/DetailsVehicule"

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

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
          
        </Switch>
        
      </Router>

    
    
  );
}

export default App;
