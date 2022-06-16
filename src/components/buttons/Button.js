import React from "react";
import { Link } from "react-router-dom";

function Button(props) {
  const label = props.label;
  const href = props.href;
  const url = props.url;

  if (href) {
    return (
      <a href={href}>
        <button className="btn ms-2 ">{label}</button>
      </a>
    );
  } else if (url) {
    return (
      <Link to={url}>
        <button className="btn ms-2 ">{label}</button>
      </Link>
    );
  }
}

export default Button;
