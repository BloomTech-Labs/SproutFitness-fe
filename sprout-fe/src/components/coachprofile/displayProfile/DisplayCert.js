import React from 'react';

const DisplayCert = (props) => {
  console.log('cert', props.certifications)
  return (
    <div className="displayCert">
      <div className="displayCert-text">
      <h2>Certificates</h2>
        {(props.certifications) && props.certifications.map((cert, index) => {
        return <p key={index}>{cert.name}</p>
        })}
      </div>
    </div>
  );
}


export default DisplayCert;