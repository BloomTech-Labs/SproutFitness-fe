import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Alert } from 'reactstrap'


const ResetPassword = (props) => {
 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [updated, setUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

 // Checking link token if expired
 // eslint-disable-next-line react-hooks/exhaustive-deps
 const checkToken = async () => {
    console.log('PROPS:', props)
    const { match: { params: { token } } } = props
    try {
      const response = await axios.get(
        'http://localhost:5000/api/reset-password/coaches', // local
        //'https://sprout-fitness-be-staging.herokuapp.com/api/reset-password/coaches', // staging
        {params: { resetPasswordToken: token}}
        )
       console.log('RESPONSE:', response);
      if (response.data.message === 'password reset link a-ok') {
        setUsername(response.data.username)
        setUpdated(false)
        setIsLoading(false)
        setError(false)
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log(error.response.data);
      setUpdated(false)
      setIsLoading(false)
      setError(true)
    }
  }

  
  useEffect( () => {
    checkToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const handleChange = (event) => {
    setPassword(event.target.value)
  }


  // Updating password
  const updatePassword = async (e) => {
    e.preventDefault()
    const { match: { params: { token } } } = props
    try {
      const response = await axios.put(
        'http://localhost:5000/api/update-password-via-email/coaches', // local
        //'https://sprout-fitness-be-staging.herokuapp.com/api/update-password-via-email/coaches' // staging
        {
          username,
          password,
          resetPasswordToken: token,
        },
      )
      console.log('RESPONSE DATA:', response.data)
      if (response.data.message === 'password updated') {
        setUpdated(true)
        setError(false)
      } else {
        setUpdated(false)
        setError(true)
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }



    if (error) {
      return (
        <div className="password-reset-form">
          <Alert color="danger" className="incorrect-link-alert">
            The link has expired or incorrect. Please send another reset link.
          </Alert>
          <Button className="reset-password-btn btn-incorrect-link" color="info">
            <Link to='/forgot-password'><span>Forgot Password?</span></Link>
          </Button>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div>
          <p>Loading User Data...</p>
        </div>
      );
    }


    return (
      <div>
        <Form className="password-reset-form"  onSubmit={updatePassword}>
        <h2>Pleaser enter new password</h2>
          <Input
            id="password"
            label="password"
            onChange={handleChange}
            value={password}
            type="password"
          />
          <Button className='reset-password-btn' color="info" type='submit'><span>Update Password</span></Button>
        </Form>

        {updated && (
          <div>
            <Alert color="success" className="alert">
              Your password has been successfully reset, please try logging in again.
            </Alert>
            <Button color="info" className="register-alert-btn">
              <Link to='/login'>Login</Link>
            </Button>
          </div>
        )}
      </div>
    )
}



export default ResetPassword
