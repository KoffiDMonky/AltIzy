import React from 'react';

function Profilephoto(props) {

    const user = props.user;
    const id = props.id;

    return (
        <div className='profile-photo' id={id}>
            <img src={user} id={id}/>
        </div>
    );
}

export default Profilephoto;



