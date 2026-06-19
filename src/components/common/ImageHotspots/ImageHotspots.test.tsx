import { fireEvent, render, screen } from '@testing-library/react';

import ImageHotspots from './ImageHotspots';

describe('ImageHotspots', () => {
  it('renders the image even when the hotspot list is empty', () => {
    const parentElement = document.createElement('div');
    Object.defineProperty(parentElement, 'clientWidth', { value: 300 });
    Object.defineProperty(parentElement, 'clientHeight', { value: 200 });

    render(
      <ImageHotspots
        parentElement={parentElement}
        src='/image.webp'
        alt='Картина'
        imageHotspots={[]}
      />
    );

    expect(screen.getByAltText('Картина')).toBeInTheDocument();
    expect(document.querySelectorAll('.image-hotspot')).toHaveLength(0);
  });

  it('updates the fitted image size after the image finishes loading', () => {
    const parentElement = document.createElement('div');
    Object.defineProperty(parentElement, 'clientWidth', { value: 300 });
    Object.defineProperty(parentElement, 'clientHeight', { value: 200 });

    render(
      <ImageHotspots
        parentElement={parentElement}
        src='/image.webp'
        alt='Картина'
        imageHotspots={[]}
      />
    );

    const image = screen.getByAltText('Картина');

    Object.defineProperty(image, 'naturalWidth', { configurable: true, value: 600 });
    Object.defineProperty(image, 'naturalHeight', { configurable: true, value: 300 });
    fireEvent.load(image);

    expect(image).toHaveStyle({ width: '300px', height: '150px' });
  });
});
