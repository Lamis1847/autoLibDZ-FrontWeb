import http from '../scripts/Network';

const getAll = () => {
  return http.get("/locataire/getLocataires");
};
const create = (data) => {
  return http.post("/locataire/createLocataire", data);
};
const remove = (id) => {
  return http.delete(`/locataire/${id}`);
};
const get = (id) => {
  return http.get(`/locataire/${id}`);
};
const update = (id, data) => {
  return http.put(`/locataire/${id}`, data);
};
const block = (id) => {
  return http.put(`/locataire/block/${id}`);
};
const LocataireService = {
    getAll,
    create,
    remove,
    get,
    update,
    block
  };
  export default LocataireService;  