import React, { Component } from 'react';
import axios from 'axios';
import CameraList from './CameraList';
import VideoList from './VideoList';

const API = 'http://localhost:8080';

const handleApiError = (e) => {
  if (!e.status) {
    console.error(`Network error: ${e}`);
  } else {
    console.error("Error: ", e);
  }
  return {apiError: true};
}

class LayoutContainer extends Component {
  constructor() {
    super();
    this.api = API;
    this.state = {
      cameras: [],
      activeCamera: null,
      videos: [],
      detections: [],
      apiError: false,
      fromTime: 1 };
  }

  async componentWillMount() {
    let route = `${this.api}/cameras`;
    try {
      const cameras = await axios.get(route);
      console.log('cameras! ', cameras.data);
      this.setState({
        cameras: cameras.data.result,
        apiError: false });
    } catch(e) {
      this.setState(handleApiError(e));
    }

  }

  selectCamera = async(cameraId) => {
    let videoRoute = `${this.api}/cameras/${cameraId}/videos?from=${this.state.fromTime}`;
    let detectionRoute = `${this.api}/cameras/${cameraId}/detections?from=${this.state.fromTime}`;
    try {
      const [ videos, detections ] = await Promise.all(
        [ axios.get(videoRoute), axios.get(detectionRoute) ]);
      console.log('videos! ', videos.data);
      console.log('detections! ', detections.data);
      this.setState({
        activeCamera: cameraId,
        videos: videos.data.result,
        detections: detections.data.result,
        apiError: false });
    } catch (e) {
      this.setState(handleApiError(e));
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
        <CameraList cameras={this.state.cameras}
                    detections={this.state.detections}
                    cameraClickEvent={this.selectCamera}/>
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

export default LayoutContainer;
