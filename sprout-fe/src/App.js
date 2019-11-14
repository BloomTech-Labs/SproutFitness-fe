import React from 'react';
import './App.css';
import { Route, NavLink } from 'react-router-dom'
import Dashboard from './components/dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      

      <Route exact path='/' component={Dashboard} />
    </div>
  );
}

export default App;
