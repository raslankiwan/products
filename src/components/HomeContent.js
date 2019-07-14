import React from 'react'
import { postRequest } from '../requestFetch'
export default class HomeContent extends React.Component {

    constructor() {
        super()
        this.state = {
            products: []
        }

        this.onSuccess = this.onSuccess.bind(this)
        this.onFail = this.onFail.bind(this)
    }

    componentDidMount() {
        var url = "http://127.0.0.1:8080/get_item";
        postRequest(url, null, 'GET', this.onSuccess, this.onFail)
    }

    onSuccess(json) {
        this.setState({products: json.data})
    }

    onFail(json) {

    }

    render() {
        return(
            this.state.products.length === 0 ? 
            <div>No items available</div>
            :
            <div>
                
                {this.state.products.map((item) => {
                return (
                    <div key={item.ID} style={styles.rowItem}>
                        Product #{item.ID}  <br/>
                        Name:   <input type="text" value={item.Name} onChange={(event) => {
                                    item.Name= event.target.value}
                                    }>  
                                </input><br/>
                        Description:    <input type="text" value={item.Description} onChange={(event) => {
                                            item.Description= event.target.value}
                                            }>  
                                        </input><br/>
                        Production: <input type="date" value={item.Production} onChange={(event) => {
                                        item.Production= event.target.value}
                                    }>  
                                     </input><br/>
                        Expiration: <input type="date" value={item.Expiration} onChange={(event) => {
                                        item.Expiration= event.target.value}
                                        }>  
                                     </input><br/>
                        Available? {item.Available === 0 ? <input type="checkbox" unchecked></input> :<input type="checkbox" checked> </input>} <br/>
                    </div>
                )
                })}
            </div>
        );
    }
}

const styles = {
    "rowItem": {
        borderColor: '#d6d7da',
        borderWidth: 5,
        borderRadius: 3,
        borderStyle: 'solid'
    }
}