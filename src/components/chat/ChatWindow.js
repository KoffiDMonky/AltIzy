import React from 'react';
import Messageitem from './MessageItem';
import Profilephoto from './ProfilePhoto';

function Chatwindow(props) {

    const user = props.user;
    const photoCurrentUser = props.user[0].profilePhoto;

    // console.log(user[0]);
    return (
        <div className='chat-window'>
            <button className=' close-chat-window'>x</button>
            <div className='chat-window-header'>
                <Profilephoto user = {photoCurrentUser} />
                <span>{user[0].name}</span>
            </div>
            <div className='message-zone'>
                <Messageitem user = {user[0]}/>
                <Messageitem user = {user[0]}/>
                <Messageitem user = {user[0]}/>
                <Messageitem user = {user[0]}/>
                <Messageitem user = {user[0]}/>
                <Messageitem user = {user[0]}/>
            </div>
            <div className='text-zone'><input></input><button className='btn'>Envoyer</button></div>
            
        </div>
    );
}

export default Chatwindow;
