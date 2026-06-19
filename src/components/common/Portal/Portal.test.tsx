import { render, screen } from '@testing-library/react';

import Portal from './Portal';

describe('Portal', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div><div id="custom"></div>';
  });

  it('renders into the app root when no explicit container is provided', () => {
    render(
      <Portal>
        <div>Portal content</div>
      </Portal>
    );

    expect(screen.getByText('Portal content')).toBeInTheDocument();
    expect(document.getElementById('root')).toContainElement(screen.getByText('Portal content'));
  });

  it('prefers the provided container over the app root', () => {
    const container = document.getElementById('custom');

    render(
      <Portal container={container}>
        <div>Custom portal content</div>
      </Portal>
    );

    expect(container).toContainElement(screen.getByText('Custom portal content'));
    expect(document.getElementById('root')).not.toContainElement(
      screen.getByText('Custom portal content')
    );
  });

  it('renders nothing when neither a container nor the app root exists', () => {
    document.body.innerHTML = '';

    const { container } = render(
      <Portal>
        <div>Detached content</div>
      </Portal>
    );

    expect(container).toBeEmptyDOMElement();
    expect(screen.queryByText('Detached content')).not.toBeInTheDocument();
  });
});
