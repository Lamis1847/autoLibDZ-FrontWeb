import http from '../scripts/Network';

const getAll = () => {
  return http.get("/operateur");
};
const create = (data) => {
  return http.post("/operateur", data);
};
const remove = (id) => {
  return http.delete(`/operateur/${id}`);
};
const get = (id) => {
  return http.get(`/operateur/${id}`);
};
const update = (id, data) => {
  return http.put(`/operateur/${id}`, data);
};
const OperateurService = {
    getAll,
    create,
    remove,
    get,
    update,
  };
  export default OperateurService;  