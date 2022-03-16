import React from 'react';
import Profilephoto from './ProfilePhoto';

function Messageitem(props){

    const user = props.user;
    const name = user.name;
    const photoCurrentUser = user.profilePhoto
    const message = user.message

    return (
        <div className='message-item'>
            <Profilephoto user = {photoCurrentUser} />
            <div className='message'>
                <div className='message-user-name'>{name}</div>
                <div className='user-message'>{message}</div>
            </div>
            
        </div>
    );
}

export default Messageitem;
