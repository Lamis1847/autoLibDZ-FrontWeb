import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


class Map extends Component{
    constructor(props){
        super(props)
            this.state = {
                position: this.props.coordonnes,
                popup: this.props.popup,
                map: null
            }
    }
//async await : so places where state is used are going to wait setting the state
    async componentWillReceiveProps(nextProps) {
       await this.setState({ position: nextProps.coordonnes ,popup: nextProps.popup});
          const {map} = this.state; //called destruction (feature of ES6)
          if (map) map.flyTo(this.state.position);
      }

    render(){        
    return(
  <MapContainer center={this.state.position} zoom={13} scrollWheelZoom={false} whenCreated={map => this.setState({ map })}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={this.state.position}>
      <Popup>
        {this.state.popup}
      </Popup>
    </Marker>
  </MapContainer>
     )
    }
}
export default Map; 