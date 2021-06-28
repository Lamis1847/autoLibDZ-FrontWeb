import http from '../scripts/http-common';

const getAll = () => {
  return http.get("/pannes");
};
const HistoriquePanneService = {
    getAll
  };
  export default HistoriquePanneService;  