import React from 'react'
import { Menu, Input, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import $ from "jquery";


class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            className: '',
            initialProducts: []
        }

        this.handleSearchItems = this.handleSearchItems.bind(this)
    }
    handleSearchItems(){
        $.ajax({
            url: "https://heekobackend.herokuapp.com/api/products/",
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
    

    render() {
        return (
            <div style={{backgroundColor:"#2be3e0", height:"80px"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-around", alignItems:"center", height:"100%"}}>
                <Menu.Item id='logo' as={Link} to='/' header style={{fontSize:"20px"}}>
                    Heeko
                </Menu.Item>
                    <Menu.Item>
                        <Input icon={{ name: 'search', link: true }} onChange={this.handleSearchItems} placeholder='Search... Category, Name' />
                    </Menu.Item>

                    <Menu.Item  as={Link} to='/cart'>
                        <Icon name='shop' />
                        <Label style={{color:"red", fontSize:"17px"}}>Shop</Label>
                    </Menu.Item>

                    <Menu.Item  to='/account'>
                        <Icon name='user' />
                        <Label style={{color:"black",fontSize:"17px"}}>Account</Label>

                    </Menu.Item>
                </div>
            </div>
        )
    }
}
export default Navbar