import React from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './components/dashb';
import CoachDetails from './components/coachprofile/CoachDetails';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App Site">
      <div className="Site-content">
        <header className="App-header">
        </header>
        <Route  path='/login' component={LoginForm} />
        <Route  path='/register' component={SignupForm} />
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/profile' component={CoachDetails} />
      </div>
      <Footer />
    </div>
  );
}

export default App;