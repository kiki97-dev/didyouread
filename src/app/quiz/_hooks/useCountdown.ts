"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type UseCountdownParams = {
  initialSeconds: number;
  isActive: boolean;
  onExpire: () => void;
};

export function useCountdown({ initialSeconds, isActive, onExpire }: UseCountdownParams) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const intervalRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(
    (nextSeconds = initialSeconds) => {
      stop();
      setTimeLeft(nextSeconds);
    },
    [initialSeconds, stop]
  );

  useEffect(() => {
    if (!isActive) {
      stop();
      return;
    }

    stop(); // 중복 방지
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return stop;
  }, [isActive, stop]);

  useEffect(() => {
    if (!isActive) return;
    if (timeLeft > 0) return;

    // 0초 도달
    stop();
    onExpire();
  }, [timeLeft, isActive, onExpire, stop]);

  return { timeLeft: Math.max(timeLeft, 0), reset, stop, setTimeLeft };
}
