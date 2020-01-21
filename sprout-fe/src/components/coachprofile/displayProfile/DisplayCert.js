import React from 'react';

const DisplayCert = (props) => {

  return (
    <div className="displayCert">
      <div className="displayCert-text">
      <h2>Certificates</h2>
        <p>Certificate of Health Coach</p>
        <p>Certificate of Health Coach</p>
        <p>Certificate of Health Coach</p>
        <p>Certificate of Health Coach</p>
        {/* {(props.name && props.name.map((cert, index) => {
          return <p key={index}>{cert.name}</p>
        }))} */}
      </div>
    </div>
  );
}


export default DisplayCert;