import getAppRootElement from './getAppRootElement';

describe('getAppRootElement', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns the root element when it exists', () => {
    document.body.innerHTML = '<div id="root"></div>';

    expect(getAppRootElement()).toBe(document.getElementById('root'));
  });

  it('returns null when the root element is missing', () => {
    expect(getAppRootElement()).toBeNull();
  });

  it('returns the element with id root even when other elements are present', () => {
    document.body.innerHTML = `
      <div id="other"></div>
      <main id="root"></main>
      <div id="root-duplicate-lookalike"></div>
    `;

    expect(getAppRootElement()?.tagName).toBe('MAIN');
  });
});
