import React , {useState , useEffect} from 'react'
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import {api} from '../../scripts/Network'


const Navbar = () => {

    const [notifs, setnotifs] = useState([])

    const [toggle, settoggle] = useState(false)

    const ShowNotifs = () => {
        if(!toggle)
            api.get('/api/notifications')
            .then( res => {
                setnotifs([{ title:"titre",content:"content"}])
                settoggle(true)
            })
            .catch( err => console.log(err))
        else 
            settoggle(false)
    }

    const NotifDisplay = () => 
        notifs.map( not => <ListGroupItem key={not.title}>
            <ListGroupItemHeading>{not.title}</ListGroupItemHeading>
            <ListGroupItemText>
            {not.content}
            </ListGroupItemText>
        </ListGroupItem> )

    return (
        <div className="main-content ">
            <div className="nav-bar" >
                <div  className="not-btn" onClick={ShowNotifs}> <span> Notifications</span></div>
                <div  className="not-ctn">
                    <ListGroup>
                        {
                            toggle ? NotifDisplay() : null
                        }
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default Navbar
