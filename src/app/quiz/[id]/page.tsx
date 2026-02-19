"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { allQuizData } from "../_data/quizData";
import { shuffle, readScore, writeScore } from "../_utils/quizUtils";
import QuizHeader from "../_components/QuizHeader";

type BuiltQuizItem = {
	question: string;
	options: string[];
	correctIndex: number;
};

type Score = {
	correct: number;
	total: number;
	updatedAt: number;
};

export default function QuizPage() {
	const router = useRouter();
	const params = useParams();
	const id = (params?.id as string) ?? "1";

	const [currentStep, setCurrentStep] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const [timeLeft, setTimeLeft] = useState(15);
	const timerRef = useRef<number | null>(null);

	const [phase, setPhase] = useState<"quiz" | "review">("quiz");
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const rawQuizData = allQuizData[id] || allQuizData["1"];
	const total = rawQuizData.length;

	// ✅ 옵션 섞인 결과를 “퀴즈 시작 시 한 번” 확정 (스텝 이동해도 옵션 순서 유지)
	const builtQuizData: BuiltQuizItem[] = useMemo(() => {
		return rawQuizData.map((q) => {
			const mixed = shuffle([q.correct, ...q.wrong]);
			return {
				question: q.question,
				options: mixed,
				correctIndex: mixed.indexOf(q.correct),
			};
		});
	}, [id]); // id 바뀔 때만 새로

	const currentQuiz = builtQuizData[currentStep];

	// ✅ id 바뀌면 “스텝만” 초기화 (점수는 초기화 X)
	useEffect(() => {
		setCurrentStep(0);
		setSelectedIndex(null);
		setTimeLeft(15);
		setPhase("quiz");
		setIsCorrect(null);
	}, [id]);

	// ✅ 스텝 바뀌면 선택/타이머 리셋
	useEffect(() => {
		setSelectedIndex(null);
		setTimeLeft(15);
	}, [currentStep]);

	// ✅ 타이머 시작
	useEffect(() => {
		if (phase !== "quiz") return;
		if (!currentQuiz) return;

		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}

		timerRef.current = window.setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => {
			if (timerRef.current) {
				window.clearInterval(timerRef.current);
				timerRef.current = null;
			}
		};
	}, [currentStep, id, currentQuiz, phase]);

	// ✅ 타임아웃 → 바로 넘어가지 말고 "해설(review) 화면"으로 전환
	useEffect(() => {
		if (phase !== "quiz") return;
		if (timeLeft > 0) return;

		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}

		// ✅ 선택 안 했으면 null → 무조건 오답 처리
		const correct = selectedIndex !== null && selectedIndex === currentQuiz.correctIndex;

		setIsCorrect(correct);
		setPhase("review");

		// ✅ 여기서 submitAndGoNext 호출하지 않음!
		// (다음 버튼 눌렀을 때 submitAndGoNext 실행)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeLeft, phase]);

	const submitAndGoNext = (picked: number | null) => {
		const isCorrect = picked !== null && picked === currentQuiz.correctIndex;

		// ✅ 누적 점수 반영 (문항 하나 끝날 때마다 total +1, correct는 맞으면 +1)
		const prev = readScore();
		const next: Score = {
			correct: prev.correct + (isCorrect ? 1 : 0),
			total: prev.total + 1,
			updatedAt: Date.now(),
		};
		writeScore(next);

		const nextStep = currentStep + 1;

		// 다음 문항
		if (nextStep < total) {
			setCurrentStep(nextStep);
			return;
		}

		// --- 현재 퀴즈(id) 끝 ---
		if (id === "1") {
			// 퀴즈1 완료 -> 공지2로 이동 (A/B 랜덤)
			const nextVersion = Math.random() < 0.5 ? "a" : "b";
			alert("1단계 클리어! 다음 공지도 읽어볼까요?");
			router.push(`/notice/2?type=${nextVersion}`);
		} else {
			// 퀴즈2 완료 -> 결과 페이지
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

		// ✅ review 단계: 다음 문제로 가기 전에 먼저 리셋 (중요!!)
		setTimeLeft(15);
		setSelectedIndex(null);
		setIsCorrect(null);
		setPhase("quiz");

		// ✅ 점수 반영 + 다음 문제 이동 (인자로 넘기니까 위에서 selectedIndex null로 바꿔도 OK)
		submitAndGoNext(selectedIndex);
	};

	if (!currentQuiz) return null;

	return (
		<div
			style={{
				padding: "50px 20px",
				maxWidth: "500px",
				margin: "0 auto",
				fontFamily: "sans-serif",
			}}
		>
			{/* 타이머 + 진행 */}
			<QuizHeader currentStep={currentStep} total={total} timeLeft={timeLeft} />

			<h2
				style={{
					fontSize: "2rem",
					fontWeight: "bold",
					lineHeight: "1.3",
					marginBottom: "22px",
					wordBreak: "keep-all",
					fontFamily: "Paperlogy",
					color: "#333",
					whiteSpace: "pre-line",
				}}
			>
				{currentQuiz.question}
			</h2>

			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				{currentQuiz.options.map((option, index) => {
					const isSelected = selectedIndex === index;

					// ✅ (6번) review 단계에서 정답/오답 표시용 계산
					const showReview = phase === "review";
					const isAnswer = index === currentQuiz.correctIndex; // 정답 옵션인가?
					const isPicked = selectedIndex === index; // 내가 고른 옵션인가?

					let borderColor = isSelected ? "#54759a" : "#e5e8eb";
					let backgroundColor = isSelected ? "rgba(84, 117, 154, 0.08)" : "#fff";

					// review 단계에서는 색상을 “채점 기준”으로 덮어씀
					if (showReview) {
						if (isAnswer) {
							borderColor = "#2ecc71";
							backgroundColor = "rgba(46, 204, 113, 0.12)";
						} else if (isPicked && !isAnswer) {
							borderColor = "#e74c3c";
							backgroundColor = "rgba(231, 76, 60, 0.10)";
						} else {
							borderColor = "#e5e8eb";
							backgroundColor = "#fff";
						}
					}

					return (
						<button
							key={index}
							type="button"
							onClick={() => {
								// ✅ (5번) review 단계면 클릭 막기
								if (phase === "review") return;
								setSelectedIndex(index);
							}}
							style={{
								padding: "15px 20px",
								borderRadius: "12px",
								border: `1px solid ${borderColor}`,
								backgroundColor,
								textAlign: "left",
								fontSize: "1.6rem",
								cursor: phase === "review" ? "default" : "pointer",
								transition: "all 0.2s ease",
								color: "#333",
								transform: isSelected ? "translateY(-1px)" : "none",
							}}
							onMouseOver={(e) => {
								if (phase === "review") return;
								e.currentTarget.style.borderColor = "#54759a";
							}}
							onMouseOut={(e) => {
								if (phase === "review") return;
								e.currentTarget.style.borderColor = isSelected
									? "#54759a"
									: "#e5e8eb";
							}}
						>
							{option}
						</button>
					);
				})}
			</div>

			{phase === "review" && (
				<div
					style={{
						marginTop: "18px",
						padding: "14px",
						borderRadius: "12px",
						border: "1px solid #e5e8eb",
						backgroundColor: "#fafafa",
						fontFamily: "Paperlogy",
					}}
				>
					<div
						style={{
							fontWeight: "bold",
							marginBottom: "8px",
							fontSize: "1.6rem",
						}}
					>
						{isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다."}
					</div>

					<div
						style={{
							whiteSpace: "pre-line",
							fontSize: "1.5rem",
							color: "#444",
						}}
					>
						{rawQuizData[currentStep].explain}
					</div>
				</div>
			)}

			<button
				type="button"
				onClick={handleNextClick}
				style={{
					marginTop: "22px",
					width: "100%",
					padding: "14px 16px",
					borderRadius: "12px",
					border: "none",
					backgroundColor: "#54759a",
					color: "#fff",
					fontSize: "1.6rem",
					cursor: "pointer",
				}}
			>
				{currentStep === total - 1 ? "완료" : "다음"}
			</button>
		</div>
	);
}
