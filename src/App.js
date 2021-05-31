import './App.css';
import Sidebar from "./components/Sidebar/Sidebar"
import ListeVehicules from "./components/GestionVehicules/ListeVehicules"
import HistoriqueVehicule from "./components/GestionVehicules/HistoriqueVehicule"
import DetailsVehicule from "./components/GestionVehicules/DetailsVehicule"
import Login from "./components/Auth/Connexion"
//Dashboard
import DashboardView from "./components/Dashboard/DashboardView"

import ListLocataires from "./components/GestionUtilisateurs/ListLocataires"
import ListBornes from "./components/ListBornes.js"
import {BrowserRouter as Router, Switch, Route , Redirect, BrowserRouter} from "react-router-dom"
import Locataire from './components/GestionUtilisateurs/Locataire';
import Navs from './components/GestionUtilisateurs/Tab'
import Admin from './components/GestionUtilisateurs/Admin';
import Agent from './components/GestionUtilisateurs/Agent';
import RealPos from './components/GestionVehicules/RealTimeVehiculePos'
import {getCookie} from "./scripts/Network.js" ;
import Operateur from './components/GestionUtilisateurs/Operateur';
import Dirigeant from './components/GestionUtilisateurs/Dirigeant';

const isUserAuthenticated =  () => {
	return !!getCookie("AL_Token",document.cookie)
	//return jwt.verify(getCookie("AL_Token"), 'secret', (err, decoded) => err ? false : true );
} 


function App() {
  return (

      <Router>

        <Switch>
			{

				!isUserAuthenticated() ? 
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
				<Route path="/vehicules">
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
