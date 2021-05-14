import React, { useState } from 'react' ;
import {api, setCookie} from "./scripts/Network.js" ;




const Connexion = () => {
    
    const [email, setemail] = useState('')
    const [mdp, setmdp] = useState('')
    
    const onChangeHandler = event => {
        switch (event.target.name) {
            case "email":
                setemail(event.target.value)
                break;
            case "mdp":
                setmdp(event.target.value)
                break;
            default:
                break;
        }
            
    }
    
    const Connex = () => {
        console.log(email) ;
        api.post(
            "/api/auth/locataire",{
                email : email ,
                motdepasse : mdp
            }
        ).then(
            res => {
                if (res.success) {
                    setCookie("AL_Token",res.token)
                }
            }
        ).catch( err => console.log(err.message))
    }   

        return ( 
        <div className = "LoginPage" >
            <div className = "Main" >

                <input type="text" placeHolder="E-mail" name="email"  value={email} onChange={onChangeHandler}></input>
                <input type="password" placeHolder="Mot de passe" name="mdp" value={mdp} onChange={onChangeHandler} ></input>

                <button onClick={Connex}>
                     Valider
                </button>

            </div> 
            <div className = "BlackBand" >


            </div> 
            <div className = "ColoredBand" >


            </div>

        </div>)
    
}

export default Connexion