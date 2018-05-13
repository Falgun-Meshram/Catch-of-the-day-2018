import React, { Component } from "react";
import PropTypes from "prop-types";

import StorePicker from "./StorePicker";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import base from "../base";
import sampleFishes from "../sample-fishes";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };
  state = {
    fishes: {},
    order: {},
  };
  componentDidMount = () => {
    const { params } = this.props.match;
    const localStorageRef = JSON.parse(localStorage.getItem(params.storeId));
    if (localStorageRef) {
      this.setState({
        order: localStorageRef,
      });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  };

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    const fishes = { ...this.state.fishes };
    fishes[`fish${Date.now()}`] = fish;
    this.setState({
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };

    fishes[key] = updatedFish;

    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = { ...this.state.fishes };

    fishes[key] = null;

    this.setState({ fishes });
  };

  addToOrder = key => {
    const order = { ...this.state.order };

    order[key] = order[key] + 1 || 1;

    this.setState({ order });
  };

  deleteFromOrder = key => {
    const order = { ...this.state.order };

    order[key] = null;

    this.setState({ order });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="sample-fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                addToOrder={this.addToOrder}
                details={this.state.fishes[key]}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
