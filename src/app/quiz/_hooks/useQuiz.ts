import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { allQuizData } from "../_data/quizData";
import { shuffle, readScore, writeScore } from "../_utils/quizUtils";

// 1. 필요한 타입들 정의
export type BuiltQuizItem = {
  question: string;
  options: string[];
  correctIndex: number;
};

export type Score = {
  correct: number;
  total: number;
  updatedAt: number;
};

export function useQuiz() {
  const router = useRouter();
  const params = useParams();
  const id = (params?.id as string) ?? "1";

  // --- 상태 관리 (State) ---
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [phase, setPhase] = useState<"quiz" | "review">("quiz");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const timerRef = useRef<number | null>(null);

  // --- 데이터 가공 ---
  const rawQuizData = allQuizData[id] || allQuizData["1"];
  const total = rawQuizData.length;

  const builtQuizData: BuiltQuizItem[] = useMemo(() => {
    return rawQuizData.map((q) => {
      const mixed = shuffle([q.correct, ...q.wrong]);
      return {
        question: q.question,
        options: mixed,
        correctIndex: mixed.indexOf(q.correct),
      };
    });
  }, [id, rawQuizData]);

  const currentQuiz = builtQuizData[currentStep];

  // --- 효과 (Effects) ---

  // ID 변경 시 초기화
  useEffect(() => {
    setCurrentStep(0);
    setSelectedIndex(null);
    setTimeLeft(15);
    setPhase("quiz");
    setIsCorrect(null);
  }, [id]);

  // 스텝 변경 시 초기화
  useEffect(() => {
    setSelectedIndex(null);
    setTimeLeft(15);
  }, [currentStep]);

  // 타이머 로직
  useEffect(() => {
    if (phase !== "quiz" || !currentQuiz) return;

    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [currentStep, id, currentQuiz, phase]);

  // 타임아웃 감지
  useEffect(() => {
    if (phase !== "quiz" || timeLeft > 0) return;

    if (timerRef.current) window.clearInterval(timerRef.current);
    
    const correct = selectedIndex !== null && selectedIndex === currentQuiz.correctIndex;
    setIsCorrect(correct);
    setPhase("review");
  }, [timeLeft, phase, selectedIndex, currentQuiz]);

  // --- 비즈니스 로직 (Handlers) ---

  const submitAndGoNext = (picked: number | null) => {
    const isCorrectResult = picked !== null && picked === currentQuiz.correctIndex;

    const prev = readScore();
    const next: Score = {
      correct: prev.correct + (isCorrectResult ? 1 : 0),
      total: prev.total + 1,
      updatedAt: Date.now(),
    };
    writeScore(next);

    const nextStep = currentStep + 1;
    if (nextStep < total) {
      setCurrentStep(nextStep);
      return;
    }

    if (id === "1") {
      const nextVersion = Math.random() < 0.5 ? "a" : "b";
      alert("1단계 클리어! 다음 공지도 읽어볼까요?");
      router.push(`/notice/2?type=${nextVersion}`);
    } else {
      alert("완료! 수고하셨어요. 과연 결과는?!?");
      router.push("/result");
    }
  };

  const handleNextClick = () => {
    if (phase === "quiz") {
      const correct = selectedIndex !== null && selectedIndex === currentQuiz.correctIndex;
      setIsCorrect(correct);
      setPhase("review");
      return;
    }

    setTimeLeft(15);
    setSelectedIndex(null);
    setIsCorrect(null);
    setPhase("quiz");
    submitAndGoNext(selectedIndex);
  };

  // 페이지 컴포넌트에서 필요한 것들만 반환
  return {
    id,
    currentStep,
    total,
    timeLeft,
    phase,
    isCorrect,
    selectedIndex,
    setSelectedIndex,
    currentQuiz,
    rawQuizData, // 해설 데이터용
    handleNextClick,
  };
}