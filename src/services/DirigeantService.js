import http from '../scripts/Network';

const getAll = () => {
  return http.get("/dirigeant");
};
const create = (data) => {
  return http.post("/dirigeant", data);
};
const remove = (id) => {
  return http.delete(`/dirigeant/${id}`);
};
const get = (id) => {
  return http.get(`/dirigeant/${id}`);
};
const update = (id, data) => {
  return http.put(`/dirigeant/${id}`, data);
};
const DirigeantService = {
    getAll,
    create,
    remove,
    get,
    update,
  };
  export default DirigeantService;  