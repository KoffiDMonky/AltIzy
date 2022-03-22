import React from 'react';
import { Link } from "react-router-dom";


function Button (props) {

    const label = props.label;
    const url = props.url;

    return (
        <Link to={url}>
        <button className="btn ms-2 ">{label}</button>
        </Link>
    );
}

export default Button;
