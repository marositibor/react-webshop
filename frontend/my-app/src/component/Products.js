import React from 'react';
import ProductBox from './ProductBox'

export default class Products extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data : []
        }
    }

    async componentDidMount(){
        const response = await fetch('http://localhost:3050/products');
        const data = await response.json();
        this.setState({data: await data})
    }

    render(){

        return (
            this.state.data.map((singleData, key)=> {
                return <ProductBox data={singleData} key={key}/>
            })
 
        )
    }

}