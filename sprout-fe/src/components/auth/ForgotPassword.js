import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)
  const [messageFromServer, setMessageFromServer] = useState('')
  const [showNullError, setShowNullError] = useState(false)

  const handleChange = (event) => {
    setEmail(event.target.value)
  }

  const sendEmail = async (e) => {
    e.preventDefault();
    if (email === '') {
      setShowError(false)
      setMessageFromServer('')
      setShowNullError(true)
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/forgot-password/coaches', // local
          //'https://sprout-fitness-be-staging.herokuapp.com/api/forgot-password/coaches', // staging
          {
            email,
          },
        );
        console.log(response.data)
        if (response.data === 'recovery email sent') {
          setShowError(false)
          setMessageFromServer('recovery email sent')
          setShowNullError(false)
        }
      } catch (error) {
        console.error(error.response.data)
        if (error.response.data === 'email not in db') {
          setShowError(true)
          setMessageFromServer('')
          setShowNullError(false)
        }
      }
    }
  }

  
    return (
      <div>
       <h1>Forgot Password Screen</h1>
        <form className="profile-form" onSubmit={sendEmail}>
          <input
            id="email"
            label="email"
            name='email'
            value={email}
            onChange={handleChange}
            placeholder="Email Address"
          />
            <button type="submit" className="auth-btn">Send Password Reset Email</button>
        </form>
        {showNullError && (
          <div>
            <p>The email address cannot be null.</p>
          </div>
        )}
        {showError && (
          <div>
            <p>
              That email address isn&apos;t recognized. Please try again or
              register for a new account.
            </p>
            <button><Link to='/register'>Register</Link></button>
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}
        {/* <button className="auth-btn"><Link to='/'>Go Home</Link></button> */}
      </div>
    );
  
}

export default ForgotPassword;
