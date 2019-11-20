import React from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './components/dashboard';
import RegisterCoach from './components/coachprofile/RegisterCoach';
import LoginCoach from './components/coachprofile/LoginCoach';
import CoachProfile from './components/coachprofile/CoachProfile';
import CoachDetails from './components/coachprofile/CoachDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Route  path='/login' component={LoginForm} />
      <Route  path='/register' component={SignupForm} />
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/coachRegister' render={(props) => { return <RegisterCoach {...props} /> }} />
      <Route exact path='/coachLogin' render={(props) => { return <LoginCoach {...props} /> }} />
      <Route exact path='/coachProfile' render={(props) => { return <CoachProfile {...props} /> }} />
      <CoachDetails />
    </div>
  );
}

export default App;
