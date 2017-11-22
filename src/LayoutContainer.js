import React, { Component } from 'react';
import axios from 'axios';
import CameraList from './CameraList';

const API = 'http://localhost:8080';

class LayoutContainer extends Component {
  constructor() {
    super();
    this.api = API;
    this.state = { cameras: [] };
  }
  async componentWillMount() {
    const cameras = await axios.get(`${this.api}/cameras`);
    console.log('cameras! ', cameras.data);
    this.setState({ cameras: cameras.data.result });
  }

  render() {
    return (
      <CameraList cameras={this.state.cameras} />
    );
  }
}

export default LayoutContainer;
