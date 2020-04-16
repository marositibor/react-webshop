import React from 'react';
import ProductBox from './ProductBox'

export default class ProductView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data : {}
        }
    }

    async componentDidMount(){
        const response = await fetch('http://localhost:3050/products/'+this.props.match.params.id);
        const data = await response.json();
        this.setState({data: await data})
    }

    render(){

        return (
            
           

        <div>
            <img src={this.state.data.image}>
            </img>
            {this.state.data.name}
            {this.state.data.shortSpecs}
         
        </div>
    
       )
    }

}