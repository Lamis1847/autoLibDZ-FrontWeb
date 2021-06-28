import http from '../scripts/http-common';

const get = (id) => {
  return http.get(`/abonnement/${id}`);
};
const update = (id, data) => {
  return http.put(`/abonnement/${id}`, data);
};

const recharger = (id, data) => {
  return http.post(`/abonnement/rechargez-carte-abonnement/${id}`, data);
};

const AbonnementService = {
  get,
  update,
};
export default AbonnementService;
