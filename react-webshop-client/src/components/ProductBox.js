import React, { Component } from "react";
import "./ProductBox.css";
import { connect } from "react-redux";
import { addCartItem, removeCartItem } from "../redux/actions";
import Button from "./Button";
import { Link } from "react-router-dom";

class ProductBox extends Component {
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
      <div className="productbox" style={{...this.props.style}}>
        <div className='productbox-contentbox'>
        <img
          className="product-image"
          src={process.env.REACT_APP_BACKEND_URL+'/'+this.props.primary_image}
          alt="Product"
        ></img>
        <div className="productbox-name">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/product/${this.props.sku}`}
          >
            {this.props.name}
          </Link>
        </div>
        <div className="productbox-description">{this.props.description}</div>
        <div className="productbox-price">
          {Number(this.props.price).toLocaleString("hu")} Ft
        </div>
        {this.props.inCart ? (
          <div className="productbox-buttonbar">
            <Button
              onClick={() => this.handleRemoveProduct({ sku: this.props.sku })}
              icon="fas fa-minus"
            />
            <span className="productbox-incart">
              {this.props.inCart} IN CART
            </span>
              <Button
                onClick={() => this.handleAddProduct({ sku: this.props.sku })}
                icon="fas fa-plus"
                disabled={!this.props.inStock}
              />
          </div>
        ) : (
          <div className="productbox-buttonbar">
            {this.props.inStock ? (
              <Button
                onClick={() => this.handleAddProduct({ sku: this.props.sku })}
                icon="fas fa-plus"
                text="Add to cart"
              />
            ) : (
              <div className="productbox-outofstock">Out of stock</div>
            )}
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default connect(null, { addCartItem, removeCartItem })(ProductBox);
