import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './components/dashb';
import DisplayProfile from './components/coachprofile/displayProfile/DisplayProfile';
import CoachDetails from './components/coachprofile/CoachDetails';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';


function App() {
  return (
    <div className="App">
      <header className="App-header header-nav">
        <Navbar />
      </header>
      <div className="Site-content">
      <Route exact path='/login' component={LoginForm} />
      <Route exact path='/register' component={SignupForm} />
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/profile' component={DisplayProfile} />
      <Route exact path='/edit-profile' component={CoachDetails} />
      </div>
      <Footer />
    </div>
  );
}

export default App;

