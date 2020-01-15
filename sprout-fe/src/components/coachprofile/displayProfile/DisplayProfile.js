import React, {useState} from "react";
import DisplayAvatar from './DisplayAvatar';
import DisplayInfo from './DisplayInfo';
import DisplayBio from './DisplayBio';
import DisplayCertSpec from './DisplayCertSpec';

const DisplayProfile = () => {

  return (
    <div>
      <h1>DisplayProfile</h1>
      <DisplayAvatar />
      <DisplayInfo />
      <DisplayBio />
      <DisplayCertSpec />
    </div>

  ); 
}

export default DisplayProfile;