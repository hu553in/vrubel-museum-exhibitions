import { getSideMenuLinkKey, isSideMenuLinkActive } from './sideMenuLinks';

describe('sideMenuLinks', () => {
  it('marks internal links active only on exact path match', () => {
    expect(isSideMenuLinkActive('/about', '/about')).toBe(true);
    expect(isSideMenuLinkActive('/about', '/contacts')).toBe(false);
  });

  it('never marks external links as active', () => {
    expect(isSideMenuLinkActive('https://example.com', '/about', true)).toBe(false);
  });

  it('uses route as a stable key', () => {
    expect(
      getSideMenuLinkKey({ label: 'External', route: 'https://example.com', external: true })
    ).toBe('https://example.com');
  });
});
