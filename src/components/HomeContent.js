import React from 'react'
import { postRequest } from '../requestFetch'
import { withRouter } from 'react-router-dom'
import '../App.css'

class HomeContent extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',
            id: '',
            desc: '',
            prod: '',
            exp: '',
            addErr: '',
            available: '',
            products: [],
        }

        this.onSuccess = this.onSuccess.bind(this)
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this)
        this.onFail = this.onFail.bind(this)
    }

    componentDidMount() {
        let url_g = localStorage.getItem('url_g')
        var url = `${url_g}/get_item`
        postRequest(url, null, 'GET', this.onSuccess, this.onFail)
    }

    onSuccess(json) {
        
        this.setState({products: json.data})
    }

    onUpdateSuccess() {
        let path = `/home`
        this.props.history.push(path);
    }

    onDeleteSuccess(json) {
        let url_g = localStorage.getItem('url_g')
        var url = `${url_g}/get_item`
        postRequest(url, null, 'GET', this.onSuccess, this.onFail)
    }

    onFail(json) {

    }

    delete(dID) {
        let url_g = localStorage.getItem('url_g')
        var url = `${url_g}/delete_item/${dID}`;
        postRequest(url, null, 'DELETE', this.onDeleteSuccess, this.onFail)
    }

    update(item) {
        const { name, desc, exp, prod, id, available } = item
        var jsonObj = {
            name, desc, exp, prod, available
        }
        let url_g = localStorage.getItem('url_g')
        var url = `${url_g}/post_item/${id}`;
        postRequest(url, jsonObj, 'POST', this.onUpdateSuccess, this.onFail)
    }

    onItemClicked(item) {

        this.props.history.push({
            pathname: '/Add',
            state : {item}
        });
    }

    render() {
        return(
            this.state.products && this.state.products.length === 0 ? 
            <div>No items available</div>
            :
            <div>                
                {this.state.products && this.state.products.map((item) => {
                   let currentItem = {
                        id:item.ID,
                        name: item.Name,
                        desc: item.Description,
                        prod: item.Production,
                        exp: item.Expiration,
                        available: item.Available
                    }
                return (
                    <div className="rowItem">
                        <div className="items">
                            <div className="labels" onClick= {() => {this.onItemClicked(item)}}>
                                <label> ProductID:</label>
                                <label>Name:</label> 
                                <label>Description:</label>
                                <label>Production:</label>
                                <label>Expiration:</label>
                                <label>Available:</label>
                            </div>
                            <div className="item" key={item.ID}>
                                <input type="number" value={item.ID} onChange={(event) => {
                                    item.ID= event.target.value
                                    this.setState({id: event.target.value})
                                    currentItem.id = event.target.value
                                }
                                    }>  
                                </input>
                                <input type="text" value={item.Name} onChange={(event) => {
                                    item.Name= event.target.value
                                    this.setState({name: event.target.value})
                                    currentItem.name = event.target.value
                                }
                                    }>  
                                </input>
                                <input type="text" value={item.Description} onChange={(event) => {
                                    item.Description= event.target.value
                                    this.setState({desc: event.target.value})
                                    currentItem.desc = event.target.value
                                }
                                    }>  
                                </input>
                                <input type="date" value={item.Production} onChange={(event) => {
                                    item.Production= event.target.value
                                    this.setState({prod: event.target.value})
                                    currentItem.prod = event.target.value
                                }
                                    }>  
                                </input>
                                <input type="date" value={item.Expiration} onChange={(event) => {
                                    item.Expiration= event.target.value
                                    this.setState({exp: event.target.value})
                                    currentItem.exp = event.target.value
                                }
                                    }>  
                                </input>
                                <input type="text" value={item.Available} onChange={(event) => {
                                    item.Available= event.target.value
                                    this.setState({available: event.target.value})
                                    currentItem.available = event.target.value
                                }
                                    }>  
                                </input>
                            </div>
                            <div className="imag" onClick= {() => {this.onItemClicked(item)}}>
                                <img alt="Text" style={{width: 200, height:130}} src={"http://localhost:8080/load_image?src="+item.image}/>
                            </div>
                        </div>    
                        <div className="buttons">                            
                            <button style={{marginRight:10}} onClick={()=> this.delete(item.ID)}> Delete </button> 
                            <button onClick={()=> this.update(currentItem)}> Update </button>

                        </div> 
                    </div>                   
                )
                })}
            </div>
        );
    }
}
export default withRouter (HomeContent);