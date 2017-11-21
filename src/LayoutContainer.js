import React, { Component } from 'react';
import axios from 'axios';

const API = 'http://localhost:8080';

class LayoutContainer extends Component {
  constructor() {
    this.api = API;
  }
  async componentDidMount() {
    const cameras = await axios.get("${this.api}/cameras");
    this.setState({ cameras: cameras });
  }

  render() {
    return (
      <CameraList cameras={this.state.cameras} />
    );
  }
}

export default LayoutContainer;
