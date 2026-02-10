"use client";

import { useCallback } from "react";

export type Score = {
  correct: number;
  total: number;
  updatedAt: number;
};

export const SCORE_KEY = "quiz_score";

function safeParseScore(raw: string | null): Score {
  try {
    if (!raw) return { correct: 0, total: 0, updatedAt: Date.now() };
    const parsed = JSON.parse(raw);
    return {
      correct: Number(parsed.correct) || 0,
      total: Number(parsed.total) || 0,
      updatedAt: Number(parsed.updatedAt) || Date.now(),
    };
  } catch {
    return { correct: 0, total: 0, updatedAt: Date.now() };
  }
}

export function useQuizScore() {
  const readScore = useCallback((): Score => {
    return safeParseScore(localStorage.getItem(SCORE_KEY));
  }, []);

  const writeScore = useCallback((next: Score) => {
    localStorage.setItem(SCORE_KEY, JSON.stringify(next));
  }, []);

  const recordAnswer = useCallback(
    (isCorrect: boolean) => {
      const prev = readScore();
      const next: Score = {
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
        updatedAt: Date.now(),
      };
      writeScore(next);
      return next;
    },
    [readScore, writeScore]
  );

  const resetScore = useCallback(() => {
    localStorage.removeItem(SCORE_KEY);
  }, []);

  return { readScore, writeScore, recordAnswer, resetScore };
}
