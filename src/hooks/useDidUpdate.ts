import {
  type DependencyList, type EffectCallback, useEffect, useRef,
} from 'react';

export const useDidUpdate = (effect: EffectCallback, deps?: DependencyList) => {
  const mounted = useRef<boolean>(false);
  useEffect(() => {
    if (!mounted.current) mounted.current = true;
    else effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};
