import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar'
import Product from "./Product/Product"
import ProductList from "./Product/ProductList"
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar /> */}
        {/* <Product /> */}
        <ProductList />
      </div>
    );
  }
}

export default App;