import React, {Component} from 'react'

export default class ImageUpload extends Component{
    
    handleSubmit = (e) =>{
        e.preventDefault();
        const sku = this.props.sku;

        fetch(`http://localhost:3050/products/${sku}/files`,{
            method: "post",
            body: new FormData(e.target)
        })
    }

    render(){
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <div>
                    <div>Images</div>
                    <input type="file" id="images" name="images" multiple="multiple"></input>
                </div>
                <input type="submit"/>
            </form>
        )
    }
}