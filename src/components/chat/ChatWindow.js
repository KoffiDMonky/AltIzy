import React from 'react';
import Messageitem from './MessageItem';
import Profilephoto from './ProfilePhoto';

function Chatwindow(props) {

    const id = props.id;
    const user = props.user;
    const photoCurrentUser = props.user[id].profilePhoto;
    const setWindow = props.setWindow;

    return (
        <div className='chat-window'>
            <button className=' close-chat-window' onClick={() => setWindow(false)}>x</button>
            <div className='chat-window-header'>
                <Profilephoto user = {photoCurrentUser} />
                <span>{user[id].name}</span>
            </div>
            <div className='message-zone'>
                <Messageitem user = {user[id]}/>
                {/* <Messageitem user = {user[id]}/>
                <Messageitem user = {user[id]}/>
                <Messageitem user = {user[id]}/>
                <Messageitem user = {user[id]}/>
                <Messageitem user = {user[id]}/> */}
            </div>
            <div className='text-zone'><input></input><button className='btn'>Envoyer</button></div>
            
        </div>
    );
}

export default Chatwindow;