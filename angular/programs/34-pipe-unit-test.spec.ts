import {InitialsPipe} from './03-custom-pipe';

describe('InitialsPipe', () => {
  it('returns initials', () => {
    const pipe = new InitialsPipe();

    expect(pipe.transform('sumit patel')).toBe('SP');
  });
});

