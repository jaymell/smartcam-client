import { nMinsAgo } from '../src/LayoutContainer.js';
import * as assert from 'assert';
import 'babel-polyfill';

// allow for slight variance in time:
const almostEqualTime = (a,b) => Math.abs(a - b ) < 100 ? true : false;

describe('nMinsAgo', () => {
  it('should return expected time if no date param passed', () => {
    const diffMins = 5;
    const t = new Date();
    const expected = t.setMinutes(t.getMinutes() - diffMins);
    const actual = nMinsAgo(diffMins);
    assert.equal(true, (almostEqualTime(expected, actual)));
  });

  it('should return expected time if date object is passed', () => {
    const diffMins = 5;
    const t = new Date('10 06 2014');
    const actual = nMinsAgo(diffMins, t);
    const expected = t.setMinutes(t.getMinutes() - diffMins);
    assert.deepEqual(expected, actual)
  });
});

