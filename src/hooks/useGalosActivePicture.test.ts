import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import useGalosActivePicture from './useGalosActivePicture';

describe('useGalosActivePicture', () => {
  it('starts with an empty active picture', () => {
    const { result } = renderHook(() => useGalosActivePicture(vi.fn()));

    expect(result.current.activePicture).toEqual({
      name: '',
      authorAndYear: '',
    });
  });

  it('updates the active picture fields and syncs the hash when a picture becomes visible', () => {
    const navigate = vi.fn();
    const { result } = renderHook(() => useGalosActivePicture(navigate));

    act(() => {
      result.current.onPictureVisible({
        id: 'galos',
        name: 'Галоша',
        authorAndYear: '1900',
      });
    });

    expect(result.current.activePicture).toEqual({
      name: 'Галоша',
      authorAndYear: '1900',
    });
    expect(navigate).toHaveBeenCalledWith({ hash: '#galos' });
  });

  it('replaces the previous picture data on repeated visibility updates', () => {
    const navigate = vi.fn();
    const { result } = renderHook(() => useGalosActivePicture(navigate));

    act(() => {
      result.current.onPictureVisible({
        id: 'first',
        name: 'Первая',
        authorAndYear: '1901',
      });
      result.current.onPictureVisible({
        id: 'second',
        name: 'Вторая',
        authorAndYear: '1902',
      });
    });

    expect(result.current.activePicture).toEqual({
      name: 'Вторая',
      authorAndYear: '1902',
    });
    expect(navigate).toHaveBeenNthCalledWith(1, { hash: '#first' });
    expect(navigate).toHaveBeenNthCalledWith(2, { hash: '#second' });
  });

  it('keeps working when navigate returns a promise', () => {
    const navigate = vi.fn().mockResolvedValue(undefined);
    const { result } = renderHook(() => useGalosActivePicture(navigate));

    act(() => {
      result.current.onPictureVisible({
        id: 'async',
        name: 'Асинхронная',
        authorAndYear: '1903',
      });
    });

    expect(result.current.activePicture).toEqual({
      name: 'Асинхронная',
      authorAndYear: '1903',
    });
    expect(navigate).toHaveBeenCalledWith({ hash: '#async' });
  });
});
