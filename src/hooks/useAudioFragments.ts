import { useEffect, useMemo, useRef, useState } from 'react';

function resetAudio(audio: HTMLAudioElement) {
  audio.pause();
  audio.currentTime = 0;
}

function useAudioFragments(sources: string[]) {
  const audioElementsRef = useRef<HTMLAudioElement[]>([]);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const sourcesKey = sources.join('\0');
  const stableSources = useMemo(() => sources, [sourcesKey]);

  useEffect(() => {
    const audioElements = stableSources.map(source => {
      const audio = new Audio(source);
      audio.loop = true;
      audio.preload = 'auto';
      return audio;
    });

    audioElementsRef.current = audioElements;
    setPlayingIndex(-1);

    return () => {
      for (const audio of audioElements) {
        resetAudio(audio);
        audio.removeAttribute('src');
        audio.load();
      }

      audioElementsRef.current = [];
    };
  }, [stableSources]);

  useEffect(() => {
    void Promise.all(
      audioElementsRef.current.map(async (audio, index) => {
        if (index !== playingIndex) {
          resetAudio(audio);
          return;
        }

        try {
          await audio.play();
        } catch {
          setPlayingIndex(-1);
        }
      })
    );
  }, [playingIndex]);

  return {
    playingIndex,
    toggle: (index: number) => {
      setPlayingIndex(currentPlayingIndex => (currentPlayingIndex === index ? -1 : index));
    },
  };
}

export default useAudioFragments;
