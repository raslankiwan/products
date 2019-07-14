import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';
import { PrivateRoute } from './components/PrivateRoute';

class App extends React.Component {

  state = {
      loggedIn: false,
      v: 7,
      vert: false,
  }

  render() {
    return (
      <Router>
          <PrivateRoute exact path="/" component={Homepage} />
          <Route path="/login" component={LoginForm} />
      </Router>
    );
  }
  
}

export default App;
