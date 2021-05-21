import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import ListeVehicules from "./components/GestionVehicules/ListeVehicules"
import HistoriqueVehicule from "./components/GestionVehicules/HistoriqueVehicule"
import DetailsVehicule from "./components/GestionVehicules/DetailsVehicule"
<<<<<<< HEAD
import ListBornes from "./components/ListBornes.js"
=======
import ListLocataires from "./components/GestionUtilisateurs/ListLocataires"
>>>>>>> cc6ecc44bda479fdf189736c5234bb762f5225fc
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
<<<<<<< HEAD
          <Route exact path="/bornes">
              <ListBornes bornes={null}></ListBornes>         
          </Route>
          
=======
          <Route exact path="/utilisateurs">
              <Navs></Navs>          
          </Route>
          <Route path="/locataires/:id" component={Locataire}/>
>>>>>>> cc6ecc44bda479fdf189736c5234bb762f5225fc
        </Switch>
        
      </Router>

  );
}

export default App;
