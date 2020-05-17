import React, { Component } from "react";
import ProductBox from "./ProductBox";
import Button from "./Button";
import "./RecommendedProducts.css";

export default class RecommendedProducts extends Component {
  constructor(props){
    super(props);
    this.state={
      firstProduct: 0,
      products : [...props.products]
    };
    this.previousProduct = this.previousProduct.bind(this);
    this.nextProduct = this.nextProduct.bind(this);
  }

  componentDidUpdate(prevProps){
    if(this.props.products !== prevProps.products){
      this.setState({
        firstProduct: 0,
        products : [...this.props.products]
      })
    }
  }
  
  setFirstProduct(num) {
    this.setState({ firstProduct: num });
  }

  previousProduct(){
    if(this.state.firstProduct-1 <= -1){
      this.setFirstProduct(this.state.products.length-5)
      return
    }
    this.setFirstProduct(this.state.firstProduct-1)
  }

  nextProduct(){
    if(this.state.firstProduct+1 >= this.state.products.length-4){
      this.setFirstProduct(0)
      return
    }
    this.setFirstProduct(this.state.firstProduct+1)
  }

  render() {
    return (
      <div className='recommended'>
        <Button onClick={this.previousProduct} icon="fas fa-arrow-left" disabled={this.state.products.length<6}/>
      <div className="recommended-container">
        {this.props.products.map((product) => (
          <ProductBox
            key={product.sku}
            {...product}
            style={{position:'relative', left:`${-20*this.state.firstProduct}%`, transition: 'left 1s'}}
          />
        ))}
      </div>
      <Button onClick={this.nextProduct} icon="fas fa-arrow-right" disabled={this.state.products.length<6}/>
      </div>
    );
  }
}