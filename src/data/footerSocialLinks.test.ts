import { describe, expect, it } from 'vitest';

import { footerSocialLinks } from './footerSocialLinks';

describe('footerSocialLinks', () => {
  it('keeps unique social network entries', () => {
    const socialNetworks = footerSocialLinks.map(({ socialNetwork }) => socialNetwork);

    expect(new Set(socialNetworks).size).toBe(socialNetworks.length);
  });

  it('contains secure external links and labels', () => {
    expect(
      footerSocialLinks.every(
        ({ href, ariaLabel }) => href.startsWith('https://') && ariaLabel.trim().length > 0
      )
    ).toBe(true);
  });

  it('keeps hrefs unique', () => {
    const hrefs = footerSocialLinks.map(({ href }) => href);

    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});
