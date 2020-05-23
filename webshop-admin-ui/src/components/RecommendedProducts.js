import React, { Component } from "react";

export default class RecommendedProducts extends Component {
    constructor(props){
        super(props)
        this.state = {
            recommended:[],
            products:[]
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    async componentDidMount() {
        const sku = this.props.sku;
        const dataStream = await fetch(`http://localhost:3050/products/${sku}/recommended`);
        const recommended = await dataStream.json();
        const dataStreamProducts = await fetch(`http://localhost:3050/products`);
        const products = await dataStreamProducts.json();


        const productsFiltered = products.filter((prod) => {
            return !recommended.some((rec) => {
              return rec.sku === prod.sku;
            });
          });

        this.setState({recommended,products:productsFiltered});
      }

      handleSubmit(event){
        event.preventDefault()
        const sku = this.props.sku;
        const formData = new FormData(event.target)
        fetch(`http://localhost:3050/products/${sku}/recommended`,{method:'POST',body:formData})
        this.componentDidMount()
      }

      
  render() {
    return <div>
        <form onSubmit={e=>this.handleSubmit(e)}>
            <select name='rec_sku'>
                {this.state.products.map(product=>{
                    return <option value={product.sku}>{product.sku}-{product.name}</option>
                })}
            </select>
            <input type='submit'></input>
        </form>
        <table>
        <thead>
        <tr>
            <td>sku</td>
            <td>name</td>
        </tr>
            </thead>
        <tbody>
        {this.state.recommended.map(recommended=>{
            return <tr><td>{recommended.sku}</td><td>
                {recommended.name}</td></tr>
        })}
        </tbody>
    </table>
    </div>;
  }
}
