import React, { Component } from "react";
import StickyList from "../components/StickyList";

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="contentarea">
        <StickyList searchText={this.props.searchText} />
      </div>
    );
  }
}

export default Home;
