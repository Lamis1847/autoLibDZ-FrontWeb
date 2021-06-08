import React , {useEffect  , useState} from 'react'
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import axios from "axios"
import {api} from '../../scripts/Network'
import { slice } from 'lodash'
import { error } from 'jquery'

const RealTimeVehiculePos = (props) => {
    
    const [pos, setpos] = useState([36.752887, 3.042048]) 

    const [map, setmap] = useState(null)

/*
    useEffect(() => {
        axios.post("http://9c878f8afb52.ngrok.io/api/track/start").then( res =>
            console.log(res)
        )
        .catch(err=> console.error(err))
        return () => {
            axios.post("http://9c878f8afb52.ngrok.io/api/track/stop")
            .then()
            .catch(console.error(error))
        }
    }, [props.id])

    useEffect(() => {
        //api/vehicule/${props.id}/position
        axios.get(`http://9c878f8afb52.ngrok.io/api/track/position` )
        .then (
            res =>  {
                let newpos = slice(res.data.geometry.coordinates , 0,2).reverse()
                setpos(newpos)
                if (map) map.flyTo(pos)
                setInterval(() => {},5000)
            }
        )
        .catch( err =>
            console.log(err)
        )

    },[pos,props.id])

    */

    return (
        <div className="sur-mapctn">
            <h1>Position en temps reel</h1>
            <div className="sur-mapctn2">
                <MapContainer center={pos} zoom={30} scrollWheelZoom={false} style={{height : "400px"}} whenCreated={map => setmap( map )}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={pos}>    
                        <Circle center={pos} radius={50} />
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default RealTimeVehiculePos
