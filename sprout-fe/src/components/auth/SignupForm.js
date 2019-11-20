import React, { Component } from 'react';

class SignupForm extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
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
                        <input className="email-field" type="email" id="email" placeholder="Email" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="password-field" type="password" id="password" placeholder="Password" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="first-name" type="firstName" id="firstName" placeholder="First Name" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="last-name" type="lastName" id="lastName" placeholder="Last Name" onChange={this.handleChange} />
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