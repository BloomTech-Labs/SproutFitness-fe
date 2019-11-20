import React from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      

      <Route  path='/login' component={LoginForm} />
      <Route  path='/register' component={SignupForm} />
    </div>
  );
}

export default App;
