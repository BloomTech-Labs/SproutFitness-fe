import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import DisplayAvatar from './DisplayAvatar';
import DisplayInfo from './DisplayInfo';
import DisplayBio from './DisplayBio';
import DisplayCert from './DisplayCert';
import DisplaySpecialty from './DisplaySpecialty';



const DisplayProfile = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('Uid');

    const headers = {
      "Content-Type": "application/json",
      authorize: token,
    };

    axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/coach_helpers/coach/data/${id}`, headers).then((response) => {
      setProfile(response.data)
      console.log(response);
    })
  }, []);

  const [specialties, setSpecialties] = useState({});
  useEffect(() => {
    axios.get(`https://sprout-fitness-be-staging.herokuapp.com/api/specialties`)
    .then((response) => {
      setSpecialties(response.data)
    })
  }, []);
  return (
    <div className="displayProfile-container">
      <div className="displayProfile-top">
      {profile && profile.coach && profile.coach.picture_url ? <DisplayAvatar pictureUrl={profile.coach.picture_url} /> : <DisplayAvatar />}
      {profile && profile.certifications && profile.certifications.name ? <> <DisplayCert certifications={profile.certifications.name}/></> : <><DisplayCert /></>}
      {specialties && specialties.specialties && specialties.specialties.name ? <> <DisplaySpecialty specialties={specialties.specialties.name}/></> : <><DisplaySpecialty /></>}
      <Link to='/coachprofile' className='editprofile-btn'>
      Edit Profile
      </Link>
      </div>
      <div className="displayProfile-bottom">
        {profile && profile.coach ? <><DisplayInfo coach={profile.coach}/> <DisplayBio coach={profile.coach} /></> : <><DisplayInfo /> <DisplayBio /></>}
      </div>
    </div>

  ); 
}

export default DisplayProfile;