import React, { Component } from 'react';
import Camera from './Camera';

class CameraList extends Component {
  render() {
    return (
      <div>
        {this.props.cameras.map(camera =>
          <Camera cameraClickEvent={this.props.cameraClickEvent} key={camera.camera_id} cameraId={camera.camera_id}/>
        )}
      </div>
    );
  }
}

export default CameraList;
