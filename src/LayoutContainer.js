import React, { Component } from 'react';
import axios from 'axios';
import CameraList from './CameraList';
import VideoList from './VideoList';

const API = 'http://localhost:8080';

const handleApiError = (e, route) => {
  if (!e.status) {
    console.error(`Network error -- route: ${route}`);
  } else {
    console.error("Error: ", e);
  }
  return {apiError: true};
}

class LayoutContainer extends Component {
  constructor() {
    super();
    this.api = API;
    this.state = { cameras: [], activeCamera: null, videos: [], apiError: false };
  }

  async componentWillMount() {
    let route = `${this.api}/cameras`;
    try {
      const cameras = await axios.get(route);
      console.log('cameras! ', cameras.data);
      this.setState({ cameras: cameras.data.result });
    } catch(e) {
      this.setState(handleApiError(e, route));
    }

  }

  selectCamera = async(cameraId) => {
    let route = `${this.api}/cameras/${cameraId}/videos?from=1`;
    try {
      const videos = await axios.get(route);
      console.log('videos! ', videos.data);
      this.setState({ activeCamera: cameraId, videos: videos.data.result });
    } catch (e) {
      this.setState(handleApiError(e, route));
    }
  }

  render() {
    if (this.state.apiError === true) {
      return (
        <div><p>API ERROR -- is it running?</p></div>
      )
    }
    return (
      <div>
        <CameraList cameras={this.state.cameras} cameraClickEvent={this.selectCamera}/>
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

export default LayoutContainer;
