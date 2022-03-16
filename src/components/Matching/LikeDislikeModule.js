import React from 'react';
import Roundbutton from './RoundButton';
import crossmark from './../../images/cross-mark.png'
import checkmark from './../../images/check-mark.png'

function Likedislikemodule(props){

    const users = props.users;

    return (
        <div className='Likedislikemodule'>
            <Roundbutton logo = {crossmark} users={users} />    
            <Roundbutton logo = {checkmark} users={users}/>    
        </div>
    );
}

export default Likedislikemodule;
