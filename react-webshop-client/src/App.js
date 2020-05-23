import React from "react";
import Header from "./components/Header";
import ProductBoxContainer from './components/ProductBoxContainer'
import ProductPage from './components/ProductPage'
import CheckoutPage from './components/CheckoutPage'
import CartPage from './components/CartPage'
import Carousel from './components/Carousel'
import "./styles.css";
import {fetchProducts} from './redux/actions'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from "react-redux";


function mapStateToProps(state){
  const {products} = state;
  return {products}
}


class App extends React.Component{

  constructor(props){
    super(props)
    fetch(process.env.REACT_APP_BACKEND_URL+'/products').then(resp=>resp.json()).then(products=>this.props.fetchProducts(products)) 
  }

  render() {
    
    if(this.props.products.length === 0){
      return (<></>)
    }
    return (
    <Router>
      <header><Header/></header>
      <main>
  <Switch>
    <Route path="/product/:sku" component={ProductPage}/>
    <Route path="/cart" component={CartPage}/>
    <Route path="/checkout" component={CheckoutPage}/>
    <Route path="/">
      <Carousel/>
      <ProductBoxContainer/>
    </Route>
  </Switch>
  </main>
  <footer>
  </footer>
</Router>
  );}
}

export default connect(mapStateToProps,{fetchProducts})(App)