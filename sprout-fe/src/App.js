import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import CoachProfile from './components/coachprofile/CoachProfile';
import CoachDetails from './components/coachprofile/CoachDetails';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {/* <Route exact path='/coachRegister' render={(props) => { return <RegisterCoach {...props} /> }}  />
      <Route exact path='/coachLogin' render={(props) => { return <LoginCoach {...props} /> }}  />
      <Route exact path='/coachProfile' render={(props) => { return <CoachProfile {...props} /> }}  />
      <SideBar /> */}
      <CoachDetails />
    </div>
  );
}

export default App;
