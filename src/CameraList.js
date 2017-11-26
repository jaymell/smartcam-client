import React, { Component } from 'react';
import Camera from './Camera';

class CameraList extends Component {
  render() {
    return (
      <div>
        <p>{this.props.detections}</p>
        {this.props.cameras.map(camera =>
          <Camera cameraClickEvent={this.props.cameraClickEvent}
                  key={camera.camera_id}
                  cameraId={camera.camera_id}
          />
        )}
      </div>
    );
  }
}

export default CameraList;
