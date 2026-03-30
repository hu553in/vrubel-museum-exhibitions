import { render, screen } from '@testing-library/react';

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
});
