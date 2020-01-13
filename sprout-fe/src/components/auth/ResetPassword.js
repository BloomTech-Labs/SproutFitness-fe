/* eslint-disable no-console */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const loading = {
  margin: '1em',
  fontSize: '24px',
};


export default class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      updated: false,
      isLoading: true,
      error: false,
    };
  }

  async componentDidMount() {
    console.log('PROPS:', this.props)
    const { match: { params: { token } } } = this.props
    try {
      const response = await axios.get(
        'http://localhost:5000/api/reset-password/coaches', // local
        //'https://sprout-fitness-be-staging.herokuapp.com/api/reset-password/coaches', // staging
        {
        params: {
          resetPasswordToken: token,
        },
      })
       console.log('RESPONSE:', response);
      if (response.data.message === 'password reset link a-ok') {
        this.setState({
          username: response.data.username,
          updated: false,
          isLoading: false,
          error: false,
        });
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log(error.response.data);
      this.setState({
        updated: false,
        isLoading: false,
        error: true,
      });
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { match: { params: { token } } } = this.props;
    try {
      const response = await axios.put(
        'http://localhost:5000/api/update-password-via-email/coaches', // local
        //'https://sprout-fitness-be-staging.herokuapp.com/api/update-password-via-email/coaches' //staging
        {
          username,
          password,
          resetPasswordToken: token,
        },
      );
      console.log('RESPONSE DATA:', response.data);
      if (response.data.message === 'password updated') {
        this.setState({
          updated: true,
          error: false,
        });
      } else {
        this.setState({
          updated: false,
          error: true,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  render() {
   const { password, error, isLoading, updated } = this.state;
   console.log('Error:', error)

    if (error) {
      return (
        <div>
         <h1>Password Reset Screen</h1>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
           <button className="auth-btn"><Link to='/'>Go Home</Link></button>
            <button>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </button>
          </div>
        </div>
      )
    }

    if (isLoading) {
      return (
        <div>
          <h1>Password Reset Screen</h1>
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }


    return (
      <div>
        <h1>Password Reset Screen</h1>
        <form className="password-form" onSubmit={this.updatePassword}>
          <input
            id="password"
            label="password"
            onChange={this.handleChange('password')}
            value={password}
            type="password"
          />
          <button type='submit'>Update Password</button>
        </form>

        {updated && (
          <div>
            <p>Your password has been successfully reset, please try logging in again.</p>
            <button className="login-button">
              <Link to='/login'>Login</Link>
            </button>
          </div>
        )}
        <button className="auth-btn"><Link to='/'>Go Home</Link></button>
      </div>
    );
  }
}

