import React, { Component } from "react";

import {connect} from 'react-redux'
import ProductBox from "./ProductBox";
import {getProductsWithInCartData} from "../redux/selectors";
import "./ProductBoxContainer.css";


function mapStateToProps(state,ownProps){
  if(ownProps.products){
    return {products:ownProps.products}
  }
  return {products:getProductsWithInCartData(state)} //returning new array to always re-render(connect checks for shallow equality of returned value to determine re-render)
}

class ProductBoxContainer extends Component {
  render() {
    return (
      <div className="productbox-container">
        {this.props.products.map((product) => (
          <ProductBox
            key={product.sku}
            {...product}
          />
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProductBoxContainer)