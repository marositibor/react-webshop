import React from 'react'



export default class ProductBox extends React.Component {
    render(){
        return(
            <div>
                <img src={this.props.data.image}>
                </img>
                {this.props.data.name}
                {this.props.data.shortSpecs}
              
            </div>
        )
    }
}