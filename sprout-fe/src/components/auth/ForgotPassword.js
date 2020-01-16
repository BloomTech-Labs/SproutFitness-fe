import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Alert } from 'reactstrap'
import './Auth.css'


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
        <Form className="password-reset-form" onSubmit={sendEmail}>
         <h2>Please enter your email address and you will receive a link to reset your password.</h2>
          <Input
            id="email"
            label="email"
            name='email'
            value={email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <Button color="info" type="submit" className="reset-password-btn">
             <span>Send Password Reset Email</span>
          </Button>
        </Form>
        {showNullError && (
          <div>
           <Alert color="danger" className="alert">
             Please enter email address.
            </Alert>
          </div> 
        )}
        {showError && (
          <div>
           <Alert color="danger" className="alert">
             That email address isn't recognized. Please try again or register for a new account.
           </Alert>
            <Button color="info" className='register-alert-btn'><Link to='/register'>Register</Link></Button>
          </div>
        )}
        {messageFromServer === 'recovery email sent' && (
          <div>
            <Alert color="success" className="alert">
              Password Reset Email Successfully Sent!
            </Alert>
          </div>
        )}
      </div>
    )
}

export default ForgotPassword
