import { useRef, useCallback } from "react";
export default function useIntersectionObserver(callback, deps) {
  const observer = useRef(null);

  const ref = useCallback(
    (node) => {
      if (deps.every(Boolean)) {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) callback();
        });
        if (node) observer.current.observe(node);
      }
    },
    [deps, callback]
  );
  return ref;
}
