import { useCallback, useEffect, useRef, useState } from "react";

export function useChrono(tickMs: number = 100) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const accRef = useRef(0);

  const loop = useCallback(
    (ts: number) => {
      if (lastTsRef.current == null) {
        lastTsRef.current = ts;
      } else {
        const dt = ts - lastTsRef.current;
        lastTsRef.current = ts;
        accRef.current += dt;
        if (accRef.current >= tickMs) {
          setElapsedMs((prev) => prev + accRef.current);
          accRef.current = 0;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    },
    [tickMs]
  );

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setRunning(true);
    lastTsRef.current = null;
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const stop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    startedRef.current = false;
    lastTsRef.current = null;
    accRef.current = 0;
    setElapsedMs(0);
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  return {
    elapsedMs,
    running,
    started: startedRef.current,
    start,
    stop,
    reset,
  };
}
