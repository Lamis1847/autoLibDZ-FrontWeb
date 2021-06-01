import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import './VisuAndModifBorne.css'
import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
import axios from "axios";

const API = 'https://autolib-dz.herokuapp.com/api/';
const SERVICES = { Borne: 'bornes/' }

class VehiculesBorne extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
}

export default VehiculesBorne;