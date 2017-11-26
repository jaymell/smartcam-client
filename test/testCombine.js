import { combine } from '../src/VideoList.js';
import * as assert from 'assert';

console.log("COMBINE: ", combine);

const videos = [ 
  { start: 1, end: 5 },
  { start: 6, end: 10 } 
];

const detections = [
  { time: 1 },
  { time: 2 },
  { time: 3 },
  { time: 5 },
  { time: 6 },
  { time: 9 },
  { time: 10 }
];

describe('combine', () => {
  it('should return object containing video and detections within video time intervals', () => {
    const expected = [
      { video: { start: 1, end: 5 }, detections: [ { time: 1}, {time: 2}, {time: 3}, {time: 5} ] },
      { video: {start: 6, end: 10 }, detections: [ { time: 6} , {time: 9}, { time: 10 }]}
    ];
    const actual = combine(videos, detections);
    console.log("ACTUAL: ", actual);
    assert.deepEqual(expected, actual);
  });
});

