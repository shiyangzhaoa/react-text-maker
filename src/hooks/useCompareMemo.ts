import { type DependencyList, useEffect, useRef } from "react";

export function useCompareMemo<T>(update: () => T, compare: (prev: T, next: T) => boolean, deps: DependencyList) {
  const ref = useRef<T>(undefined as T);

  useEffect(() => {
    const value = update();
    if (!compare(ref.current, value)) {
      ref.current = value;
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref.current;
}