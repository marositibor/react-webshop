import React from "react";
import Button from "./Button";
import "./ImageGallery.css";
export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      mainImage: "",
      showImages: [],
    };
    this.setMainImage = this.setMainImage.bind(this);
    this.previousImage = this.previousImage.bind(this);
    this.nextImage = this.nextImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      images: [...this.props.images],
      mainImage: this.props.images[0],
      showImages: [...this.props.images].slice(0, 3),
    });
  }

  componentDidUpdate(prevProps) {
  if(this.props.images[0] !== prevProps.images[0])
    {this.setState({
      images: [...this.props.images],
      mainImage: this.props.images[0],
      showImages: [...this.props.images].slice(0, 3),
    });}
  } 

  setMainImage(num) {
    this.setState((state) => ({ mainImage: state.images[num] }));
  }

  nextImage() {
    const newImages = [...this.state.images];
    const firstImage = newImages.shift();
    newImages.push(firstImage);
    this.setState((state) => ({
      images: newImages,
      showImages: newImages.slice(0, 3),
    }));
  }

  previousImage() {
    const newImages = [...this.state.images];
    const firstImage = newImages.pop();
    newImages.unshift(firstImage);
    this.setState((state) => ({
      images: newImages,
      showImages: newImages.slice(0, 3),
    }));
  }

  render() {
    return (
      <div className="ImageGallery">
        <div className="main-image">
          <img src={process.env.REACT_APP_BACKEND_URL+'/'+this.state.mainImage} alt="" />
        </div>
        <div className="image-roll">
          {this.state.images.length > 3 && (
            <Button onClick={this.previousImage} icon="fas fa-arrow-left" />
          )}
          {this.state.showImages.map((src, i) => (
            <div
              className={this.state.mainImage === src ? "active" : ""}
              key={i}
              onClick={() => this.setMainImage(i)}
            >
              <img src={process.env.REACT_APP_BACKEND_URL+'/'+src} alt="" />
            </div>
          ))}
          {this.state.images.length > 3 && (
            <Button onClick={this.nextImage} icon="fas fa-arrow-right" />
          )}
        </div>
      </div>
    );
  }
}
