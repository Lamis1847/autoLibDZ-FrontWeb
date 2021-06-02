import ListLocataires from "../GestionUtilisateurs/ListLocataires";
import Locataire from "../GestionUtilisateurs/Locataire";
import ListeVehicules from "../GestionVehicules/ListeVehicules"

var routes = [
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
    path: "/suivi",
    name: "Gestion Maintenance",
    icon: "fa fa-filter",
    component: ListeVehicules,
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
export default routes;
