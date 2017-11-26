import React, { Component } from 'react';
import Video from './Video';
import filter from 'lodash/filter';

export const combine = (videos, detections) =>
  videos.map(v => (
    { video: v, detections: filter(detections, d => d.time >= v.start && d.time <= v.end)}
  ));

class VideoList extends Component {
  render() {
    console.log(combine(this.props.videos, this.props.detections));
    if (this.props.videos.length === 0) {
      return (
       <div><p>Click on a camera to see some videos.</p></div>
      );
    }
    return (
      <div>
        {this.props.videos.map(video =>
          <Video key={video.start}
                 video={video}
          />
        )}
      </div>
    );
  }
}

export default VideoList;
