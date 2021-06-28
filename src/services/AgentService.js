import http from '../scripts/http-common';

const getAll = () => {
  return http.get("/agent");
};
const create = (data) => {
  return http.post("/agent", data);
};
const remove = (id) => {
  return http.delete(`/agent/${id}`);
};
const get = (id) => {
  return http.get(`/agent/${id}`);
};
const update = (id, data) => {
  return http.put(`/agent/${id}`, data);
};
const AgentService = {
    getAll,
    create,
    remove,
    get,
    update,
  };
  export default AgentService;  