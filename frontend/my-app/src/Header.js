import React from 'react';
import logo from './logo.svg';
import './App.css';
import Cart from './Cart'

function MenuItem(props){
  return (
    <a href="#">{props.menu}</a>
  )
}

function Header() {
  return (
    <div className='App' >
          <div>
            <p> Webshop </p>
            <MenuItem menu='Home'/>
            <MenuItem menu='Products'/>
            <MenuItem menu='Orders'/>
          </div>
          <div>
            
          </div>
    
    </div>
  );
}

export default Header;