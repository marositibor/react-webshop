import React from 'react';
import ProductBox from './ProductBox'
import '../App.css';

class ProductImages extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            activeImg: 0,
            images: [this.props.image, this.props.image, this.props.image, this.props.image]
        };
        this.setActiveImage = this.setActiveImage.bind(this)
      
    }

    ShowNextImage(nextImage){
        this.setState({activeImg: nextImage})
    }

    setActiveImage(num){
        this.setState({activeImg: num})
    }

    render() {
        const {activeImg, images} = this.state;
        const activeSrc = images[activeImg];
        return(
            <div>
                <div>
                    <img src={activeSrc}></img>
                </div>
                <div>
                    <button>Prev</button>
                    {images.map((src, i) => (
                        <div key={i} onClick={() => this.setActiveImage(i)}>
                            <img src={src} />
                        </div>
                    ))}
                    <button onClick={this.ShowNextImage}>Next</button>
                </div>
            </div>
           

        )
    }
}

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
            <div className='Inline-block'>
                <ProductImages img={this.state.data.image}/>
                <div>
                     Product name: {this.state.data.name} 
                    <button>Add to cart</button>
                </div>
                <div>
                    Price: EUR 100000 
                </div>
                <div>
                    {this.state.data.shortSpecs}
                </div>

            </div>
            <div>
                {this.state.data.shortSpecs}
            </div>
            <div>
                Recommended products
            </div>
            
            
         
        </div>
    
       )
    }

}