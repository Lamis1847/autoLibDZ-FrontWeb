import http from '../scripts/Network';

const getAll = () => {
  return http.get("/administrateur");
};
const create = (data) => {
  return http.post("/administrateur", data);
};
const remove = (id) => {
  return http.delete(`/administrateur/${id}`);
};
const get = (id) => {
  return http.get(`/administrateur/${id}`);
};
const update = (id, data) => {
  return http.put(`/administrateur/${id}`, data);
};
const AdministrateurService = {
    getAll,
    create,
    remove,
    get,
    update,
  };
  export default AdministrateurService;  