import React, { Component } from 'react';
import Video from './Video';
import { filter, flatten, uniq, map } from 'lodash';

export const combine = (videos, detections) =>
  videos.map(v => (
    {
      video: v,
      detections: uniq(flatten(map(filter(detections, d => d.time >= v.start && d.time <= v.end), it => it.detections)))
    }));

class VideoList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.videos.length === 0) {
      return (
       <div><p>Click on a camera to see some videos.</p></div>
      );
    }

    let combined = combine(this.props.videos, this.props.detections);
    console.log('combined: ', combined);

    return (
      <div>
        {combined.map(it =>
          <Video key={it.video.start}
                 video={it.video}
                 detections={it.detections}
          />
        )}
      </div>
    );
  }
}

export default VideoList;
