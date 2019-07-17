import React from 'react'
import {postRequest} from '../requestFetch'
import '../App.css';

export default class AddForm extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',
            id: '',
            desc: '',
            prod: '',
            exp: '',
            addErr: '',
            img: null,
            available: '',
            isChecked: false,
            file_url: null,
            imageName: null,
            imageSource: null,

            isUploading: false,
            isUploaded: false, 
            jsonResponse: {}
        }

        this.onSuccess = this.onSuccess.bind(this)
        this.onFail = this.onFail.bind(this)
    }

    componentDidMount() {
        if(this.props.location && this.props.location.state && this.props.location.state.item) {
            let item = this.props.location.state.item
            if(item.Available==='Yes') {
                this.setState({isChecked:true})
            }
            else if(item.Available==='No') {
                this.setState({isChecked:false})
            }

            this.setState({
                name: item.Name,
                id: item.ID,
                desc: item.Description, 
                prod: item.Production, 
                exp: item.Expiration,
                available: item.Available
            })
        }
        
    }

    onSuccess() {
        let path = `/home`
        this.props.history.push(path);
    }

    onnSuccess() {
        
    }

    onFail() {
        this.setState({addErr: 'Something went wrong'})
    }
 
    doPut() {
        const { name, desc, exp, prod, id, available } = this.state
        console.log(available)
        var jsonObj = {
          name, desc, exp, prod, available
        }
        let url_g = localStorage.getItem('url_g')
        var url = `${url_g}/add_item/${id}`;
        postRequest(url, jsonObj, 'PUT', this.onnSuccess, this.onFail)
    }

    update() {
        const { name, desc, exp, prod, id, available } = this.state
        var jsonObj = {
            name, desc, exp, prod, available
          }
        let url_g = localStorage.getItem('url_g')
        var url = `${url_g}/post_item/${id}`;
        postRequest(url, jsonObj, 'POST', this.onSuccess, this.onFail)
    }

    checkAvailable =(event) => {
        console.log(event.target.checked)
        if(event.target.checked) {
            this.setState(prvs => { return {available:'Yes', isChecked:!prvs.isChecked};})
            console.log(this.state.available)
        }
        else {
            this.setState(prvs => { return {available:'No', isChecked:!prvs.isChecked};})
            console.log(this.state.available)
        }
    }

    viewImg(event) {
        let file = event.target.files[0]
        let file_url = URL.createObjectURL(file)
        this.setState({
            imageName: file.name,
            imageSource: file,
            file_url: file_url,
             
        })
    }

    uploadImage() {
        let url = "http://localhost:8080/upload_image";
        const data = new FormData(); 
        data.append("file", this.state.imageSource); 
        data.append("imageName", this.state.imageName);
        data.append("id", this.state.id);
        this.setState({ isUploaded: false, isUploading: true })
        
        fetch(url, { 
            method: 'post', 
            body: data 
        }).then(response => { alert(response); return response.json(); }) 
            .then(json => { 
                this.setState({ isUploading: false, jsonResponse: json, isUploaded: true })                     
            })
            .then(() => this.onSuccess())
            .catch((error) => { 
                console.log(error); 
                alert("error:" + error)
                this.setState({ isUploading: false }); 
            });              
    }   

    render() {
        return(
            <div className="container">
                <h4>Add new item</h4>
                ProductID: <input type="number"  value={this.state.id} onChange={(event) => {
                    this.setState({id: event.target.value, emailErr:''})}
                    }>
                </input>            
                Name: <input type="text" value={this.state.name} onChange={(event) => {
                    this.setState({name: event.target.value, emailErr:''})}
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
                
                Expiration:<input type="date" defaultValue={this.state.exp} onChange={(event) => {
                    this.setState({exp: event.target.value, emailErr:''})}
                    }>
                </input>
                Available?<input type="checkbox" checked={this.state.isChecked} onClick={this.checkAvailable} >                        
                </input>
                
                {this.state.addErr !== '' && <div>{this.state.addErr}</div>}
                <button onClick={()=> this.doPut()}> Add Item </button> 
                <button onClick={()=> this.update()}> Update Item </button>

            
                <input type="file" name='file' style={{marginTop:20}} onChange={(event) => this.viewImg(event)}/> 

                {this.state.imageName && <img alt="Text" style={{width: 100, height:100}} src={this.state.file_url} />}


                <button onClick={()=> this.uploadImage()}> Upload Image </button> 
                

            </div>
        );
    }
}