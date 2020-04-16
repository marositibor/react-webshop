import React from 'react'
import {
    BrowserRouter,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default class ProductBox extends React.Component {
    render(){
        return(
            <div>
                <img style={{height: '100px'}} src={this.props.data.image+"/1.jpg"}>
                </img>
                {this.props.data.name}
                {this.props.data.shortSpecs}
                <Link to={'/product/'+this.props.data.id}>{this.props.data.name}</Link>
              
            </div>
        )
    }
}