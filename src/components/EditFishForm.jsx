import React, { Component } from "react";
import PropTypes from "prop-types";

class EditFishForm extends Component {
  static propTypes = {
    index: PropTypes.string.isRequired,
    fish: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      desc: PropTypes.string.isRequired,
    }).isRequired,
    updateFish: PropTypes.func.isRequired,
  };
  state = {};
  handleChange = event => {
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    this.props.updateFish(this.props.index, updatedFish);
  };
  render() {
    return (
      <div className="fish-edit">
        <input
          onChange={this.handleChange}
          type="text"
          defaultValue={this.props.fish.name}
          name="name"
          required
        />
        <input
          onChange={this.handleChange}
          type="text"
          defaultValue={this.props.fish.price}
          name="price"
          required
        />
        <select type="text" name="status" required>
          <option value="available"> Fresh</option>
          <option value="unavailable"> Sold Out! </option>
        </select>
        <textarea
          type="text"
          defaultValue={this.props.fish.desc}
          name="desc"
          required
        />
        <input
          onChange={this.handleChange}
          type="text"
          name="image"
          defaultValue="image"
          required
        />
        <button
          onClick={() => {
            this.props.deleteFish(this.props.index);
          }}
        >
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
