import Axios from "axios";
import {getToken} from './Network'

let token =getToken();
export default Axios.create({
  baseURL: "https://autolib-dz.herokuapp.com/api/",
  headers: {
    "authorization":`Basic ${token}`,
    "Content-type": "application/json"
  }
});