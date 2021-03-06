import React, { Component } from 'react';
import axios from 'axios';
import CameraList from './CameraList';
import VideoList from './VideoList';

const handleApiError = (e) => {
  if (!e.status) {
    console.error(`Network error: ${e}`);
  } else {
    console.error("Error: ", e);
  }
  return {apiError: true};
}

const nMinsAgo = (n) => {
  const t = new Date();
  return t.setMinutes(t.getMinutes() - n);
};

class LayoutContainer extends Component {
  constructor(props) {
    super(props);
    this.api = this.props.apiUrl;
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
                    cameraClickEvent={this.selectCamera}/>
        <VideoList videos={this.state.videos}
                   detections={this.state.detections}/>
      </div>
    );
  }
}

export default LayoutContainer;
