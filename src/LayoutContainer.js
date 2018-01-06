import React, { Component } from 'react';
import axios from 'axios';
import CameraList from './CameraList';
import VideoList from './VideoList';
import { isUndefined, concat } from 'lodash';


const handleApiError = (e) => {
  if (!e.status) {
    console.error(`Network error: ${e}`);
  } else {
    console.error("Error: ", e);
  }
  return {apiError: true};
};

export const nMinsAgo = (n, date) => {
  const t = isUndefined(date) ? new Date() : new Date(date.getTime());
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
      fromTime: nMinsAgo(500),
      toTime: nMinsAgo(0) };
  }

  async getCameraData(cameraId) {
    let videoRoute = `${this.api}/cameras/${cameraId}/videos?from=${this.state.fromTime}&to=${this.state.toTime}`;
    let detectionRoute = `${this.api}/cameras/${cameraId}/detections?from=${this.state.fromTime}&to=${this.state.toTime}`;
    try {
      const [ videos, detections ] = await Promise.all(
        [ axios.get(videoRoute), axios.get(detectionRoute) ]);
      console.log('videos! ', videos.data);
      console.log('detections! ', detections.data);
      this.setState({
        activeCamera: cameraId,
        videos: concat(this.state.videos, videos.data.result),
        detections: concat(this.state.detections, detections.data.result),
        apiError: false });
    } catch (e) {
      this.setState(handleApiError(e));
    }
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

  selectCamera = cameraId => {
    return this.getCameraData(cameraId);
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
