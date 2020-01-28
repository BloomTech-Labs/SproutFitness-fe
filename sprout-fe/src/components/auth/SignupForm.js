import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTERING } from '../../actions';
import axios from 'axios';

const SignupForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
    }
    const handleFirstname = (e) => {
        e.preventDefault();
        setFirstname(e.target.value)
    }
    const handleLastname = (e) => {
        e.preventDefault();
        setLastname(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password,
            firstname,
            lastname
        }
        e.target.reset()
        dispatch({ type: REGISTERING })
        axios.post('https://sprout-fitness-be-staging.herokuapp.com/api/register/coaches',  user )
        .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("Uid", response.data.id);
            dispatch({ type: LOGIN_SUCCESS, payload: response.data.id})
            history.push('/')
        })
        .catch(error => {
            dispatch({ type: LOGIN_FAIL, payload: error})
        })
    }
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h1 className="auth-h1">
                   Sign Up
                </h1>
                <div className="input-field">
                    <input className="first-name signup-input" 
                        type="firstname" 
                        name="firstname"
                        id="firstname"
                        value={firstname} 
                        placeholder="First Name" 
                        onChange={handleFirstname} />
                </div>
                <div className="input-field">
                    <input className="last-name signup-input" 
                        type="lastname"
                        name="lastname"
                        id="lastname"
                        value={lastname}  
                        placeholder="Last Name" 
                        onChange={handleLastname} />
                </div>
                <div className="input-field">
                    <input className="email-field signup-input" 
                        type="email" 
                        name="email"
                        id="email"
                        value={email} 
                        placeholder="Email" 
                        onChange={handleEmail} />
                </div>
                <div className="input-field">
                    <input className="password-field signup-input" 
                        type="password" 
                        name="password"
                        id="password"
                        value={password} 
                        placeholder="Password" 
                        onChange={handlePassword} />
                </div>
                <div className="login-container">
                <div className="input-field input-bottom">
                    <button className="auth-btn signup-btn">Sign Up</button>
                </div>
                <h3 className="login-link">Already have an account? <a href="login" className="login-forgot">Login</a></h3>
                </div>
            </form>
        </div>
    );
}
export default SignupForm;