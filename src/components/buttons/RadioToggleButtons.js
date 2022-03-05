import React from "react";

function Radiotogglebuttons() {
  return (
    <div className="Radio-toggle-buttons-group">
      <input
        type="radio"
        className="btn-check"
        name="options"
        id="btn-check-outlined1"
        autoComplete="off"
      />
      <label className="btn btn-outline-warning ms-5" htmlFor="btn-check-outlined1">
        Professionnel
      </label>

      <input
        type="radio"
        className="btn-check"
        name="options"
        id="btn-check-outlined2"
        autoComplete="off"
      />
      <label className="btn btn-outline-warning ms-3" htmlFor="btn-check-outlined2">
        Alternant
      </label>

      <input
        type="radio"
        className="btn-check"
        name="options"
        id="btn-check-outlined3"
        autoComplete="off"
      />
      <label className="btn btn-outline-warning ms-3" htmlFor="btn-check-outlined3">
        Stagiaire
      </label>
    </div>
  );
}

export default Radiotogglebuttons;
