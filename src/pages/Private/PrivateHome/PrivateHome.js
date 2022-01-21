import React from 'react';
import meme from "./meme.gif"

function PrivateHome(){
    return (
        <div className='container p-5'>
            <h1 className="display-3 text-light mb-4 text-center">
                AALLLLLL RIIIIIGHT ! Tu es connecté et réorienté vers la partie privée de l'app !👍
            </h1>
            <img className="d-block mx-auto" style={{width: "500px"}} src={meme} alt="gif meme" />
            
        </div>
    );
}

export default PrivateHome;
