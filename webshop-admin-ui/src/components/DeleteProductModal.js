import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'


export default class DeleteProductModal extends Component {
    constructor(props){
        super(props)
        this.state = {
            deleted: false
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    async handleDelete (){
       const response = await fetch(`http://localhost:3050/products/${this.props.sku}`,{method : "delete"})
       if(response.ok){
           this.setState({deleted: true})
        }
    }

    render() {
      return (

     this.props.isActive&&<>
     <div className="modal">
          Are you sure?
          <br/>
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={this.props.handleCancel}>Cancel</button>
          {this.state.deleted&&<Redirect to="/products" />}
      </div>
      <div className="modal-overlay">
      </div>
     </>


      )
    }
  } 