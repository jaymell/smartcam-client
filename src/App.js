import React, { Component } from 'react';
import './App.css';
import LayoutContainer from "./LayoutContainer";

/*
<App>
  <LayoutContainer>
    <CameraList>
    <VideoList>
  </LayoutContainer>
</App>
*/

class App extends Component {
  render() {
    return (<LayoutContainer/>)
  }
}

export default App;
