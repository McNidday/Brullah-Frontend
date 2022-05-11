import { useRef, useEffect } from "react";

export const useInterval = (callback: Function, delay: number | undefined) => {
  const savedCallback = useRef<Function>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => {
        savedCallback.current!();
      }, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
