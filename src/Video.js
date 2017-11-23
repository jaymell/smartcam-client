import React, { Component } from 'react';

class Video extends Component {
  constructor(props) {
    super(props);

    this.displayDate = new Date(this.props.start);
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
      <div><p> "Video {this.formatDate(this.displayDate)}" </p></div>
    )
  }
}

export default Video;
