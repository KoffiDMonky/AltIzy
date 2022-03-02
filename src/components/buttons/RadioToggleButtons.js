import React from "react";

function Radiotogglebuttons() {
  return (
    <div className="Radio-toggle-buttons-group">
      <input
        type="radio"
        class="btn-check"
        name="options"
        id="btn-check-outlined1"
        autocomplete="off"
      />
      <label class="btn btn-outline-warning ms-5" for="btn-check-outlined1">
        Professionnel
      </label>

      <input
        type="radio"
        class="btn-check"
        name="options"
        id="btn-check-outlined2"
        autocomplete="off"
      />
      <label class="btn btn-outline-warning ms-3" for="btn-check-outlined2">
        Alternant
      </label>

      <input
        type="radio"
        class="btn-check"
        name="options"
        id="btn-check-outlined3"
        autocomplete="off"
      />
      <label class="btn btn-outline-warning ms-3" for="btn-check-outlined3">
        Stagiaire
      </label>
    </div>
  );
}

export default Radiotogglebuttons;
