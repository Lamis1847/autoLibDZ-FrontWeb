import React , {useEffect  , useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import {api} from '../../scripts/Network'

const RealTimeVehiculePos = (props) => {
    
    const [pos, setpos] = useState([36.752887, 3.042048]) 

    useEffect(() => {
        let id = props.id || 123
        api.get(`api/vehicule/${id}/position`)
        .then (
            res =>  {
                setpos(res.pos)
            }
        )
        .catch( err =>
            console.log(err)
        )
    },[pos])

    return (
        <div>
            <MapContainer center={pos} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={pos}>
                    <Popup>
                        the car
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default RealTimeVehiculePos
