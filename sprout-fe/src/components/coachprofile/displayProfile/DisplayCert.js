import React from 'react';

const DisplayCert = (props) => {
  return (
    <div className="displayCert">
      <div className="displayCert-text">
      <h2>Certificates</h2>
        <p>{props.name ? props.name : "#"}</p>
      </div>
    </div>
  );
}


export default DisplayCert;