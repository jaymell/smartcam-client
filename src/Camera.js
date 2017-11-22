import React, { Component } from 'react';

class Camera extends Component {
  render() {
    return (
      <div><p>{this.props.cameraId}</p></div>
    )
  }
}

export default Camera;
