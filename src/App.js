import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom"
import './App.css';
import Home from "./Components/home"
import Navbar from "./Components/navbar"
import Register from "./Components/register"
import { Link } from "react-router-dom"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/Register" component={Register} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
