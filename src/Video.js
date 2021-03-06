import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props);

    this.displayDate = new Date(this.props.video.start);
  }

  formatDate = (date) => {
    const options = {
      weekday: "long", year: "numeric", month: "short",
      day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    return date.toLocaleTimeString("en-US", options);
  }

  render() {
    return (
      <div>
        <p>{new Date(this.props.video.start).toString()}</p>
        <video width={this.props.video.width}
               height={this.props.video.height}
               preload="none"
               poster=""
               controls>
          <source src={this.props.video.url} type="video/mp4"></source>
        </video>
        {this.props.detections.map(it => <p key={it}>{it}</p>)}
      </div>
    )
  }
}

export default Video;
