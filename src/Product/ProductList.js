import React, { Component } from 'react';
import { Menu, Input, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Product from "./Product"
import $ from "jquery";
class ProductList extends Component {
    constructor(){
        super()
        this.state={
            products:[],
            searchItem:null,
            orderingItem:true,
            loginModal:false
        }
        this.handleSearchItems = this.handleSearchItems.bind(this)
        this.productList = this.productList.bind(this)
        this.loginModal = this.loginModal.bind(this)
    }
    componentDidMount(){
     this.productList()
    }
    productList(){
        var searchItem =  this.state.searchItem
        var orderItem = this.state.orderingItem
        console.log('searchItem',searchItem,'searchItem',orderItem)
        if(searchItem !== null && orderItem == true){
            var url = `https://heekobackend.herokuapp.com/api/products/?search=${this.state.searchItem}&ordering=price`
        }
        else if (orderItem == false){
           var url =  `https://heekobackend.herokuapp.com/api/products/?ordering=-price`
        }
        else{
            url = `https://heekobackend.herokuapp.com/api/products/`
        }
        console.log('url',url)
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function (jsonData) {
                this.setState({
                  products : jsonData,
                })
            }.bind(this),
            error: function (xhr, status, err) {
              console.error(status, err.toString())
            }.bind(this)
        });
    }
    handleSearchItems(e){
        console.log(e.target.value)
        this.setState({
            searchItem:e.target.value
        },this.productList())
    }
    loginModal(){
        this.setState({
            loginModal: true
        })
    }

    render() {
    return (
      <div className="App">
          <div style={{backgroundColor:"#2be3e0", height:"80px"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center", height:"100%"}}>
                <Menu.Item id='logo' as={Link} to='/' header style={{fontSize:"20px"}}>
                    Heeko
                </Menu.Item>
                    <Menu.Item>
                        <Input icon={{ name: 'search', link: true }} onChange={this.handleSearchItems} placeholder='Search... Category, Name' />
                    </Menu.Item>

                    <Menu.Item as={Link} to='/cart'>
                        <Icon name='shop' />
                        <Label style={{color:"red", fontSize:"17px"}}>Shop</Label>
                    </Menu.Item>

                    {/* <Menu.Item  onClick={this.loginModal} to='/account'>
                        <Icon name='user' />
                        <Label style={{color:"black",fontSize:"17px"}}>Account</Label>

                    </Menu.Item> */}
                </div>
            </div>
            <div style={{display:"flex" ,flexDirection:"row", justifyContent:"space-evenly", flexGrow:"2", flexWrap:"wrap"}}>

         {this.state.products.map((product) =>
        <Product product={product} loginModal={this.state.loginModal}/>
         )}
        </div>

      </div>
    );
  }
}

export default ProductList;