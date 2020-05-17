import React, {Component} from 'react'
import "./ProductPage.css";
import { connect } from "react-redux";
import { addCartItem, removeCartItem } from "../redux/actions";
import {getProductsWithInCartData} from "../redux/selectors";
import Button from "./Button";
import ImageGallery from "./ImageGallery";
import RecommendedProducts from './RecommendedProducts';

function mapStateToProps(state,ownProps){
    const sku = ownProps.match.params.sku
    const products = getProductsWithInCartData(state)
    const product = products.find(product => product.sku === sku)
    const images = [product.primary_image,...product.images]

    const recommended = products.filter(prod=>{return product.recommended.includes(prod.sku)})
    return {product,recommended,images}
}

class ProductPage extends Component{
    
    handleAddProduct = (cartItem) => {
        this.props.addCartItem(cartItem);
      };
    
      handleRemoveProduct = (cartItem) => {
        this.props.removeCartItem(cartItem);
      };

    render(){
    return <div className='productpage'>
        <div className='productpage-gallery'><ImageGallery mainImage={0} images={this.props.images}/></div>
        <div className='productpage-details'>
            <div className='product-name'>{this.props.product.name}</div>
            {this.props.product.stock ? <div className='product-stock'>👌 In Stock</div> : <div className='product-outstock'>😞 Out of stock</div>}
            <div className='product-description'>{this.props.product.description}</div>
            <div className='productpage-fullspecs'>
          <table className='productpage-specstable'>
            <tbody>
              {this.props.product.specs.split(/\r?\n/).map(specRow => {
                const specRowData = specRow.split('=')
                return <tr><td>{specRowData[0]}</td><td>{specRowData[1]}</td></tr>
              })}
            </tbody>
          </table>
        </div>
            <div className='product-price'>{Number(this.props.product.price).toLocaleString("hu")} Ft</div>
            {this.props.product.inCart ? (
          <div className="product-buttonbar">
            <Button onClick={() => this.handleRemoveProduct({ sku: this.props.product.sku })} icon="fas fa-minus" />
            <span className="product-incart">{this.props.product.inCart} IN CART</span>
            <Button onClick={() => this.handleAddProduct({ sku: this.props.product.sku })} icon="fas fa-plus" disabled={!this.props.product.inStock}/>
          </div>
        ) : (
          this.props.product.stock-this.props.product.inCart!==0&&<div className="product-buttonbar">
            <Button
              onClick={() => this.handleAddProduct({ sku: this.props.product.sku })}
              icon="fas fa-plus"
              text="Add to cart"
            />
          </div>
        )}            
        </div>
        <div className='productpage-recommended'>
          <div className='productpage-recommended-title'>Recommended products:</div>
          <RecommendedProducts products={this.props.recommended}/>
        </div>
    </div>
    }
}

export default connect(mapStateToProps,{ addCartItem, removeCartItem })(ProductPage)