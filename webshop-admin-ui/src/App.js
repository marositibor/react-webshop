import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import UploadProductForm from './components/UploadProductForm';
import ProductList from './components/ProductList';
import UpdateProductView from './components/UpdateProductView';

export default class App extends React.Component {
  render() {
    return (<BrowserRouter>
      <div className='App'>
        <div className='App-header'>
          <div className='App-nav'>
                  <NavLink exact to="/" 
                  activeStyle={{
                    fontWeight: 'bold',
                  }}>Dashboard</NavLink>

                  <NavLink to="/products"
                  activeStyle={{
                    fontWeight: 'bold',
                  }}
                  >Products</NavLink>

                  <NavLink to="/upload-product"
                  activeStyle={{
                    fontWeight: 'bold',
                  }}
                  >Upload Product</NavLink>
          </div>
          <div>Header</div>
        </div>
        <Switch>
          <Route exact path="/products">
            <ProductList/>
          </Route>
          <Route path="/products/:sku" component={UpdateProductView}>
            
          </Route>
          <Route path="/upload-product">
            <UploadProductForm />
          </Route>
          <Route path="/">
            <Dashboard /> 
          </Route>
        </Switch>
      </div>
    </BrowserRouter>)
  }

}
