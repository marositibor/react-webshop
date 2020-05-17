import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.css";
import { Link } from "react-router-dom";
import {getCartWithProductData,getCartTotalPrice} from "../redux/selectors";

class Cart extends Component {
  render() {
    if (this.props.cart.length === 0) {
      return (
        <div className="cart">
          <div className="cart-front">
            <div className="cart-total">Cart is empty</div>
            <div className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="cart">
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/cart`}
        >
          <div className="cart-front">
            <div>Total:</div>
            <div className="cart-total">
              {Number(this.props.totalPrice).toLocaleString("hu")} Ft
            </div>
            <div className="cart-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
          </div>
        </Link>
        <div className="cart-content">
          <table>
            <tbody>
            {this.props.cart.map((item) => {
              const product = item.product
              return (
                <tr key={item.sku}>
                  <td>
                    {product.inCart} x {product.name}
                  </td>
                  <td>=</td>
                  <td>
                    {Number(product.inCart * product.price).toLocaleString("hu")}{" "}
                    Ft
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>Total</td>
              <td>=</td>
              <td>{Number(this.props.totalPrice).toLocaleString("hu")} Ft</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const totalPrice = getCartTotalPrice(state)
  const cart = getCartWithProductData(state)
  return { cart, totalPrice };
};

export default connect(mapStateToProps)(Cart);
