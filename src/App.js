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
import ListBornes from "./components/ListBornes.js"
import {BrowserRouter as Router, Switch, Route , Redirect, BrowserRouter} from "react-router-dom"
import ListBornes from "./components/GestionBornes/ListBornes"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Locataire from './components/GestionUtilisateurs/Locataire';
import Navs from './components/GestionUtilisateurs/Tab'
import Admin from './components/GestionUtilisateurs/Admin';
import Agent from './components/GestionUtilisateurs/Agent';
import RealPos from './components/GestionVehicules/RealTimeVehiculePos'
import {getCookie} from "./scripts/Network.js" ;
import Operateur from './components/GestionUtilisateurs/Operateur';
import Dirigeant from './components/GestionUtilisateurs/Dirigeant';
import {isAdminAuthenticated} from "./scripts/Network"



function App() {
  return (

      <Router>

        <Switch>
			{
				!isAdminAuthenticated() ? 
			<>

				<Redirect to="/login" /> 
				<Route path="/login">
					<Login/>
				</Route>
			 	
			</>
			  :
			<>		
				<Sidebar/>
				<Route path="/">
					<Redirect to="/dashboard"/>
				</Route>
				<Route path="/dashboard">
					<DashboardView></DashboardView>
				</Route>
				<Route exact path="/vehicules">
					<ListeVehicules></ListeVehicules>          
				</Route>
				<Route exact path="/vehicules/historique/:id" component= {props => (
					<HistoriqueVehicule
					{...props}/>
				)} />
				<Route exact path="/vehicules/:id" component= {props => (
				<DetailsVehicule
					{...props}
				/>
				)} />
				<Route path="/surveillance">
					<RealPos id="123"  /> //In Test 
				</Route>	
				<Route  path="/bornes">
					<ListBornes bornes={null}></ListBornes>         
				</Route>
				
				<Route  path="/utilisateurs">
					<Navs></Navs>          
				</Route>
				<Route path="/locataires/:id" component={Locataire}/>
				<Route path="/administrateurs/:id" component={Admin}/>
				<Route path="/agents/:id" component={Agent}/>	
				<Route path="/operateurs/:id" component={Operateur}/>
          		<Route path="/dirigeants/:id" component={Dirigeant}/>	
			</>

			}
			
        </Switch>
      </Router>

  );
}

export default App;
