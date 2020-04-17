import React from 'react';


export default class ProductImages extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            activeImg: 1,
            images:[1,2,3,4]
        };
        this.setActiveImage = this.setActiveImage.bind(this)
        this.ShowNextImage = this.ShowNextImage.bind(this)
        this.ShowPreviousImage = this.ShowPreviousImage.bind(this)
      
    }

    ShowNextImage(){
        if(this.state.activeImg !== this.state.images.length) this.setState(state=>{return{activeImg: state.activeImg+1}})
    }

    ShowPreviousImage(){
        if(this.state.activeImg > 1) this.setState(state=>{return{activeImg: state.activeImg-1}})
    }

    setActiveImage(num){
        this.setState({activeImg: num})
    }

    render() {
        const {activeImg, images} = this.state;
        return(
            <div>
                <div>
                    <img style={{width: '400px', height: '400px', objectFit: "contain"}} src={this.props.imgUrl+`/${activeImg}.jpg`} alt={""}/>
                </div>
                <div>
                    <button onClick={this.ShowPreviousImage}>Prev</button>
                    {images.map((src, i) => (
                            <img key={i} onClick={() => this.setActiveImage(i+1)} style={{width: '200px', height: '200px', objectFit: "contain"}} src={this.props.imgUrl+`/${i+1}.jpg`} alt={""} />
                    ))}
                    <button onClick={this.ShowNextImage}>Next</button>
                </div>
            </div>
           

        )
    }
}