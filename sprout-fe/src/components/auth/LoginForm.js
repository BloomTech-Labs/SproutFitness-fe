import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../../actions';
import axios from 'axios';
const LoginForm = () => {
    // const error = useSelector(state => state.error)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        e.target.reset()
        axios
        .post('https://sprout-fitness-be-staging.herokuapp.com/api/login/coaches', user)
        .then(response => {
            localStorage.setItem("token", response.data.token);
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
                    <span className="sf-title">Sprout</span>
                    <span className="sf-title-end"> Fitness</span>
                </h1>
                <div className="input-field">
                    <input className="email-field" 
                     type="email" 
                     placeholder="Email" 
                     id="email" 
                     onChange={handleEmail} />
                </div>
                <div className="input-field">
                    <input className="password-field" 
                     type="password" 
                     placeholder="Password" 
                     id="password" 
                     onChange={handlePassword} />
                </div>
                <div className="input-field">
                    <button className="auth-btn">Login</button>
                </div>
                <h3 className="signup-link">Don't have an account? <a href="register">Sign Up!</a></h3>
            </form>
        </div>
    );
}
export default LoginForm;