import React, { Component } from 'react';
import './App.css';
import LayoutContainer from "./LayoutContainer";

const apiUrl = (() =>
  process.env.REACT_APP_API_URL ||  new Error("REACT_APP_API_URL not defined!"))();

class App extends Component {
  render() {
    return (
      <LayoutContainer apiUrl={apiUrl} />
    )
  }
}

export default App;
