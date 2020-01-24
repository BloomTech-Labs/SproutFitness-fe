import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_TRY } from '../../actions';
import axios from 'axios';
import { Alert } from 'reactstrap'


const LoginForm = () => {
    // const error = useSelector(state => state.error)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setError] =useState(false)
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
        dispatch({ type: LOGIN_TRY })
        // axios.post('https://sprout-fitness-be-staging.herokuapp.com/api/login/coaches', user) // staging
         axios.post('http://localhost:5000/api/login/coaches', user) // local
        .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("Uid", response.data.id);
            dispatch({ type: LOGIN_SUCCESS, payload: response.data.id})
            history.push('/')
        })
        .catch(error => {
            dispatch({ type: LOGIN_FAIL, payload: error})
            setError(true)
            setTimeout(() => {
                setError(false)
             }, 4000)
        })
            
    }
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
            {loginError && 
                 <Alert color="danger" className="alert alert-login">
                   Invalid credentials
                </Alert>
               }
                <h1 className="auth-h1">
                   Login
                </h1>
                <div className="input-field">
                    <input className="email-field signup-input" 
                     type="email" 
                     placeholder="Email" 
                     id="email" 
                     autoComplete="username"
                     onChange={handleEmail} />
                </div>
                <div className="input-field">
                    <input className="password-field signup-input" 
                     type="password" 
                     placeholder="Password" 
                     id="password"
                     autoComplete="current-password"
                     onChange={handlePassword} />
                </div>
                <div className="input-field input-bottom">
                    <button className="auth-btn">Login</button>
                </div>
                <div className="signup-link">
                <h3 className="forgot-pw"><Link to="/forgot-password" className="login-forgot">Forgot password?</Link></h3>
                <h3 className="login-link">Don't have an account? <Link to="register" className="login-forgot">Sign up!</Link></h3>
                </div>
            </form>
        </div>
    );
}
export default LoginForm;