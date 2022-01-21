import React, {useContext} from 'react';
import {UserContext} from "../../context/userContext"
import {Outlet, useLocation, Navigate} from "react-router-dom"

function Private(){

    const {currentUser} = useContext(UserContext)

    if(!currentUser){ //S'il n'y a pas d'utilisateur de loggé, on revoit vers l'accueil
        return <Navigate to="/" />
    }


    return (
        <div className="container">
            <Outlet />
        </div>
    );
}

export default Private;
