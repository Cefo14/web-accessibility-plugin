import { type DependencyList, type EffectCallback, useEffect, useRef } from "react";

export const useDidUpdate = (effect: EffectCallback, deps?: DependencyList) => {
  const mounted = useRef<boolean>();
  useEffect(() =>{
    if (!mounted.current) mounted.current = true;
    else effect();
  }, [deps]);
}
