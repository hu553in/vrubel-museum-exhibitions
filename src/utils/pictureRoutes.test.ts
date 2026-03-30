import { ROUTES } from '@/constants';

import { buildPicturePath, buildPictureRoute, getPictureOpenedFrom } from './pictureRoutes';

describe('pictureRoutes', () => {
  it('builds a picture path for a plain id', () => {
    expect(buildPicturePath('trojka-zimoj')).toBe('/revived-paintings/picture/trojka-zimoj');
  });

  it('encodes special characters in picture path', () => {
    expect(buildPicturePath('space and/slash')).toBe(
      '/revived-paintings/picture/space%20and%2Fslash'
    );
  });

  it('builds a picture route without from parameter', () => {
    expect(buildPictureRoute('danaja')).toBe('/revived-paintings/picture/danaja');
  });

  it('builds a picture route with encoded from parameter', () => {
    expect(
      buildPictureRoute(
        'burja-na-chernom-more',
        `${ROUTES.REVIVED_PAINTINGS}${ROUTES.GALOS}#burja-na-chernom-more`
      )
    ).toBe(
      '/revived-paintings/picture/burja-na-chernom-more?from=%2Frevived-paintings%2Fgalos%23burja-na-chernom-more'
    );
  });

  it('returns undefined when from parameter is absent', () => {
    expect(getPictureOpenedFrom('')).toBeUndefined();
    expect(getPictureOpenedFrom('?foo=bar')).toBeUndefined();
  });

  it('parses and decodes from parameter from search string', () => {
    expect(
      getPictureOpenedFrom('?from=%2Frevived-paintings%2Fcatalogue%3Ffilter%3Done%23target')
    ).toBe('/revived-paintings/catalogue?filter=one#target');
  });
});
