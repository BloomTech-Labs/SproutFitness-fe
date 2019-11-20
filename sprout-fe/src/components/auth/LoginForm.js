import React, { Component } from 'react';

class LoginForm extends Component {
    state = {
        email: '',
        password: ''
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
                        <input className="email-field" type="email" placeholder="Email" id="email" onChange={this.handleChange} />
                    </div>

                    <div className="input-field">
                        <input className="password-field" type="password" placeholder="Password" id="password" onChange={this.handleChange} />
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