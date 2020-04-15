import { isClient, getUpVoteCount } from '../util';

describe('getUpVoteCount function', () => {
  it('works correctly', () => {
    const count = getUpVoteCount('334334');
    expect(count).toEqual(0);
  });
});