import React, { Component } from 'react';
import $ from "jquery";
import { Modal, Card, Image, Rating, Grid, Header, Divider, Button, Input, Flag } from 'semantic-ui-react'

import Navbar from './Navbar/Navbar'
class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            order:[]
        }
        this.getOrder = this.getOrder.bind(this)
    }
    componentDidMount(){
        // this.getOrder()
        var url = "https://heekobackend.herokuapp.com/api/orders/"
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            cache: false,
            headers: {
                "Authorization" : `JWT ${localStorage.getItem('heekoToken')}`
            },
            success: function (jsonData) {
                this.setState({
                    order: jsonData
                })
                console.log('5')
                console.log(jsonData,'adf')
            }.bind(this),
            error: function (xhr, status, err) {
              console.error('asd',status, err.toString())
            }.bind(this)
        });

    }
    getOrder(){
        console.log('1st')
        var url = "https://heekobackend.herokuapp.com/api/orders/"
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            cache: false,
            headers: {
                "Authorization" : `JWT ${localStorage.getItem('heekoToken')}`
            },
            success: function (jsonData) {
                this.setState({
                    order: jsonData
                })
                console.log('5')
                console.log(jsonData,'adf')
            }.bind(this),
            error: function (xhr, status, err) {
              console.error('asd',status, err.toString())
            }.bind(this)
        });
    }

  render() {
    return (
      <div className="App">
        <Navbar />
        {this.state.order.map((products) => <div>
            <Card four wide column>
                <Card.Content>
                    <Card.Header>
                        Owner {products.owner}
                    </Card.Header>

                    <Card.Meta>
                        Product Name => {products.products}
                    </Card.Meta>
                </Card.Content>

                <Card.Content extra>
                    Price to pay = >{products.total_price}
                </Card.Content>
            </Card>
            </div>)}

      </div>
    );
  }
}

export default Cart;