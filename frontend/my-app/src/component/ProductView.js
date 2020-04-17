import React from 'react';
import ProductImages from './ProductImages'
import '../App.css';

export default class ProductView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data : {},
            dataLoaded: false
        }
    }

    async componentDidMount(){
        const response = await fetch('http://localhost:3050/products/'+this.props.match.params.id);
        const data = await response.json();
        this.setState({data:  data,dataLoaded: true})
    }

    render(){
        if(this.state.dataLoaded)
        {const specs = this.state.data.specs;
        return (
           
            <div className='Inline-block'>
                <ProductImages imgUrl={this.state.data.image}/>
                <div>
                     Product name: {this.state.data.name} 
                    <button>Add to cart</button>
                </div>
                <div>
                    {this.state.data.qty}
                    Price: EUR 100000 
                </div>
                <div>
                    {this.state.data.qty ? "in stock" : "out of stock"}
                </div>
                <div>
                    <table>
                        <tbody>
                    {Object.keys(specs).map((keyName,keyIndex)=>{
                        return <tr key={keyIndex}><td>{keyName}</td><td>{specs[keyName]}</td></tr>
                    })}
                    </tbody>
                    </table>
                </div>
            <div>
                Recommended products
            </div>
            </div>
    
       )}
       return <div/>
    }

}