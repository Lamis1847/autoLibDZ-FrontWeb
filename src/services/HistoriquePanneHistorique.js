import http from '../scripts/http-common';

const getAll = () => {
  return http.get("/locataire/getLocataires");
};
const LocataireService = {
    getAll
  };
  export default HistoriquePanneService;  