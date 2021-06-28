import React , {useState} from 'react'
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import {Alert} from 'reactstrap'
import { FirebaseDatabaseProvider , FirebaseDatabaseNode } from "@react-firebase/database";
import firebase from 'firebase' ;


const RealTimeVehiculePos = (props) => {
    
    const [pos, setpos] = useState([36.752887, 3.042048]) 

    const [map, setmap] = useState(null)

    const [trackstart, settrackstart] = useState(false)

    const [tracking, settracking] = useState(false)
    
    const [message, setmessage] = useState("Veuillez selectionner un vehicule pour commencer le tracking")

    const [alColor, setalColor] = useState("primary")

    const TrackingOn = (newpos) => {
        settrackstart(true)
        settracking(true) 
        setpos(newpos)
        if (map) 
            map.flyTo(newpos)
    }

    const TrackingOff = () => {
        settracking(false)
        setmessage("Erreur lors de la recuperation de la position ( GPS inactif ou zone non couvete )")
        setalColor("danger")
    }
    var config =  {
        apiKey: "AIzaSyAr-v-_CxxnZT7P48PmAxK0zCg3V-T8ROA",
        authDomain: "mapstest-70c5d.firebaseapp.com",
        databaseURL: "https://mapstest-70c5d-default-rtdb.firebaseio.com",
        projectId: "mapstest-70c5d",
        storageBucket: "mapstest-70c5d.appspot.com",
        messagingSenderId: "163789577006",
        appId: "1:163789577006:web:05d6f304986f45c2a0b8bf"
    };

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
            <FirebaseDatabaseProvider firebase={firebase} {...config}>
                <FirebaseDatabaseNode
                path={`message/${props.id}`}
                orderByValue={false}
                limitToFirst={null}
                >
                {d => {
                    if (!!d.value && (props.id === d.value.id)){
                        let newpos = [d.value.latitude,d.value.longitude]
                        TrackingOn(newpos);
                    }   
                    else {
                        if(trackstart && !!props.id)
                            TrackingOff() ;
                        else
                            settrackstart(true)
                    }
                    return (null)
                    
                }}
                </FirebaseDatabaseNode>
            </FirebaseDatabaseProvider>
            
        </div>
    )
}

export default RealTimeVehiculePos
