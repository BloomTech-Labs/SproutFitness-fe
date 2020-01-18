import React from 'react';

const DisplaySpecialty = (props) => {
  return (
    <div className="displaySpecialty">
      <div className="displayCert-text">
      <h2>Specialty</h2>
      <p>{props.name ? props.name : "#"}</p>
      </div>
    </div>
  );
}


export default DisplaySpecialty;