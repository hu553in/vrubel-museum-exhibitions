import { useEffect, useRef } from 'react';

interface Options {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

function useEventListener<T extends Event>(
  // This type is truly defined in TypeScript
  // but ESLint doesn't recognize it, so:
  // eslint-disable-next-line no-undef
  eventName: keyof WindowEventMap,
  handler: (event: T) => void,
  element: typeof window | HTMLElement = window,
  options: Options = {}
) {
  const { capture, passive, once } = options;
  const savedHandler = useRef<(event: T) => void | undefined>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const addEventListener = element && element.addEventListener;
    if (!addEventListener) return;

    const eventListener = ((event: T) =>
      savedHandler.current && savedHandler.current(event)) as (
      event: Event
    ) => void;

    const modifiedOptions = { capture, passive, once };
    element.addEventListener(eventName, eventListener, modifiedOptions);

    return () => {
      element.removeEventListener(eventName, eventListener, modifiedOptions);
    };
  }, [eventName, element, capture, passive, once]);
}

export default useEventListener;
