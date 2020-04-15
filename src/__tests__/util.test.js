import { isClient, getUpVoteCount } from '../pages/home/util';

describe('getUpVoteCount function', () => {
  it('works correctly', () => {
    const count = getUpVoteCount('334334');
    expect(count).toEqual(0);
  });
});