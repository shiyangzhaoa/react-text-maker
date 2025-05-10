import { useRef, useState } from 'react';

/**
 * Hold a reference to the event handler. Ensure the handler closure keeps upto date without reference change.
 * Should be replace after {@link https://github.com/reactjs/rfcs/pull/220 | React RFC-220} is implemented.
 *
 * @param fn - The event handler.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEvent<T extends (...args: any[]) => any>(fn?: T | null): T {
  const ref = useRef<T | undefined | null>(fn);
  ref.current = fn;

  return useState(
    () =>
      ((...args) => {
        return ref.current?.(...args);
      }) as T,
  )[0];
}
