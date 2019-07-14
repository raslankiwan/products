import React from 'react'

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
            let url = 'http://localhost:8080/auth'
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
            <div style={styles.container}>
            <div style={styles.form}>
                <div>
                    {this.state.emailErr ? <div>Please type a valid email</div> : null }
                    <label style={{width:'30px'}}>Email:</label> <input type="email" value={this.state.email} onChange={(event) => {
                        this.setState({email: event.target.value, emailErr:''})}
                    } />
                </div>

                <div>
                    {this.state.passwordErr ? <div>Please type a password</div> : null }
                    <label style={{width:'30px'}}>Password:</label> <input type="password" value={this.state.password} onChange={(event) => {
                        this.setState({password: event.target.value, passwordErr:''})}
                    }/>
                </div>

                <div>
                    {this.state.authErr ? <div>Authentication failed</div> : null }
                    <button onClick={this.logIn.bind(this)}> Log in</button>
                </div>
            </div>
            </div>
        );
    }
}

const styles = {
    "container": {
        flexDirection: 'column',
        top:0,
        left:0,
        right:0,
        bottom:0,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
    },
    "form": {
        // flexDirection: 'column',
       
    }, 
   
}