import React, {Component} from 'react'

export default class UploadProductForm extends Component{

    constructor(props){
        super(props)
        this.state = { 
            validationErrors: {
                "Price" : "",
                "Name" : "",
                "Specs" : "",
                "Stock" : "",
                "Warning at" :""

            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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

    stockCheck(value){
        if(value < 0){
            const newsState = this.state;
            newsState.validationErrors["Stock"] = "must be positive ";
            this.setState(newsState)
            return false
        } else {
            const newsState = this.state;
            newsState.validationErrors["Stock"] = "";
            this.setState(newsState)
            return true
        }
    }

    warningAtCheck(value){
        if(value < 0){
            const newsState = this.state;
            newsState.validationErrors["Warning at"] = "must be positive ";
            this.setState(newsState)
            return false
        } else {
            const newsState = this.state;
            newsState.validationErrors["Warning at"] = "";
            this.setState(newsState)
            return true
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.nameCheck(e.target[1].value)
        this.priceCheck(e.target[2].value)
        this.stockCheck(e.target[3].value)
        this.warningAtCheck(e.target[4].value)
        this.specsCheck(e.target[6].value)

        const isValid = this.nameCheck(e.target[1].value) && this.priceCheck(e.target[2].value) && this.stockCheck(e.target[3].value) && this.warningAtCheck(e.target[4].value) &&  this.specsCheck(e.target[6].value)
        
        if(!isValid){
            console.log("hiba")
            //e.preventDefault();
            return
        }

        fetch("http://localhost:3050/product",{
            method: "post",
            body: new FormData(e.target)
        })


    }

    render(){
        return(
            <form action="http://localhost:3050/product" encType="multipart/form-data" method="post" onSubmit={e => this.handleSubmit(e)}>
                <div className="inputfield">
                    <label htmlFor="sku">SKU</label>
                    <input id="sku" name="sku" type="text"></input>
                    </div>
                    <div className="inputfield">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" ></input>
                    </div>
                    <div className="inputfield">
                    <label htmlFor="price">Price</label>
                    <input id="price" name="price" type="text"></input>
                </div>
                <div className="inputfield">
                    <label htmlFor="stock">Stock</label>
                    <input id="stock" name="stock" type="number"></input>
                </div>
                <div className="inputfield">
                    <label htmlFor="warning_at">Warning at</label>
                    <input id="warning_at" name="warning_at" type="number"></input>
                </div>
                <div className="description">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <div className="specs">
                    <label htmlFor="specs">Specs</label>
                    <textarea id="specs" name="specs"></textarea>
                </div>
                <div>
                    <div>Images</div>
                    <input type="file" id="images" name="images" multiple="multiple"></input>
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