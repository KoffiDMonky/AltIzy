import React from 'react';
import './chat.css'
import Chatitem from './ChatItem';
import profilePhoto from "./../../images/agenorhouessou.jpg";

const users = [
    { profilePhoto: {profilePhoto}, name: "Agénor" },
    { profilePhoto: {profilePhoto}, name: "Agénor" },
    { profilePhoto: {profilePhoto}, name: "Agénor" },
    { profilePhoto: {profilePhoto}, name: "Agénor" },
    { profilePhoto: {profilePhoto}, name: "Agénor" },
  ];

function Chatlist(){

    const listItems = users.map((user, index) => (
        <li key = {index}>
          <Chatitem user={user} />
        </li>

      ));

      
    return (
        <div className='chat-list'>
            <div className='chat-list-header'>
                Lorem Ipsum
            </div>
            {listItems} 
        </div>
    );
}

export default Chatlist;
