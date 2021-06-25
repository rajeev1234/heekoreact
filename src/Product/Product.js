import React from 'react'
import { Modal, Card, Image, Rating, Grid, Header, Divider, Button, Input, Flag } from 'semantic-ui-react'

import './Product.css'
import { Redirect } from 'react-router'
import $ from "jquery";
import 'semantic-ui-css/semantic.min.css'


class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            modalOpen: false,
            loginModal: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleMinusCount = this.handleMinusCount.bind(this)
        this.handleAddCount = this.handleAddCount.bind(this)
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalOnClose = this.handleModalOnClose.bind(this)
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.handleOnChangeUserName = this.handleOnChangeUserName.bind(this)
        this.handleOnChangePassword = this.handleOnChangePassword.bind(this)
        this.confirmClick = this.confirmClick.bind(this)
        this.getOrder = this.getOrder.bind(this)
    }

    handleOnChange(e) {
        this.setState({ quantity: parseInt(e.target.value, 10) })
    }

    handleMinusCount() {
        this.setState({ quantity: this.state.quantity - 1 })
    }

    handleAddCount() {
        this.setState({ quantity: this.state.quantity + 1 })
    }
    handleOnChangeUserName(e){
        this.setState({
            username: e.target.value
        })

    }
    handleOnChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    handleModalOpen() {
        this.setState({ modalOpen: true })
    }

    handleModalOnClose() {
        this.setState({ quantity: 1, modalOpen: false,loginModal:false })
    }

    handleAddToCart() {

        this.handleModalOnClose()
        this.setState({
            loginModal: true
        })
    }
    confirmClick(){
        console.log('asdf', this.state.username, this.state.password)
        var url = "https://heekobackend.herokuapp.com/api-token-auth/"
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            cache: false,
            data: {
                "username" : this.state.username,
                "password" : this.state.password
            },
            success: function (jsonData) {
                localStorage.clear('heekoToken')
                localStorage.setItem('heekoToken',jsonData.token)
                this.getOrder()
              console.log("response", jsonData)
            }.bind(this),
            error: function (xhr, status, err) {
              console.error(status, err.toString())
            }.bind(this)
        });
    }

    getOrder(){
        console.log('getorder', this.props.product)
        var url = "https://heekobackend.herokuapp.com/api/orders/"
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'POST',
            cache: false,
            headers: {
                "Authorization" : `JWT ${localStorage.getItem('heekoToken')}`
            },
            data:{
                "products": this.props.product.name,
                "quantities": this.props.product.quantity,
                "total_price": this.props.product.price,
                "delivery_method": "COD",
                "payment_method": "COD"
            },
            success: function (jsonData) {
              console.log("response3ddddddd", jsonData)
            //   this.props.history.push("/cart")
                window.location.replace("http://localhost:3000/cart");

            //   this.history.pushState(null, 'cart');

            }.bind(this),
            error: function (xhr, status, err) {
              console.error(status, err.toString())
            }.bind(this)
        });
    }

    render() {
       
        const modalTrigger =
         <Grid two wide column style={{marginTop:"5%"}}>
            <Card link onClick={this.handleModalOpen} four wide column>
                {/* <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", marginTop:"5%", alignItems:"center"}}> */}
                <Image src ={this.props.product.image_url}alt='img' centered rounded/>
                <Card.Content>
                    <Card.Header>
                        {this.props.product.name}
                    </Card.Header>

                    <Card.Meta>
                        $ {this.props.product.price}
                    </Card.Meta>
                </Card.Content>

                <Card.Content extra>
                    <Rating icon='star' defaultRating={this.props.product.rating} maxRating={5}/>
                </Card.Content>
            </Card>
        </Grid>

        return (
            <div>
            <Modal trigger={modalTrigger} size='large' open={this.state.modalOpen} onClose={this.handleModalOnClose} closeIcon>
                {/* <hr style={{marginTop:"5%"}}></hr> */}
                <Modal.Header><h1>Product Details</h1></Modal.Header>
                <div>

                <Modal.Content image>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Image src={this.props.product.image_url} alt='img' wrapped />
                            </Grid.Column>

                            <Grid.Column width={10}>
                                <Modal.Description>
                                    <Header id='product-name' as='h1'>{this.props.product.name}</Header>
                                    <Header id='price' as='h2'>$ {this.props.product.price}</Header>
                                    <Header id='rating' sub>
                                        <Rating icon='star' defaultRating={this.props.product.rating} maxRating={5} disabled />
                                    </Header>

                                    <div id='quantity'>
                                        <Button icon='minus' size='tiny' onClick={this.handleMinusCount} > - </Button>
                                        <Input value={this.state.quantity} onChange={this.handleOnChange} />
                                        <Button icon='add' size='tiny' onClick={this.handleAddCount} > + </Button>
                                        <span>(In stock: {this.props.product.description})</span>
                                    </div>

                                    <Divider />

                                    <p>{this.props.product.description}</p>
                                </Modal.Description>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        primary={true}
                        content='Add to cart'
                        icon='add to cart'
                        labelPosition='right'
                        id = "test"
                        onClick={this.handleAddToCart}
                    />
                </Modal.Actions>
                </div>
            </Modal>
            <Modal 
        open={this.state.loginModal}
        size='small'
        closeOnEscape={true}
        closeOnRootNodeClick={true}
      >
        <Header icon='browser' content='Heeko Login:' />
        <Modal.Content>
          <h3>Please login to continue:</h3>
        </Modal.Content>
        <Input value={this.state.username} onChange={this.handleOnChangeUserName} placeholder="username" />
        <br></br>
        <Input value={this.state.password} onChange={this.handleOnChangePassword} placeholder="password" />

        <Modal.Actions>
          <Button
            negative
            type='button'
            icon='remove'
            labelPosition='right'
            onClick={this.handleModalOnClose}
            content='Cancel'
          />
          <Button 
            positive
            type='button'
            icon='checkmark'
            labelPosition='right'
            onClick={this.confirmClick}
            content='Confirm'
          />
        </Modal.Actions>
      </Modal>
            </div>

        )
    }
}



export default Product