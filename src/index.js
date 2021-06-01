import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import {BrowserRouter} from'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
   <App />,
  </BrowserRouter>,
   
  document.getElementById('root')
);

reportWebVitals();
