import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useFittedImageSize from './useFittedImageSize';

vi.mock('usehooks-ts', () => ({
  useWindowSize: vi.fn(() => ({ width: 1280, height: 720 })),
}));

describe('useFittedImageSize', () => {
  it('returns zero size when parent element is missing', () => {
    const { result } = renderHook(() => useFittedImageSize(null, 100, 100));

    expect(result.current).toEqual({ width: 0, height: 0 });
  });

  it('returns zero size when natural image dimensions are missing', () => {
    const parentElement = { clientWidth: 300, clientHeight: 200 } as HTMLElement;

    const { result } = renderHook(() => useFittedImageSize(parentElement, 0, 200));

    expect(result.current).toEqual({ width: 0, height: 0 });
  });

  it('returns the fitted image size for valid parent and natural dimensions', () => {
    const parentElement = { clientWidth: 300, clientHeight: 200 } as HTMLElement;

    const { result } = renderHook(() => useFittedImageSize(parentElement, 600, 300));

    expect(result.current).toEqual({ width: 300, height: 150 });
  });

  it('updates calculated size when parent element dimensions change between renders', () => {
    const { result, rerender } = renderHook(
      ({ width, height }) =>
        useFittedImageSize({ clientWidth: width, clientHeight: height } as HTMLElement, 600, 300),
      {
        initialProps: { width: 300, height: 200 },
      }
    );

    expect(result.current).toEqual({ width: 300, height: 150 });

    rerender({ width: 200, height: 300 });

    expect(result.current).toEqual({ width: 200, height: 100 });
  });
});
