import axios from 'axios';
import React , {useState , useEffect} from 'react'
import {api , API_HOST} from '../../scripts/Network'
import CarInfo from './CarInfo';

const VehiculeEtat = props => {

    const [infos, setinfos] = useState([]);
    
    useEffect(() => {
        getInfos(props.id)
    }, [props.id])

    const getInfos = id => {
        api.get(`api/vehicules/${id}`)
        .then ( res => {
            let arr = Object.entries(res)
            setinfos(arr.slice(2,14))
        })
        .catch(
            err => console.log(err)
        )

    }

    const InfosDisplay = () => {
        return infos.map( (info) => <CarInfo name={info[0]} value={info[1]} key={info[0]} />  )
    }

    return (
        <div className="sur-etat-ctn">
        <h1>Etat du vehicule</h1>
            <div className="sur-etat-ctn2">
                {InfosDisplay()}
            </div>
        </div>
    )
}

export default VehiculeEtat
