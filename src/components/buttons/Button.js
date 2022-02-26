import React from 'react';

function Button (props) {

    const label = props.label;

    return (
        <button className="btn ms-2 ">{label}</button>
    );
}

export default Button;
