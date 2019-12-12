import React, { Component } from 'react';
import axios from 'axios';

class SignupForm extends Component {
  constructor(props){
      super(props)

      this.state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
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
        axios
            .post('https://sprout-fitness-be-staging.herokuapp.com/api/register/coaches', this.state)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        const { email, password, firstName, lastName } = this.state
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
                            name="email"
                            id="email"
                            value={email} 
                            placeholder="Email" 
                            onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="password-field" 
                            type="password" 
                            name="password"
                            id="password"
                            value={password} 
                            placeholder="Password" 
                            onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="first-name" 
                            type="firstName" 
                            name="firstName"
                            id="firstName"
                            value={firstName} 
                            placeholder="First Name" 
                            onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="last-name" 
                            type="lastName" 
                            name="lastName"
                            id="lastName"
                            value={lastName}  
                            placeholder="Last Name" 
                            onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <button className="auth-btn">Sign Up</button>
                    </div>
                    <h3 className="login-link">Already have an account? <a href="login">Login</a></h3>
                </form>
            </div>
        );
    }
}

export default SignupForm;