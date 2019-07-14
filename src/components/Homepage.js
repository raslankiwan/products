import React from 'react';
import {BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import '../App.css';
import AddForm from './AddForm';
import HomeContent from './HomeContent';

export default class Homepage extends React.Component {
    state = {
        loggedIn: false,
        v: 7,
        vert: false,
    }

    // componentWillUnmount() {
    //     localStorage.clear();
    // }

    render() {
        return (
          <Router>
            <div className="App">
                <ul className='nav' >
                    <li >
                        <NavLink to="/home" exact activeStyle={
                            { color: 'green' }
                        }>Home</NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/Add" exact activeStyle={
                            { color: 'green' }
                        }>Add</NavLink>
                    </li>
                    
                </ul>
    
                <Route path="/home" exact strict render={
                  () => {
                      return <HomeContent/>
                  }
              } />
                
                <Route path="/Add" exact strict component={AddForm} />
            </div>
          </Router>
        );
      }
}