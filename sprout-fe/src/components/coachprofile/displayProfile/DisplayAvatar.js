import React from 'react';

const DisplayAvatar = (props) => {
  return (
    <div className="avatar-img">
      <img src={props.pictureUrl ? props.pictureUrl : "#"} className="profile-image" alt="profile"></img>
    </div>
  );
}


export default DisplayAvatar;