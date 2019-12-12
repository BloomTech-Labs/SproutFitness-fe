import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component { 
    constructor(props){
        super(props)
    
     this.state = {
        email: '',
        password: ''
     }
}

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios
            .post('https://sprout-fitness-be-staging.herokuapp.com/api/login/coaches', this.state)
            .then(result => {
                localStorage.setItem("token", result.data.token)
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        const { email, password} = this.state
        return (
            <div className="auth-container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="auth-h1">
                        <span className="sf-title">Sprout</span>
                        <span className="sf-title-end"> Fitness</span>
                    </h1>

                    <div className="input-field">
                        <input className="email-field"
                         type="email" 
                         value={email}
                         placeholder="Email" 
                         id="email" 
                         onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="password-field" 
                         type="password" 
                         value={password}
                         placeholder="Password" 
                         id="password" 
                         onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <button className="auth-btn">Login</button>
                    </div>
                    <h3 className="signup-link">Don't have an account? <a href="register">Sign Up!</a></h3>
                </form>
            </div>
        );
    }
}

export default LoginForm;

// import React, { useState } from 'react';
// import api from './api';

// export default function LoginForm(){
//     const [error, setError] = useState()
//     const [data, setData] = useState({
//         email: '',
//         password: ''
//     })

//     const handleChange = (event) => {
//         setData({
//             ...data,
//             [event.target.name]: event.target.value,
//         })
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()

//         api()
//             .post('https://sprout-fitness-be-staging.herokuapp.com/api/login/coaches', data)
//             .then(result => {
//                 localStorage.setItem('token', result.data.token)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }

//     return (
//         <div className="auth-container">
         
//             <form onSubmit={handleSubmit}>
//                 {error && <div className="error">{error}</div>}
//                 <h1 className="auth-h1">
//                     <span className="sf-title">Sprout</span>
//                     <span className="sf-title-end"> Fitness</span>
//                 </h1>

//                 <div className="input-field">
//                     <input className="email-field"  type="email" placeholder="Email" onChange={handleChange} />
//                 </div>

//                 <div className="input-field">
//                     <input className="password-field" type="password" placeholder="Password" onChange={handleChange} />
//                 </div>

//                 <div className="input-field">
//                     <button className="auth-btn" type="submit">Sign Up</button>
//                 </div>
//                 <h3 className="signup-link">Don't have an account? <a href="register">Sign Up!</a></h3>
//             </form>
//         </div>
//     )
// }