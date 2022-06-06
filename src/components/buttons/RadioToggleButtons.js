import React from "react";

function Radiotogglebuttons(props) {
  const setStatus = props.setStatus;
  const addInputs = props.addInputs;

  return (
    <div className="Radio-toggle-buttons-group ms-5">
      <input
        type="radio"
        className="btn-check"
        name="options"
        id="btn-professionnel"
        autoComplete="off"
        onChange={setStatus}
      />
      <label
        className="btn btn-outline-warning ms-3"
        htmlFor="btn-professionnel"
      >
        Professionnel
      </label>

      <input
        type="radio"
        className="btn-check"
        name="options"
        id="btn-alternant"
        autoComplete="off"
        onClick={setStatus}
      />
      <label className="btn btn-outline-warning ms-3" htmlFor="btn-alternant">
        Alternant
      </label>

      <input
        type="radio"
        className="btn-check"
        name="options"
        id="btn-stagiaire"
        autoComplete="off"
        onClick={setStatus}
        
      />
      <label className="btn btn-outline-warning ms-3" htmlFor="btn-stagiaire">
        Stagiaire
      </label>
    </div>
  );
}

export default Radiotogglebuttons;
