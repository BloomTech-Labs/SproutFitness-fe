import React from 'react';
import './CoachProfile.css';


const CoachProfile = () => {



    return (
        <div className='container'>
            <div className='side-bar'>
                <div className='bar-contents'>
                    <h3 className='account'>Account</h3>
                    <p className='bar-links'>Home</p> 
                    <p className='bar-links'>Contacts</p>
                    <p className='bar-links'>Messenger</p>
                    <p className='bar-links'>Calendar</p>
                    <p className='bar-links'>Billing</p>
                </div>
            </div>
            <div className='main-content'>
            <div className='content-box'>
                    <p>Client Acquisition</p>
                </div>
                <div className='content-box'>
                    <p>Notifications</p>
                </div>
                <div className='content-box'>
                    <p>Profile Visibility</p>
                </div>
            </div>
        </div>
    )
}

export default CoachProfile;