import React, { Component } from 'react';
import axios from 'axios';
import CameraList from './CameraList';
import VideoList from './VideoList';

const API = 'http://localhost:8080';

class LayoutContainer extends Component {
  constructor() {
    super();
    this.api = API;
    this.state = { cameras: [], activeCamera: null, videos: [] };
  }

  async componentWillMount() {
    const cameras = await axios.get(`${this.api}/cameras`);
    console.log('cameras! ', cameras.data);
    this.setState({ cameras: cameras.data.result });
  }

  selectCamera = async(cameraId) => {
    const videos = await axios.get(`${this.api}/cameras/${cameraId}/videos?from=1`);
    console.log('videos! ', videos.data);
    this.setState({ activeCamera: cameraId, videos: videos.data.result });
  }

  render() {
    return (
      <div>
        <CameraList cameras={this.state.cameras} cameraClickEvent={this.selectCamera}/>
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

export default LayoutContainer;
