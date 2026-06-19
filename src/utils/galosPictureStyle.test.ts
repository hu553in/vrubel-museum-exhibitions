import getGalosPictureStyle from './galosPictureStyle';

describe('getGalosPictureStyle', () => {
  it('returns an empty object when picture size is not available', () => {
    expect(getGalosPictureStyle(undefined, { opacity: 0.5 })).toEqual({});
  });

  it('merges animation style with square size constraints when picture size is available', () => {
    expect(getGalosPictureStyle(320, { opacity: 0.5, transform: 'scale(1)' })).toEqual({
      opacity: 0.5,
      transform: 'scale(1)',
      minWidth: 320,
      minHeight: 320,
      maxWidth: 320,
      maxHeight: 320,
    });
  });

  it('keeps zero values from the animation style while adding picture sizing', () => {
    expect(getGalosPictureStyle(240, { opacity: 0, zIndex: 0 })).toEqual({
      opacity: 0,
      zIndex: 0,
      minWidth: 240,
      minHeight: 240,
      maxWidth: 240,
      maxHeight: 240,
    });
  });
});
