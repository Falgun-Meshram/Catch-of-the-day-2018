import React, { Component } from "react";
import PropTypes from "prop-types";

import { getFunName } from "../helpers";

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  state = {};

  storeInput = React.createRef();

  goToStore = e => {
    e.preventDefault();
    const storeName = this.storeInput.value.value;

    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <React.Fragment>
        <form action="" className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter your store name</h2>
          <input
            type="text"
            ref={this.storeInput}
            placeholder="Store"
            required="true"
            defaultValue={getFunName()}
          />
          <button type="submit">Visit Store -></button>
        </form>
      </React.Fragment>
    );
  }
}

export default StorePicker;
