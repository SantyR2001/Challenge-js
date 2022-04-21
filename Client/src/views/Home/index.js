import React, { Component } from "react";
import Nav from "./Nav";
import ItemList from "./ItemList";
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <Nav />
        </div>
        <div>
          <ItemList />
        </div>
      </div>
    );
  }
}

export default Home;
