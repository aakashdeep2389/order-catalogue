import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AdminScreen from "./screens/AdminScreen";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
            <header>
              <div className="container">
                <div className="header-inner ">
                  <Link to="/">Applicate Ai Cart</Link>
                  <Link to="/order-list">Order List</Link>
                </div>
              </div>
            </header>
            <main>
              <Route path="/order-list" component={AdminScreen} />
              <Route path="/" component={HomeScreen} exact />
            </main>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
