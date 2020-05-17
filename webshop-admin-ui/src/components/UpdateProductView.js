import React, {Component} from 'react';

import UpdateProductForm from './UpdateProductForm';
import ImageTable from './ImageTable';
import DeleteProductModal from './DeleteProductModal';


export default class UpdateProductView extends Component {

  constructor(props){
    super(props)
    this.state = {
      modalActive : false
    }
    this.handleCancel = this.handleCancel.bind(this)
  }



  handleDelete(){
    this.setState({modalActive: true})
  }

  handleCancel(){
    this.setState({modalActive: false})
  }

  render() {
    const sku = this.props.match.params.sku;
    return (
      <div>
        <UpdateProductForm sku={sku} />
        <ImageTable sku={sku} />
        <DeleteProductModal sku={sku} isActive={this.state.modalActive} handleCancel={this.handleCancel}/>
        <button onClick={this.handleDelete.bind(this)}>Delete Product</button>
      </div>
    )
  }
} 