import React, { Component } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from 'reactstrap';

import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
}  from "reactstrap";

import Map from "./Map.js"

const API= 'https://autolib-dz.herokuapp.com/api/bornes/all';




class ListBornes extends Component{
    constructor(props){
        super(props)
        this.onRowSelection = this.onRowSelection.bind(this);
            this.state = {
                selected: [0,0],
                data: []
            }
    }

    componentDidMount(){
        if(this.props.bornes==null){    
        axios.get(API)
        .then((res) => {
            let bornes = []
            for (const borne of res.data) {
                bornes.push([borne['idBorne'],borne['wilaya'],borne['nbPlaces'],borne['nbVehicules'],[borne['longitude'],borne['latitude']],borne['nomBorne']])
            }
            this.setState({data:bornes});
        })
    }else{
            this.setState({data:this.props.bornes});
    }
    
    }
    //without using async i had a problem : setState doesnt set the state immediatly so accesing the state right  after setting it returns an old value
    async onRowSelection(rowData, rowMeta){
          await this.setState({selected : rowData[4],popup:rowData[5]});
    }

    render(){
        const columns = [
        {
                name: "id",
                options: {
                    sort: true
                }
        }, 
        {
            name: "Wilaya",
            options: {
                sort: true
            }
        },
        {
            name: "Capacité",
            options: {
                sort: true
            }
        },
        {
            name: "Places libres",
            options: {
                sort: true
            }
        },
        {
            name: "cordonnees",
            options: {
              display: false,
            }
        },
        {
            name: "nom",
            options: {
              display: false,
            }
        },
        {
            name: "",
            options: {
              filter: false,
              sort: false,
              empty: true,
              customBodyRenderLite: (dataIndex) => {
                return (
                 /* <button onClick={() => {
                    const { data } = this.state;
                    data.shift();
                    this.setState({ data });
                  }}>
                    Delete
                  </button>*/
                  
                  <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action 1
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action 2
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action 3
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                );
              }
            }
          }
        ];

        const options = {
        filterType: 'checkbox',
        selectableRows: 'single',
        responsive: 'simple',
        onRowClick: this.onRowSelection
        };
        return(
            <Container>    
                <Row>
                    <Col xs={6} md={8}>
                        <MUIDataTable
                            title={"Resultats obtenus"}
                            data={this.state.data}
                            columns={columns}
                            options={options}
                            />
                    </Col>
                    <Col xs={6} md={4}>
                        <h2>Position sur la carte</h2>
                       <Map coordonnes={this.state.selected} popup={this.state.popup}></Map>
                    </Col>
                </Row>
           </Container>)
            
}}
export default ListBornes; 