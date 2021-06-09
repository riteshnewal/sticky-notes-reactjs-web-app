import React, { Component } from "react";
import { Provider } from "react-redux";
import Store from "./store/Store";
import Home from "./screens/Home";
import Header from "./screens/Header";
import { PersistGate } from "redux-persist/integration/react";
class App extends Component {
  state = {
    uilabels: {},
    searchText: "",
  };

  onSearch = (e) => {
    var searchText = e.target.value.toLowerCase();
    this.setState({
      searchText: searchText,
    });
  };

  render() {
    return (
      <div className="App">
        <Provider store={Store.store}>
          <PersistGate loading={null} persistor={Store.persistor}>
            <Header title="Sticky Notes" onSearch={this.onSearch} />
            <Home searchText={this.state.searchText} />
            {/* Not Added Routes as it is single Page App
           but Route class available if required */}
          </PersistGate>
        </Provider>
      </div>
    );
  }
}

export default App;
