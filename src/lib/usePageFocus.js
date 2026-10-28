import { useEffect, useRef } from 'react';

let firstPage = true;

// Moves keyboard/screen-reader focus to the page heading after client-side navigation.
// Skipped on the very first load so the browser's normal behaviour applies.
export function usePageFocus() {
  const ref = useRef(null);
  useEffect(() => {
    if (firstPage) {
      firstPage = false;
      return;
    }
    ref.current?.focus({ preventScroll: true });
  }, []);
  return ref;
}
