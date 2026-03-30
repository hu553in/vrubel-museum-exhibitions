import { act, renderHook, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import useVideoPlaybackState from './useVideoPlaybackState';

const createVideoElement = () => {
  const playMock = vi.fn(() => Promise.resolve());
  const pauseMock = vi.fn(() => undefined);

  return {
    playMock,
    pauseMock,
    videoElement: {
      play: playMock,
      pause: pauseMock,
    } as unknown as HTMLVideoElement,
  };
};

describe('useVideoPlaybackState', () => {
  it('starts in loading state without errors', () => {
    const { result } = renderHook(() =>
      useVideoPlaybackState({
        autoPlay: true,
        isVisible: true,
        videoRef: { current: createVideoElement().videoElement },
      })
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);
    expect(result.current.handleMetadataReady).toBeUndefined();
  });

  it('exposes metadata handler when autoplay is disabled', () => {
    const { result } = renderHook(() =>
      useVideoPlaybackState({
        autoPlay: false,
        isVisible: true,
        videoRef: { current: createVideoElement().videoElement },
      })
    );

    expect(typeof result.current.handleMetadataReady).toBe('function');
  });

  it('stops loading when playback-ready handlers are called', () => {
    const { result } = renderHook(() =>
      useVideoPlaybackState({
        autoPlay: true,
        isVisible: true,
        videoRef: { current: createVideoElement().videoElement },
      })
    );

    act(() => {
      result.current.handlePlaybackReady();
    });

    expect(result.current.loading).toBe(false);
  });

  it('marks error and stops loading when an error occurs', () => {
    const { result } = renderHook(() =>
      useVideoPlaybackState({
        autoPlay: true,
        isVisible: true,
        videoRef: { current: createVideoElement().videoElement },
      })
    );

    act(() => {
      result.current.handleError();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(true);
  });

  it('plays the video when loading has finished and page is visible', async () => {
    const { playMock, videoElement } = createVideoElement();

    const videoRef = createRef<HTMLVideoElement>();
    videoRef.current = videoElement;

    const { result } = renderHook(() =>
      useVideoPlaybackState({
        autoPlay: true,
        isVisible: true,
        videoRef,
      })
    );

    act(() => {
      result.current.handlePlaybackReady();
    });

    await waitFor(() => {
      expect(playMock).toHaveBeenCalledTimes(1);
    });
  });

  it('pauses the video when page becomes hidden after playback promise resolves', async () => {
    const playPromise = Promise.resolve();
    const playMock = vi.fn(() => playPromise);
    const pauseMock = vi.fn(() => undefined);
    const videoElement = {
      play: playMock,
      pause: pauseMock,
    } as unknown as HTMLVideoElement;

    const videoRef = createRef<HTMLVideoElement>();
    videoRef.current = videoElement;

    const { result, rerender } = renderHook(
      ({ isVisible }) =>
        useVideoPlaybackState({
          autoPlay: true,
          isVisible,
          videoRef,
        }),
      {
        initialProps: { isVisible: true },
      }
    );

    act(() => {
      result.current.handlePlaybackReady();
    });

    rerender({ isVisible: false });

    await waitFor(() => {
      expect(pauseMock).toHaveBeenCalledTimes(1);
    });
  });

  it('pauses the video immediately when hidden and no play promise exists', async () => {
    const { pauseMock, videoElement } = createVideoElement();

    const videoRef = createRef<HTMLVideoElement>();
    videoRef.current = videoElement;

    const { result, rerender } = renderHook(
      ({ isVisible }) =>
        useVideoPlaybackState({
          autoPlay: true,
          isVisible,
          videoRef,
        }),
      {
        initialProps: { isVisible: true },
      }
    );

    act(() => {
      result.current.handleError();
    });

    rerender({ isVisible: false });

    await waitFor(() => {
      expect(pauseMock).toHaveBeenCalledTimes(1);
    });
  });

  it('swallows playback promise rejection when hiding a video', async () => {
    const playMock = vi.fn(() => Promise.reject(new Error('play failed')));
    const pauseMock = vi.fn(() => undefined);
    const videoElement = {
      play: playMock,
      pause: pauseMock,
    } as unknown as HTMLVideoElement;

    const videoRef = createRef<HTMLVideoElement>();
    videoRef.current = videoElement;

    const { result, rerender } = renderHook(
      ({ isVisible }) =>
        useVideoPlaybackState({
          autoPlay: true,
          isVisible,
          videoRef,
        }),
      {
        initialProps: { isVisible: true },
      }
    );

    act(() => {
      result.current.handlePlaybackReady();
    });

    rerender({ isVisible: false });

    await waitFor(() => {
      expect(playMock).toHaveBeenCalledTimes(1);
    });

    expect(pauseMock).not.toHaveBeenCalled();
  });
});
