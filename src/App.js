import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import ListeVehicules from "./components/GestionVehicules/ListeVehicules"
import HistoriqueVehicule from "./components/GestionVehicules/HistoriqueVehicule"
import DetailsVehicule from "./components/GestionVehicules/DetailsVehicule"
import AjouterVehicule from "./components/GestionVehicules/AjouterVehicule"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import ImageUpload from './components/ImageUpload';

function App() {
  return (

      <Router>
        <Sidebar> 
        </Sidebar>
        <Switch>
          <Route exact path="/vehicules">
              <ListeVehicules></ListeVehicules>          
          </Route>
          <Route exact path="/vehicules/historique/:id" component= {props => (
            <HistoriqueVehicule
              {...props}/>
          )} />
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
