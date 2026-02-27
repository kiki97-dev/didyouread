import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { allQuizData, type RawQuizItem } from "../_data/quizData";
import { shuffle, readScore, writeScore } from "../_utils/quizUtils";

/**
 * useQuiz 훅이 반환하는 객체의 구조와 설명을 정의합니다.
 */
interface UseQuizReturn {
	/** 현재 진행 중인 문항 번호 (0부터 시작) */
	currentStep: number;
	/** 현재 세션의 총 문항 수 */
	total: number;
	/** 문항당 남은 제한 시간 (초 단위) */
	timeLeft: number;
	/** 현재 페이지 상태 (quiz: 문제 풀이, review: 해설 노출) */
	phase: "quiz" | "review";
	/** 현재 렌더링 중인 퀴즈 객체 (질문, 셔플된 옵션 등) */
	currentQuiz: any; // 구체적인 타입이 있다면 교체 가능
	/** 원본 데이터 배열 (해설 내용 참조용) */
	rawQuizData: any[];
	/** 사용자가 클릭하여 선택한 답안 인덱스 (미선택 시 null) */
	selectedIndex: number | null;
	/** 답안 선택 상태를 변경하는 함수 */
	setSelectedIndex: (index: number | null) => void;
	/** 현재 문항의 정답 여부 (채점 전 null) */
	isCorrect: boolean | null;
	/** 단계 전환 및 데이터 저장을 담당하는 통합 핸들러 */
	handleNextClick: () => void;
}

/**
 * @description 퀴즈의 진행 상태 관리, 타이머 제어, 점수 기록 및 페이지 이동 로직을 담당하는 커스텀 훅
 */
export function useQuiz(): UseQuizReturn {
	const router = useRouter();
	const params = useParams();
	const id = (params?.id as string) ?? "1"; // URL 파라미터에서 퀴즈 세션 ID 추출 (기본값 "1")

	/* --- [1] 상태 관리 (State Management) --- */
	const [currentStep, setCurrentStep] = useState(0); // 현재 진행 중인 문항 인덱스
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // 사용자가 선택한 답안 번호
	const [timeLeft, setTimeLeft] = useState(15); // 문항당 제한 시간 (초 단위)
	const [phase, setPhase] = useState<"quiz" | "review">("quiz"); // 현재 페이지 모드 (문제 풀이 / 정답 해설)
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 현재 문항의 정답 여부
	const timerRef = useRef<number | null>(null); // Interval 메모리 주소 저장 (컴포넌트 재렌더링 시에도 유지)

	/* --- [2] 데이터 처리 (Data Processing) --- */
	const rawQuizData = allQuizData[id] || allQuizData["1"]; // ID에 해당하는 원본 퀴즈 배열 데이터
	const total = rawQuizData.length; // 총 문항 수

	/** * @description 원본 데이터를 기반으로 선택지 셔플 및 정답 인덱스를 계산하여 최적화된 배열 생성
	 * @dependency [id] : 퀴즈 세션이 변경될 때만 재계산하여 선택지 순서 고정
	 */
	const builtQuizData = useMemo(() => {
		return rawQuizData.map((q: RawQuizItem) => {
			const mixed = shuffle([q.correct, ...q.wrong]);
			return {
				question: q.question,
				options: mixed,
				correctIndex: mixed.indexOf(q.correct), // 섞인 배열 내에서 정답의 위치 역추적
			};
		});
	}, [id, rawQuizData]);

	const currentQuiz = builtQuizData[currentStep]; // 현재 단계에서 렌더링할 문항 객체

	/* --- [3] 사이드 이펙트 제어 (Side Effects) --- */

	/** @description 문항이 변경될 때마다 선택값 및 타이머 시간 초기화 */
	useEffect(() => {
		setSelectedIndex(null);
		setTimeLeft(15);
	}, [currentStep]);

	/** * @description 타이머 실행 로직 : 1초 주기로 timeLeft 감소
	 * @cleanup clearInterval : 컴포넌트 언마운트 및 문제 전환 시 메모리 누수 방지를 위해 기존 타이머 제거
	 */
	useEffect(() => {
		if (phase !== "quiz" || !currentQuiz) return;

		if (timerRef.current) window.clearInterval(timerRef.current);

		timerRef.current = window.setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => {
			if (timerRef.current) window.clearInterval(timerRef.current);
		};
	}, [currentStep, id, phase, currentQuiz]);

	/** @description 시간 초과 발생 시 자동 채점 및 해설(review) 모드로 강제 전환 */
	useEffect(() => {
		if (phase !== "quiz" || timeLeft > 0) return;

		if (timerRef.current) window.clearInterval(timerRef.current);

		const correct = selectedIndex !== null && selectedIndex === currentQuiz.correctIndex;
		setIsCorrect(correct);
		setPhase("review");
	}, [timeLeft, phase, selectedIndex, currentQuiz]);

	/* --- [4] 이벤트 핸들러 (Event Handlers) --- */

	/** * @description 정답 데이터 누적 기록 및 다음 문항/페이지로의 라우팅 처리
	 * @param picked 사용자가 최종 선택한 인덱스
	 */
	const submitAndGoNext = (picked: number | null) => {
		const isCorrectResult = picked !== null && picked === currentQuiz.correctIndex;

		// LocalStorage 기반 누적 점수 업데이트 로직
		const prev = readScore();
		const next = {
			correct: prev.correct + (isCorrectResult ? 1 : 0),
			total: prev.total + 1,
			updatedAt: Date.now(),
		};
		writeScore(next);

		const nextStep = currentStep + 1;
		if (nextStep < total) {
			setCurrentStep(nextStep); // 다음 문제로 스텝 이동
			return;
		}

		// 세션 종료 조건 처리
		if (id === "1") {
			const versions = ["a", "b", "c", "d"];
			const nextVersion = versions[Math.floor(Math.random() * versions.length)];
			router.push(`/notice/2?type=${nextVersion}`);
		} else {
			router.push("/result"); // 최종 결과 페이지로 이동
		}
	};

	/** @description 버튼 클릭 시 단계(Phase)를 확인하여 채점 결과 노출 또는 다음 문항 이동 수행 */
	const handleNextClick = () => {
		if (phase === "quiz") {
			// 1단계: 채점 후 해설 노출
			const correct = selectedIndex !== null && selectedIndex === currentQuiz.correctIndex;
			setIsCorrect(correct);
			setPhase("review");
		} else {
			// 2단계: 상태 초기화 후 데이터 저장 및 문항 전환
			setTimeLeft(15);
			setSelectedIndex(null);
			setIsCorrect(null);
			setPhase("quiz");
			submitAndGoNext(selectedIndex);
		}
	};

	return {
		currentStep,
		total,
		timeLeft,
		phase,
		currentQuiz,
		rawQuizData,
		selectedIndex,
		setSelectedIndex,
		isCorrect,
		handleNextClick,
	};
}
