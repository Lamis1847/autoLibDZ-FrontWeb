import React , {useEffect  , useState} from 'react'
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import {Alert} from 'reactstrap'
import {api} from '../../scripts/Network'
import { slice } from 'lodash'
import { error } from 'jquery'

const RealTimeVehiculePos = (props) => {
    
    const [pos, setpos] = useState([36.752887, 3.042048]) 

    const [map, setmap] = useState(null)

    const [trackstart, settrackstart] = useState(false)

    const [tracking, settracking] = useState(false)
    
    const [message, setmessage] = useState("Veuillez selectionner un vehicule pour commencer le tracking")

    const [alColor, setalColor] = useState("primary")

    useEffect(() => {
        api.post(`/api/track/start/${props.id}`)
        .then( res =>{
            settracking(true)
        })
        .catch(err=> {
            settracking(false)
            if(trackstart)
            {
                setmessage("Erreur lors de la recuperation de la position ( GPS inactif ou zone non couvete )")
                setalColor("danger")
            }
            settrackstart(true)
            console.error(err)
        })
        return () => {
            api.post(`/api/track/stop/${props.id}`)
            .then( res => console.log(`tracking stopped of ${props.id}`))
            .catch( err => console.log(error))
        }
    }, [props.id])

    useEffect(() => {
        api.get(`/api/track/position/${props.id}` )
        .then (
            res =>  {  
                let newpos = slice(res.geometry.coordinates , 0,2).reverse()
                setpos(newpos)
                if (map) map.flyTo(pos)
                setInterval(() => {},3000)
            }
        )
        .catch( err => {
            console.error(err)
        })

    },[pos,props.id])

    return (
        <div className="sur-mapctn">
            <div className="sur-mapctn1">
                { tracking ? <Alert color="success"> Suivi de position en temps reel </Alert> : 
                    <Alert color={alColor}> {message} </Alert>
                }
            </div>
            <div className="sur-mapctn2">
                <MapContainer center={pos} zoom={50} scrollWheelZoom={false} style={{height : "400px"}} whenCreated={map => setmap( map )}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        tracking ? 
                        <Marker position={pos}>    
                            <Circle center={pos} radius={20} />
                        </Marker> 
                       : null 
                    }
                </MapContainer>
            </div>
        </div>
    )
}

export default RealTimeVehiculePos
