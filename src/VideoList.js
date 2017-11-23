import React, { Component } from 'react';
import Video from './Video';

class VideoList extends Component {
  render() {
    if (this.props.videos.length === 0) {
      return (
       <div><p>Click on a camera to see some videos.</p></div>
      );
    }
    return (
      <div>
        {this.props.videos.map(video =>
          <Video key={video.start} start={video.start}/>
        )}
      </div>
    );
  }
}

export default VideoList;
