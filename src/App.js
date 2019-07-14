import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import LoginForm from './components/LoginForm';
import Homepage from './components/Homepage';

class App extends React.Component {

  componentDidMount() {
    localStorage.setItem('url_g', 'http://localhost:8080')
  }

  render() {
    return (
      <Router>
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/" component={LoginForm} />
      </Router>
    );
  }
  
}

export default App;
