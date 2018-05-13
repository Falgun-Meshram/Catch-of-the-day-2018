import React, { Component } from "react";
import PropTypes from "prop-types";

import { formatPrice } from "../helpers";

class Fish extends Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
    addToOrder: PropTypes.func,
  };
  state = {};
  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };
  render() {
    const { name, image, desc, price, status } = this.props.details;
    const isAvailable = status === "available";
    return (
      <React.Fragment>
        <li className="menu-fish">
          <img src={image} alt="" />
          <h3 className="fish-name">
            {name}
            <span className="price">{formatPrice(price)}</span>
          </h3>
          <p>{desc}</p>
          <button onClick={this.handleClick} disabled={!isAvailable}>
            {" "}
            {!isAvailable ? "Sold Out" : "Add to Cart"}{" "}
          </button>
        </li>
      </React.Fragment>
    );
  }
}

export default Fish;
