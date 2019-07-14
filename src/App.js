import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';

class App extends React.Component {

  state = {
      loggedIn: false,
      v: 7,
      vert: false,
  }

  render() {
    return (
      <Router>
          <Route exact path="/home" component={Homepage} />
          <Route path="/" component={LoginForm} />
      </Router>
    );
  }
  
}

export default App;
