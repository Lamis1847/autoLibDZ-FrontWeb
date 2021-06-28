import ListLocataires from "../GestionUtilisateurs/ListLocataires";
import ListPannes from "../Maintenance/historiquePanne";
import Locataire from "../GestionUtilisateurs/Locataire";
import ListeVehicules from "../GestionVehicules/ListeVehicules"
import Abonnement from '../GestionAbonnement/Abonnement';
import { getUserType} from '../../scripts/Network'


var DirigeantRoutes = [
  {
    section: "",
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa fa-desktop",
    component: ListeVehicules,
    layout: "",
    api: false
  }
]

var OperateurRoutes = [{
  section: 'abonnement',
  path: '/Abonnement',
  name: 'Gestion Abonnement',
  icon: 'fa fa-credit-card',
  component: Abonnement,
  layout: '',
  api: false,
}
]

var AdminRoutes = [
  {
    section: "",
    path: "/dashboard",
    name: "Dashboard",
    icon: "fa fa-desktop",
    component: ListeVehicules,
    layout: "",
    api: false
  },

  {
    section: "vehicules",
    path: "/vehicules",
    name: "Gestion Véhicules",
    icon: "fa fa-car focus:bg-black hover:bg-black",
    component: ListeVehicules,
    layout: "",
    api: false
  },
  
  {
    section: "vehicules",
    path: "/bornes",
    name: "Gestion Bornes",
    icon: "fa fa-map-pin",
    component: ListeVehicules,
    layout: "",
    api: false
  },
  {
    section: "utilisateurs",
    path: "/utilisateurs",
    name: "Gestion utilisateurs",
    icon: "fa fa-user-circle",
    component: ListLocataires,
    layout: "",
    api: false
  },
  {
    section: 'abonnement',
    path: '/Abonnement',
    name: 'Gestion Abonnement',
    icon: 'fa fa-credit-card',
    component: Abonnement,
    layout: '',
    api: false,
  },
  {
    section: "suivi",
    path: "/surveillance",
    name: "Surveillance",
    icon: "fas fa-shield-alt",
    component: ListeVehicules,
    layout: "",
    api: false
  },
  {
    section: "suivi",
    path: "/maintenance",
    name: "Gestion Maintenance",
    icon: "fa fa-filter",
    component: ListPannes,
    layout: "",
    api: false
  },
  {
    section: "autre",
    path: "/parametres",
    name: "Parametres",
    icon: "fa fa-cogs",
    component: ListeVehicules,
    layout: "",
    api: false
  },
  
];

var routes = []
switch(getUserType()){
 case "administrateur" : routes = AdminRoutes; break ;
 case "dirigeant" : routes = DirigeantRoutes; break ;
 case "operateur" : routes = OperateurRoutes; break ;
}

export default routes;