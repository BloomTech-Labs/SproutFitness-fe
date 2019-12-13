import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
    }
}

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios
            .post('https://sprout-fitness-be-staging.herokuapp.com/api/login/coaches', user)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("id", response.data.id);
                console.log(response)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            })
            
    }

    render() {
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
                         placeholder="Email" 
                         id="email" 
                         onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="password-field" 
                         type="password" 
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