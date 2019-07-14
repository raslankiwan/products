import React from 'react'
import {postRequest} from '../requestFetch'

export default class AddForm extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',
            id: '',
            desc: '',
            prod: '',
            exp: '',
            addErr: ''
        }

        this.onSuccess = this.onSuccess.bind(this)
        this.onFail = this.onFail.bind(this)
    }


    onSuccess() {
        let path = `/home`
        this.props.history.push(path);
    }

    onFail() {
        this.setState({addErr: 'Something went wrong'})
    }
 
    doPut() {
        const { name, desc, exp, prod, id } = this.state
        var jsonObj = {
          name, desc, exp, prod
        }
        var url = "http://127.0.0.1:8080/add_item/"+id;
        postRequest(url, jsonObj, 'PUT', this.onSuccess, this.onFail)
    }

    render() {
        return(
            <div style={styles.container}>
                <h4>Add new item</h4>
            
                Name: <input type="text" value={this.state.name} onChange={(event) => {
                    this.setState({name: event.target.value, emailErr:''})}
                    }>
                </input>

                ID: <input type="number"  value={this.state.id} onChange={(event) => {
                    this.setState({id: event.target.value, emailErr:''})}
                    }>
                </input>

                Description:<input type="textarea" value={this.state.desc} onChange={(event) => {
                    this.setState({desc: event.target.value, emailErr:''})}
                    }>
                </input>
                Production:<input type="date" value={this.state.prod} onChange={(event) => {
                    this.setState({prod: event.target.value, emailErr:''})}
                    }>
                </input>
                Expiration:<input type="date" value={this.state.exp} onChange={(event) => {
                    this.setState({exp: event.target.value, emailErr:''})}
                    }>
                </input>
                
                {this.state.addErr !== '' && <div>{this.state.addErr}</div>}
                <button onClick={()=> this.doPut()}> Add Item </button> 
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