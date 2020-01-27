import React from 'react';

const DisplaySpecialty = (props) => {
  return (
    <div className="displaySpecialty">
      <div className="displayCert-text">
      <h2>Specialty</h2>
      {(props.specialties) && props.specialties.map((special, index) => {
        return <p key={index}>{special.name}</p>
        })}
      </div>
    </div>
  );
}


export default DisplaySpecialty;