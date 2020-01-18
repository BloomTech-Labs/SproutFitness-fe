import React from 'react';

const DisplayBio = (props) => {
  return (
    <div className="displayBio">
      <h2>Bio</h2>
      <p>{props.coach && props.coach.bio ? props.coach.bio : null}</p>
    </div>
  );
}


export default DisplayBio;