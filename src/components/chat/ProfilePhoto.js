import React from 'react';

function Profilephoto(props) {

    const user = props.user;

    return (
        <div className='profile-photo'>
            <img src={user.profilePhoto} />
        </div>
    );
}

export default Profilephoto;



