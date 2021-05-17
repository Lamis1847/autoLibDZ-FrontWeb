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
        api.post(
            "api/auth/administrateur",{
                email : email ,
                motdepasse : mdp
            }
        ).then(
            res => {
                console.log(res)
                if (res.success) {
                    setCookie("AL_Token",res.token)
                }
            }
        ).catch( err => console.log(err))
    }   

        return ( 
        <div className = "LoginPage" >
            <div className = "Main" >
                <img src="Logo 3.png" alt=""/>
                <h1>Se Connecter</h1>
                <p>Veuillez remplir les champs suivants afin de vous connecter</p>
                <input type="text" placeholder="Nom d'utilisateur ou e-mail" name="email"  value={email} onChange={onChangeHandler}></input>
                <input type="password" placeholder="Mot de passe" name="mdp" value={mdp} onChange={onChangeHandler} ></input>

                <button onClick={Connex}>
                     <span>Suivant</span> 
                </button>

            </div> 
            <div className = "BlackBand" >
                <h1 style ={{ marginTop : '60px'}}>Tour de contrôle</h1>
                <img src="settings 1.png" alt=""/>
                <p>Tableau de bord pour <br/> la gestion du système</p>
                <img className="img2" src="Group 1.png" alt="" style ={{ marginTop : 'auto' , marginBottom : '20%' }}/>
            </div> 
            <div className = "ColoredBand" >


            </div>

        </div>)
    
}

export default Connexion