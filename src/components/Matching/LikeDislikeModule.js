import React from 'react';
import Roundbutton from './RoundButton';
import crossmark from './../../images/cross-mark.png'
import checkmark from './../../images/check-mark.png'

function Likedislikemodule(props){

    const users = props.users;
    const swipeLeft = props.swipeLeft;
    const swipeRight = props.swipeRight;


    return (
        <div className='Likedislikemodule'>
            <Roundbutton logo = {crossmark} users={users} swipe={swipeLeft} />    
            <Roundbutton logo = {checkmark} users={users} swipe={swipeRight}/>    
        </div>
    );
}

export default Likedislikemodule;
