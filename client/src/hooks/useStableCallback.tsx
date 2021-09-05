import { useRef, useCallback, useEffect } from 'react';

// A callback that always closes over the latest data but keeps the same
// identity and will not be called after component unmounts

export function useStableCallback<T extends Array<unknown>, R>(
  callback: (...args: T) => R,
): (...args: T) => R {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  const stableCallback = useCallback((...args: T) => {
    return callbackRef.current(...args);
  }, []);

  return stableCallback;
}

export default useStableCallback;
