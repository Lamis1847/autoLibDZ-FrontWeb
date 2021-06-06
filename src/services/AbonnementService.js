import http from '../scripts/Network';

const get = (id) => {
  return http.get(`/abonnement/${id}`);
};
const update = (id, data) => {
  return http.put(`/abonnement/${id}`, data);
};

const recharger = (id, data) => {
  return http.put(`/abonnement/rechargez-carte-abonnement/${id}`, data);
};

const AbonnementService = {
  get,
  update,
};
export default AbonnementService;
