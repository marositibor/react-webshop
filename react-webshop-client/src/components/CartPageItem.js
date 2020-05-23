import React, { Component } from "react";
import "./CartPageItem.css";
import { connect } from "react-redux";
import { addCartItem, removeCartItem } from "../redux/actions";
import Button from "./Button";
import {Link} from 'react-router-dom'

class CartPageItem extends Component {
  constructor(props) {
    super(props);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  handleAddProduct = (cartItem) => {
    this.props.addCartItem(cartItem);
  };

  handleRemoveProduct = (cartItem) => {
    this.props.removeCartItem(cartItem);
  };

  render() {
    return (
      <div className="cartpageitem">
        <img
          className="cartpageitem-image"
          src={process.env.REACT_APP_BACKEND_URL+'/'+this.props.primary_image}
          alt="Product"
        ></img>
        <div className="cartpageitem-name"><Link style={{ textDecoration: 'none',color: 'black' }} to={`/product/${this.props.sku}`}>{this.props.name}</Link></div>
        <div className="cartpageitem-buttonbar">
            <Button onClick={() => this.handleRemoveProduct({ sku: this.props.sku })} icon="fas fa-minus" />
           <span className='cartpageitem-incart'>{this.props.inCart}</span> 
           <Button onClick={() => this.handleAddProduct({ sku: this.props.sku })} icon="fas fa-plus" disabled={!this.props.inStock}/>
          </div>
        <div className="cartpageitem-price">
          {Number(this.props.price*this.props.inCart).toLocaleString("hu")} Ft
        </div>
      </div>
    );
  }
}

export default connect(null, { addCartItem,removeCartItem })(CartPageItem);
