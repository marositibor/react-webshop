import React, { Component } from "react";

import { connect } from "react-redux";
import { emptyCart } from "../redux/actions";

import Button from "./Button";

import { getCartWithProductData, getCartTotalPrice } from "../redux/selectors";
import "./CheckoutPage.css";

function mapStateToProps(state) {
  return {
    cart: getCartWithProductData(state),
    totalPrice: getCartTotalPrice(state),
  };
}

class CheckoutPage extends Component {
  constructor(props){
    super(props);
    this.state={
      name: '',
      email:'',
      address:'',
      orderSent:'true'
    }
    this.form = React.createRef()
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(){
    const formData = new FormData(this.form.current)
    formData.append('cart', JSON.stringify(this.props.cart));
    const request= {method: 'POST',body: formData};
    const response = await fetch('http://localhost:3050/order',request)
    if(response.ok){
      this.props.emptyCart()
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    if(this.props.cart.length === 0){
      return <h2>Thank your for your order. Your order reference number is:</h2>
    }
    return (
      <div className="checkoutpage">
        <div className="checkoutpage-cart">
          <table>
            <tbody>
            {this.props.cart.map((item) => {
              const product = item.product;
              return (
                <tr key={item.sku}>
                  <td>
                    {product.inCart} x {product.name}
                  </td>
                  <td>=</td>
                  <td>
                    {Number(product.inCart * product.price).toLocaleString(
                      "hu"
                    )}{" "}
                    Ft
                  </td>
                </tr>
              );
            })}
            <tr>&nbsp;</tr>
            <tr>
              <td>Total</td>
              <td>=</td>
              <td>{Number(this.props.totalPrice).toLocaleString("hu")} Ft</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="checkoutpage-form">
            <form ref={this.form}>
                <label>Name</label><input name='name'  value={this.state.name} onChange={this.handleInputChange}></input><br/>
                <label>Email</label><input name='email'  value={this.state.email} onChange={this.handleInputChange}></input><br/>
                <label>Address</label><input name='address'  value={this.state.address} onChange={this.handleInputChange}></input><br/>
                <Button onClick={this.handleSubmit} text={'Order'} icon={'fas fa-at'}/>
            </form>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,{emptyCart})(CheckoutPage);
