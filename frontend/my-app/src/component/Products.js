import React from 'react';
import ProductBox from './ProductBox'

const data =  {
    "name": "Cipofuzo",
    "shortSpecs": "30 cm rozsaszin",
    "image": "http://localhost:3050/img/shoelaces.jpg",
    "qty": 10,
    "url": "http://localhost:3050/products/1"
  }

export default class Products extends React.Component {

    render(){
        return (
            <ProductBox data={data}/>
 
        )
    }

}