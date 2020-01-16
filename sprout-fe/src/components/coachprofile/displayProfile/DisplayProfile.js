import React from "react";
import DisplayAvatar from './DisplayAvatar';
import DisplayInfo from './DisplayInfo';
import DisplayBio from './DisplayBio';
import DisplayCertSpec from './DisplayCertSpec';
import { Link } from 'react-router-dom';

const DisplayProfile = () => {

  return (
    <div className="displayProfile-container">
      <div className="displayProfile-top">
      <DisplayAvatar />
      <DisplayCertSpec />
      <Link to='/coachprofile' className='editprofile-btn'>
      Edit Profile
      </Link>
      </div>
      <div className="displayProfile-bottom">
      <DisplayInfo />
      <DisplayBio />
      </div>
    </div>

  ); 
}

export default DisplayProfile;