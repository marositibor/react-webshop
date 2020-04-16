import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Products from './component/Products';
import ProductView from './component/ProductView';

// import AboutPage from './01components/AboutPage';
// import BlogPosts from './01components/BlogPosts';
// import OnePost from './01components/OnePost';
export default class App extends React.Component {
  render() {
    return (<BrowserRouter>
      <div>
        <div>
          <p>Webshop</p>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          Shopping Cart
        </div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/product/:id" component={ProductView}/>

          <Route path="/products">
            {/* <BlogPosts /> */}
          </Route>
          <Route path="/">
            {/* s<HomePage /> */}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>)
  }
}
