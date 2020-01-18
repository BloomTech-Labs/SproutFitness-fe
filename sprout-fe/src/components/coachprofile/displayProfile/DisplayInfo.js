import React from 'react';

const DisplayInfo = (props) => {

  return (
    <div className="displayInfo">
      <p>{props.coach && props.coach.firstname ? props.coach.firstname : null} {props.coach && props.coach.lastname ? props.coach.lastname : null}</p>
      <p>{props.coach && props.coach.email ? props.coach.email : null}</p>
      <p>{props.coach && props.coach.city ? props.coach.city : null} {props.coach && props.coach.country ? props.coach.country : null}</p>
      <p>{props.coach && props.coach.timezone ? props.coach.timezone : null}</p>
    </div>
  );
}


export default DisplayInfo;