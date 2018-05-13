import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Transition,
  TransitionGroup,
  CSSTransition,
} from "react-transition-group";

import { formatPrice } from "../helpers";

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    deleteFromOrder: PropTypes.func.isRequired,
  };
  state = {};
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && this.props.fishes[key].status === "available";
    if (!fish) {
      return null;
    }
    if (!isAvailable) {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 250, exit: 250 }}
        >
          <li key={key}>
            {" "}
            Sorry {fish ? fish.name : "fish"} Not available anymore
          </li>
        </CSSTransition>
      );
    }
    if (!count) {
      return null;
    }
    return (
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{ enter: 500, exit: 500 }}
      >
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            :
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.deleteFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && this.props.fishes[key].status === "available";
      if (isAvailable) {
        return prevTotal + count * this.props.fishes[key].price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup component="ul" className="order">
          {/* <ul className="order"> */}
          {orderIds.map(this.renderOrder)}
          {/* </ul> */}
        </TransitionGroup>
        <div className="total">
          Total: <strong> {formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
