import React, {Component} from 'react'

export default class UpdateProductForm extends Component{

    constructor(props){
        super(props)
        this.state = { 
            data_loaded: false,
            product_data: {},
            validationErrors: {
                "Price" : "",
                "Name" : "",
                "Specs" : ""
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount(){
        const sku = this.props.sku
        const response = await fetch(`http://localhost:3050/products/${sku}`);
        const data = await response.json();
        this.setState({ product_data: await data,data_loaded: true })
    }

    priceCheck(value){
        if(value === "" || isNaN(value)){
            const newsState = this.state;
            newsState.validationErrors["Price"] = "Invalid";
            this.setState(newsState)
            return false
        } else {
            const newsState = this.state;
            newsState.validationErrors["Price"] = "";
            this.setState(newsState)
            return true
        }
    }

    nameCheck(value){
        if(value === "" || !isNaN(value)){
            const newsState = this.state;
            newsState.validationErrors["Name"] = "Invalid";
            this.setState(newsState)
            return false
        } else {
            const newsState = this.state;
            newsState.validationErrors["Name"] = "";
            this.setState(newsState)
            return true
        }
    }

    specsCheck(value){
        if(value === ""){
            const newsState = this.state;
            newsState.validationErrors["Specs"] = "Invalid";
            this.setState(newsState)
            return false
        } else {
            const newsState = this.state;
            newsState.validationErrors["Specs"] = "";
            this.setState(newsState)
            return true
        }
    }

    handleSubmit(e){
        const sku = this.props.sku;
        e.preventDefault();
        this.nameCheck(e.target[1].value)
        this.priceCheck(e.target[2].value)
        this.specsCheck(e.target[4].value)

        const isValid = this.nameCheck(e.target[1].value) && this.priceCheck(e.target[2].value) && this.specsCheck(e.target[4].value)
        

        if(!isValid){
            console.log("hiba")
            //e.preventDefault();
            return
        }

        fetch(`http://localhost:3050/products/${sku}`,{
            method: "put",
            body: new FormData(e.target)
        })


    }

    handleChange = (evt) => {
        const tempState = {...this.state};
        tempState.product_data[evt.target.name] = evt.target.value;
        this.setState(tempState);
    }

    render(){
        return(
           this.state.data_loaded&&
            <form action="http://localhost:3050/product" encType="multipart/form-data" method="post" onSubmit={e => this.handleSubmit(e)}>
                <div className="inputfield">
                    <label htmlFor="sku">SKU</label>
                    <input id="sku" name="sku" type="text" defaultValue={this.state.product_data.sku} disabled></input>
                    </div>
                    <div className="inputfield">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" defaultValue={this.state.product_data.name} onChange={this.handleChange} ></input>
                    </div>
                    <div className="inputfield">
                    <label htmlFor="price">Price</label>
                    <input id="price" name="price" type="text" defaultValue={this.state.product_data.price} onChange={this.handleChange}></input>
                </div>
                <div className="inputfield">
                    <label htmlFor="stock">Stock</label>
                    <input id="stock" name="stock" type="number" defaultValue={this.state.product_data.stock} onChange={this.handleChange}></input>
                </div>
                <div className="inputfield">
                    <label htmlFor="warning_at">Warning at</label>
                    <input id="warning_at" name="warning_at" type="number" defaultValue={this.state.product_data.warning_at} onChange={this.handleChange}></input>
                </div>
                <div className="description">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" defaultValue={this.state.product_data.description} onChange={this.handleChange}></textarea>
                </div>
                <div className="specs">
                    <label htmlFor="specs">Specs</label>
                    <textarea id="specs" name="specs" defaultValue={this.state.product_data.specs} onChange={this.handleChange}></textarea>
                </div>
                
                <input type="submit"/>
                <ul>
                    {Object.keys(this.state.validationErrors).map((keyName,keyIndex)=>
                    {
                        return (this.state.validationErrors[keyName] ? <li style={{color: "red"}} key={keyIndex}>{keyName} : {this.state.validationErrors[keyName]}</li> : "")
                    })}
                </ul>
            </form>

        )
    }
}