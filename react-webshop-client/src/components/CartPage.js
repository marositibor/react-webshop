import React, { Component } from "react";

import { connect } from "react-redux";
import Button from "./Button";
import CartPageItem from "./CartPageItem";
import { emptyCart } from "../redux/actions";

import { getCartWithProductData, getCartTotalPrice } from "../redux/selectors";
import "./CartPage.css";

function mapStateToProps(state) {
  return {
    cart: getCartWithProductData(state),
    totalPrice: getCartTotalPrice(state),
  }; //returning new array to always re-render(connect checks for shallow equality of returned value to determine re-render)
}

class CartPage extends Component {
  handleEmptyCart = () => {
    this.props.emptyCart();
  };

  handleCheckout = () => {
    this.props.history.push('/checkout')
  };

  render() {
    return (
      <div className="CartPage">
        <h2>Your cart</h2>
        <div className="cartpage-container">
          {this.props.cart.map((cartItem) => (
            <CartPageItem key={cartItem.product.sku} {...cartItem.product} />
          ))}
        </div>
        <div className="cartpage-totalrow">
          Total:{" "}
          <span className="cartpage-totalprice">
            {Number(this.props.totalPrice).toLocaleString("hu")}
          </span>{" "}
          Ft
        </div>
        <div className="cartpage-buttonrow">
          <Button
            onClick={this.handleEmptyCart}
            icon="fas fa-trash"
            text="Empty Cart"
          />{" "}
          <Button
            onClick={this.handleCheckout}
            icon="fas fa-money-bill-wave"
            text="Checkout"
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { emptyCart })(CartPage);
