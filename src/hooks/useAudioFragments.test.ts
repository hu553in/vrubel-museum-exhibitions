import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import useAudioFragments from './useAudioFragments';

class MockAudio {
  static instances: MockAudio[] = [];

  currentTime = 0;
  loop = false;
  preload = '';
  src: string;

  pause = vi.fn(() => undefined);
  play = vi.fn(() => undefined);
  removeAttribute = vi.fn((attributeName: string) => {
    if (attributeName === 'src') {
      this.src = '';
    }
  });
  load = vi.fn(() => undefined);

  constructor(src: string) {
    this.src = src;
    MockAudio.instances.push(this);
  }
}

const getAudio = (index: number) => {
  const audio = MockAudio.instances[index];

  if (!audio) {
    throw new Error(`Audio instance ${String(index)} was not created`);
  }

  return audio;
};

describe('useAudioFragments', () => {
  beforeEach(() => {
    MockAudio.instances = [];
    vi.stubGlobal('Audio', MockAudio as unknown as typeof Audio);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('creates looping audio elements for all sources', () => {
    const { result } = renderHook(() => useAudioFragments(['first.mp3', 'second.mp3']));

    expect(result.current.playingIndex).toBe(-1);
    expect(MockAudio.instances).toHaveLength(2);
    expect(getAudio(0)).toMatchObject({
      src: 'first.mp3',
      loop: true,
      preload: 'auto',
    });
    expect(getAudio(1)).toMatchObject({
      src: 'second.mp3',
      loop: true,
      preload: 'auto',
    });
  });

  it('creates no audio elements for an empty source list', () => {
    const { result } = renderHook(() => useAudioFragments([]));

    expect(result.current.playingIndex).toBe(-1);
    expect(MockAudio.instances).toHaveLength(0);
  });

  it('plays the selected fragment and stops the others', async () => {
    const { result } = renderHook(() => useAudioFragments(['first.mp3', 'second.mp3']));

    await waitFor(() => {
      expect(MockAudio.instances).toHaveLength(2);
    });

    for (const audio of MockAudio.instances) {
      audio.pause.mockClear();
      audio.play.mockClear();
      audio.currentTime = 5;
    }

    act(() => {
      result.current.toggle(1);
    });

    await waitFor(() => {
      expect(getAudio(1).play).toHaveBeenCalledTimes(1);
    });

    expect(getAudio(0).pause).toHaveBeenCalledTimes(1);
    expect(getAudio(0).currentTime).toBe(0);

    act(() => {
      result.current.toggle(0);
    });

    await waitFor(() => {
      expect(getAudio(0).play).toHaveBeenCalledTimes(1);
    });

    expect(getAudio(1).pause).toHaveBeenCalledTimes(1);
    expect(getAudio(1).currentTime).toBe(0);
  });

  it('stops playback when the active fragment is toggled again', async () => {
    const { result } = renderHook(() => useAudioFragments(['first.mp3']));

    await waitFor(() => {
      expect(MockAudio.instances).toHaveLength(1);
    });

    getAudio(0).pause.mockClear();
    getAudio(0).play.mockClear();

    act(() => {
      result.current.toggle(0);
    });

    await waitFor(() => {
      expect(getAudio(0).play).toHaveBeenCalledTimes(1);
    });

    act(() => {
      result.current.toggle(0);
    });

    await waitFor(() => {
      expect(result.current.playingIndex).toBe(-1);
    });

    expect(getAudio(0).pause).toHaveBeenCalledTimes(1);
    expect(getAudio(0).currentTime).toBe(0);
  });

  it('resets playingIndex when audio playback fails', async () => {
    const { result } = renderHook(() => useAudioFragments(['broken.mp3']));

    await waitFor(() => {
      expect(MockAudio.instances).toHaveLength(1);
    });

    getAudio(0).play.mockRejectedValueOnce(new Error('Playback failed'));

    act(() => {
      result.current.toggle(0);
    });

    await waitFor(() => {
      expect(result.current.playingIndex).toBe(-1);
    });
  });

  it('does not recreate audio elements on rerender when sources content is unchanged', () => {
    const { rerender } = renderHook(({ sources }) => useAudioFragments(sources), {
      initialProps: { sources: ['first.mp3', 'second.mp3'] },
    });

    const initialAudioInstances = [...MockAudio.instances];

    rerender({ sources: ['first.mp3', 'second.mp3'] });

    expect(MockAudio.instances).toHaveLength(2);
    expect(MockAudio.instances[0]).toBe(initialAudioInstances[0]);
    expect(MockAudio.instances[1]).toBe(initialAudioInstances[1]);
  });

  it('cleans up previous audio elements and resets state when sources change', async () => {
    const { result, rerender } = renderHook(({ sources }) => useAudioFragments(sources), {
      initialProps: { sources: ['first.mp3', 'second.mp3'] },
    });

    act(() => {
      result.current.toggle(1);
    });

    await waitFor(() => {
      expect(result.current.playingIndex).toBe(1);
    });

    const firstAudio = getAudio(0);
    const secondAudio = getAudio(1);

    rerender({ sources: ['third.mp3'] });

    expect(firstAudio.pause).toHaveBeenCalled();
    expect(firstAudio.removeAttribute).toHaveBeenCalledWith('src');
    expect(firstAudio.load).toHaveBeenCalled();
    expect(secondAudio.pause).toHaveBeenCalled();
    expect(secondAudio.removeAttribute).toHaveBeenCalledWith('src');
    expect(secondAudio.load).toHaveBeenCalled();
    expect(result.current.playingIndex).toBe(-1);
    expect(MockAudio.instances).toHaveLength(3);
    expect(getAudio(2).src).toBe('third.mp3');
  });

  it('does not try to play any audio when toggled with an out-of-range index', async () => {
    const { result } = renderHook(() => useAudioFragments(['first.mp3']));

    await waitFor(() => {
      expect(MockAudio.instances).toHaveLength(1);
    });

    getAudio(0).play.mockClear();
    getAudio(0).pause.mockClear();

    act(() => {
      result.current.toggle(99);
    });

    await waitFor(() => {
      expect(result.current.playingIndex).toBe(99);
    });

    expect(getAudio(0).play).not.toHaveBeenCalled();
    expect(getAudio(0).pause).toHaveBeenCalledTimes(1);
  });

  it('cleans up created audio elements on unmount', () => {
    const { unmount } = renderHook(() => useAudioFragments(['first.mp3', 'second.mp3']));

    const firstAudio = getAudio(0);
    const secondAudio = getAudio(1);

    unmount();

    expect(firstAudio.pause).toHaveBeenCalled();
    expect(firstAudio.currentTime).toBe(0);
    expect(firstAudio.removeAttribute).toHaveBeenCalledWith('src');
    expect(firstAudio.load).toHaveBeenCalled();

    expect(secondAudio.pause).toHaveBeenCalled();
    expect(secondAudio.currentTime).toBe(0);
    expect(secondAudio.removeAttribute).toHaveBeenCalledWith('src');
    expect(secondAudio.load).toHaveBeenCalled();
  });
});
