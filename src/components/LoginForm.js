import React from 'react'
import '../App.css'
import logo from '../logo2.png'
import { black } from 'ansi-colors';

export default class LoginForm extends React.Component {
    state = {
        email: '',
        password: '', 
        emailErr: false,
        passwordErr: false,
        authErr: false,

    }

    logIn() {
        const { email, password } = this.state
        if (email === '') {
            this.setState({emailErr: true})
        } else if (password === '') {
            this.setState({passwordErr: true})
        } else {
            let url = localStorage.getItem('url_g') + '/auth'
            let body = {
                email, password
            }

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
            })
            .then(response => response.json())
            .then(json => { 
                if (json.status === 'success') {
                    localStorage.setItem('user', JSON.stringify({email, password}));
                    // to clear localStorage.clear()
                    let path = `/home`
                    this.props.history.push(path);
                } else {
                    this.setState({authErr: true})
                }
            })
            .catch(error => console.error(error));
            
        }
        
    }

    render() {
        return(
            <div className="App2">
                <div>
                    <img style={{width:500, marginLeft:30,marginTop:50}}
                    src={logo}
                    alt=""
                    />
                </div>
                <div className="login" style={{marginRight:60}}>
                        {this.state.emailErr ? <div>Please type a valid email</div> : null }
                        <input type="email" placeholder="Enter E-mail" value={this.state.email} onChange={(event) => {
                            this.setState({email: event.target.value, emailErr:''})}
                        } />

                        {this.state.passwordErr ? <div>Please type a password</div> : null }
                        <input type="password" placeholder="Enter Password" value={this.state.password} onChange={(event) => {
                            this.setState({password: event.target.value, passwordErr:''})}
                        }/>

                        {this.state.authErr ? <div>Authentication failed</div> : null }
                        <button style={{backgroundColor:black}} onClick={this.logIn.bind(this)}> Log in</button>
                </div>
            </div>
        );
    }
}