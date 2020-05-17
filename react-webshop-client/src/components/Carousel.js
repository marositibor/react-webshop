import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Carousel.css";

function mapStateToProps(state) {
  const offerings = [...state.offerings];
  return { offerings }; //returning new array to always re-render(connect checks for shallow equality of returned value to determine re-render)
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
    };
    this.setActiveItem = this.setActiveItem.bind(this);
  }

  setActiveItem(num) {
    this.setState({ activeItem: num });
  }

  componentDidMount(){
    this.interval = setInterval(()=>{this.setActiveItem(this.state.activeItem+1 === this.props.offerings.length ? 0 : this.state.activeItem+1)},3000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="carousel">
        <div className="carousel-container">
          {this.props.offerings.map((offering, index) => {
            const itemStyle = {
              backgroundImage: "url(" + offering.image + ")",
              left: `${(-this.state.activeItem+index)*100}%`,
              transition: 'left 1s'
            }
            return (
              <div
                key={index}
                className="carousel-item"
                style={itemStyle}
              >
                <div className="carousel-header">{offering.header}</div>
                <div className="carousel-link-container">
                  <Link to={offering.link}>Buy now</Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="carousel-navbar">
          {this.props.offerings.map((offering, index) => (
            <div
              key={index}
              onClick={() => {
                this.setActiveItem(index);
              }}
              className={
                this.state.activeItem === index
                  ? "carousel-nav active"
                  : "carousel-nav"
              }
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Carousel);
