import React from 'react'
import {
    Link
  } from "react-router-dom";


export default class ProductBox extends React.Component {
    render(){
        return(
            <div>
                <img style={{width: '200px', height: '200px', objectFit: "contain"}} src={this.props.data.image+"/1.jpg"} alt={""}>
                </img><br/>
                <Link to={'/product/'+this.props.data.id}>{this.props.data.name}</Link><br/>
                {this.props.data.shortSpecs}<br/>
              
            </div>
        )
    }
}