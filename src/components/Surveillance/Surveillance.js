import React , {useState} from 'react'
import RealPos from './RealTimeVehiculePos'
import ListVehic from '../GestionVehicules/ListeVehicules'
import EtatVehicule from './VehiculeEtat'
import { Card, CardBody,Container,Row,Col } from "reactstrap";

const Surveillance = () => {
    
    const [id, setid] = useState(456789)

    return (
        <div className="main-content">
            <div className="sur-ctn" >
                    <div>
                        <ListVehic noadd={true} selected={id}  setSel={setid}/>
                        <RealPos id={id} />
                    </div>  
                    <div>
                        <EtatVehicule id ={id} />
                    </div>  
                           
            </div>
        </div>
    )
}

export default Surveillance
