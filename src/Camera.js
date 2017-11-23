import React, { Component } from 'react';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.onClick = () => this.props.cameraClickEvent(this.props.cameraId);
  }

  render() {
    return (
      <div><p onClick={this.onClick}>{this.props.cameraId}</p></div>
    )
  }
}

export default Camera;
