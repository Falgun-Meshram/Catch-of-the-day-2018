import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
  };
  state = {
    uid: null,
    owner: null,
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);

      this.authHandler(user);
    });
  };

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this });
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    console.log(authData);

    this.setState({
      uid: authData.user ? authData.user.uid : authData.uid,
      owner: authData.user ? authData.user.uid : authData.uid || store.owner,
    });
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();

    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    const logout = <button onClick={this.logout}> Log Out! </button>;
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner of the store</p>
          {logout}
        </div>
      );
    }
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
            key={key}
            index={key}
            fish={this.props.fishes[key]}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>Load Samples</button>
      </div>
    );
  }
}

export default Inventory;
