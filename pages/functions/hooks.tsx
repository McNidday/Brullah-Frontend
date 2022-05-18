import { useRef, useEffect, useState } from "react";

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

export const useExternalScript = (url: string) => {
  let [state, setState] = useState(url ? "loading" : "idle");
  function loadScript() {
    if (!url) {
      setState("idle");
      return;
    }

    let script: (Element & { [key: string]: string }) | HTMLScriptElement;
    const handleScript = (e: Event) => {
      setState(e.type === "load" ? "ready" : "error");
    };

    script = document.createElement("script")!;
    script.type = "application/javascript";
    script.src = url;
    script.async = true;
    const parent = document.getElementById("paypal-script");
    parent?.appendChild(script);
    script.addEventListener("load", handleScript);
    script.addEventListener("error", handleScript);
    return () => {
      script?.removeEventListener("load", handleScript);
      script?.removeEventListener("error", handleScript);
    };
  }
  useEffect(() => {
    loadScript();
  }, [url]);
  return [state];
};
