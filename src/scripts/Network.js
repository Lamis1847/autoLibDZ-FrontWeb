import Axios from "axios";
import _ from "lodash";

/*
    *Pour faire une requete api il faut faire 
    import {api} from "scripts/Network.js"

    const params = {
        thing : "value"
    }
    api
    .post(url , {params})
    .then( res => { ur code })
    .catch( err => {} )

    // or

    api
    .get(url)
    .then( res => { ur code })
    .catch( err => {} )

    *Pour ajouter un cookie
    
    setCookie(nomduCookie , valeur)
    deleteCookie(nomduCookie)
    getCookie(nomduCookie)

    *Pour recupere les params d'une URL
    getParam("nomduparam)

*/


const API_HOST = process.env.API_HOST ;

const getApiFinalEndpoint = (endpoint) =>
  endpoint[0] === "/" ? `${API_HOST}${endpoint}` : `${API_HOST}/${endpoint}`;

const apiDefaultOptions = {
  withCredentials: true,
  resultCondition: (r) => true,
};
const api = {
  post: (endpoint, data = {}, options) => {
    options = Object.assign(_.cloneDeep(apiDefaultOptions), options);
    return new Promise((resolve, reject) => {
      Axios.post(getApiFinalEndpoint(endpoint), data, options)
        .then((suc) => {
          let result = _.get(suc, "data.result");
          let success = _.get(suc, "data.success");
          if (
            result === undefined ||
            !success ||
            !options.resultCondition(result)
          )
            return reject(suc);
          return resolve(result);
        })
        .catch(reject);
    });
  },
  get: (endpoint, options) => {
    options = Object.assign(_.cloneDeep(apiDefaultOptions), options);
    return new Promise((resolve, reject) => {
      Axios.get(getApiFinalEndpoint(endpoint), options)
        .then((suc) => {
          let result = _.get(suc, "data.result");
          let success = _.get(suc, "data.success");
          if (
            result === undefined ||
            !success ||
            !options.resultCondition(result)
          )
            return reject(suc);
          return resolve(result);
        })
        .catch(reject);
    });
  },
};
export { api };


const setCookie = (cname, cvalue, exdays = 365) => {
    if (_.isNil(cvalue)) return;
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
export { setCookie };


const deleteCookie = (cname) => {
    let d = new Date();
    d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
};
export { deleteCookie };

const getCookie = (cname, cookieString) => {
    if (!cname || !cookieString) return undefined;
    let name = cname + "=";
    let ca = cookieString.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return undefined;
  };
  export { getCookie };


const getParam = (param) =>  _.get(`req.params.${param}`) || _.get( `query.${param}`);
export { getParam };