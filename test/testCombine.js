import { combine } from '../src/VideoList.js';
import * as assert from 'assert';

const video1 = {
  "camera_id": "1",
  "start": 1,
  "end": 5,
  "width": 640,
  "height": 480,
  "bucket": "test-bucket",
  "key": "video/1",
  "region": "us-west-2",
  "url": "https://test-signed-url"
};

const video2 = {
    "camera_id": "1",
    "start": 6,
    "end": 10,
    "width": 640,
    "height": 480,
    "bucket": "test-bucket",
    "key": "video/5",
    "region": "us-west-2",
    "url": "https://test-signed-url2"
};

const videos = [ video1, video2 ];

const detections =
  [
    {
      "camera_id": "1",
      "time": 2,
      "detections": [
        "person",
        "cow"
      ]
    },
    {
      "camera_id": "1",
      "time": 3,
      "detections": [
        "person",
        "cow",
        "chicken"
      ]
    },
    {
      "camera_id": "1",
      "time": 7,
      "detections": [
        "alpha",
        "gamma",
        "delta"
      ]
    },
    {
      "camera_id": "1",
      "time": 10,
      "detections": [
        "alpha",
        "beta"
      ]
    },
  ];

describe('combine', () => {
  it('should return object containing video and detections within video time intervals', () => {
    const expected = [
      { video: video1, detections: ["person", "cow", "chicken"] },
      { video: video2, detections: ["alpha", "gamma", "delta", "beta" ] }
    ];
    const actual = combine(videos, detections);
    console.log("ACTUAL: ", actual);
    assert.deepEqual(expected, actual);
  });
});

