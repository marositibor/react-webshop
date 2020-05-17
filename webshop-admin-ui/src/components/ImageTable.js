import React, {Component} from 'react';

export default class ImageTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    }
  }

  async componentDidMount() {
    const sku = this.props.sku;
    const dataStream = await fetch(`http://localhost:3050/products/${sku}/images`);
    const images = await dataStream.json();
    this.setState({images});

    /* {
    "id": 1,
    "file": "MP2-0.jpg",
    "product_sku": "MP2",
    "is_primary": 1
  }*/ 
  }

    handleClickPrimary = async (id) => {
    const dataStream = await fetch(`http://localhost:3050/files/${id}`,{method: "put"});
    if(dataStream.ok){

        const newImages = this.state.images.map((img)=>{
            img.is_primary = 0;
            return img
        })

        newImages.map((img)=>{
            if(img.id === id){
                img.is_primary = 1;
                return img
            }
            return img
        })
        this.setState({images : newImages})
    }
    }

    handleClickDelete = async (id) => {
    const dataStream = await fetch(`http://localhost:3050/files/${id}`,{method: "delete"});
    if(dataStream.ok){
        const remainingImgs = this.state.images.filter((img)=>img.id!==id);
        if(!remainingImgs.find(img => img.is_primary === 1)) {
          remainingImgs[0].is_primary = 1;
        }
        this.setState({images : remainingImgs})
    }
    }

     handleSubmit = async (e) =>{
      e.preventDefault();
      const sku = this.props.sku;

      const response = await fetch(`http://localhost:3050/products/${sku}/files`,{
          method: "post",
          body: new FormData(e.target)
      })

      if(response.ok){
        const dataStream = await fetch(`http://localhost:3050/products/${sku}/images`);
        const images = await dataStream.json();
        this.setState({images});
      }

  }

  render() {
    return (
      <>
        <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Path</th>
            <th>URL</th>
            <th>Operations</th>
          </tr>
          </thead>
          <tbody>
            {this.state.images.map((image, index) => {
                return (<tr style={{background: image.is_primary ? "green" : "white"}} key={image.id}>
                    <td>
                    <img className="img-thumbnail" alt="" src={"http://localhost:3050/" + image.file} />
                    </td>
                    <td>
                    {"http://localhost:3050/"}
                    </td>
                    <td>
                    {"http://localhost:3050/" + image.file}
                    </td>
                    <td>
                        <button onClick={()=>this.handleClickPrimary(image.id)}>Primary</button>
                        <button onClick={()=>this.handleClickDelete(image.id)}>Delete</button>
                    </td>
                </tr>)
            })}
          </tbody>
        </table>
        <form onSubmit={e => this.handleSubmit(e)}>
                <div>
                    <div>Images</div>
                    <input type="file" id="images" name="images" multiple="multiple"></input>
                </div>
                <input type="submit"/>
            </form>
      </>
    )
  }
}