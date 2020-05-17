import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = (
            {
                product_list: []
            }
        )
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3050/products');
        const data = await response.json();
        this.setState({ product_list: await data })
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <td>
                            Main Image
                    </td>
                        <td>
                            SKU
                    </td>
                        <td>
                            Name
                    </td>
                        <td>
                            Price
                    </td>
                    <td>
                            Stock
                    </td>
                        <td>
                            Operations
                    </td>
                    </tr>
                </thead>
                <tbody>
                    {this.state.product_list.map((product, key) => {

                        const listStyle = {}
                        if(product.stock < product.warning_at){
                            listStyle.background = "yellow"
                        }
                        if(product.stock === 0){
                            listStyle.background = "red"
                        }

                        
                        return <tr key={key} style={listStyle}>
                            <td>
                                <img className="img-thumbnail" alt="" src={"http://localhost:3050/" + product.primary_image} />
                            </td>
                            <td>
                                {product.sku}
                            </td>
                            <td>
                                {product.name}
                            </td>
                            <td>
                                {product.price}
                            </td>
                            <td>
                                {product.stock ? product.stock : "Out of stock"}
                            </td>
                            <td>
                                <Link to={'/products/' + product.sku}>Edit</Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        )
    }
}