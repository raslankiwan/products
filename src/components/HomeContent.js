import React from 'react'
import { postRequest } from '../requestFetch'
import { withRouter } from 'react-router-dom'
import '../App.css'

class HomeContent extends React.Component {

    constructor() {
        super()
        this.state = {
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
                return (
                    <div className="rowItem">
                        <div className="item" key={item.ID} onClick= {() => {this.onItemClicked(item)}}>
                            <label> ProductID:</label>   <input type="text" value={item.ID} onChange={(event) => {
                                item.ID= event.target.value}
                                }>  
                                </input><br/>

                            <label>Name:</label>   <input type="text" value={item.Name} onChange={(event) => {
                                        item.Name= event.target.value}
                                        }>  
                                    </input><br/>
                            <label>Description:</label>    <input type="text" value={item.Description} onChange={(event) => {
                                                item.Description= event.target.value}
                                                }>  
                                            </input><br/>
                            <label>Production:</label> <input type="date" value={item.Production} onChange={(event) => {
                                            item.Production= event.target.value}
                                        }>  
                                        </input><br/>
                            <label>Expiration:</label> <input type="date" value={item.Expiration} onChange={(event) => {
                                            item.Expiration= event.target.value}
                                            }>  
                                        </input><br/>
                            <label>Available:</label>  <input type="text" value={item.Available} onChange={(event) => {
                                            item.Available= event.target.value}
                                            }>  
                                        </input><br/>
                        </div>
                        <div>                            
                            <button onClick={()=> this.delete(item.ID)}> Delete </button> 
                        </div> 
                    </div>                   
                )
                })}
            </div>
        );
    }
}
export default withRouter (HomeContent);