"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type RawQuizItem = {
	question: string;
	correct: string;
	wrong: string[];
};

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

const SCORE_KEY = "quiz_score";

function shuffle<T>(arr: T[]): T[] {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

function readScore(): Score {
	try {
		const raw = localStorage.getItem(SCORE_KEY);
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

function writeScore(next: Score) {
	localStorage.setItem(SCORE_KEY, JSON.stringify(next));
}

export default function QuizPage() {
	const router = useRouter();
	const params = useParams();
	const id = (params?.id as string) ?? "1";

	const [currentStep, setCurrentStep] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const [timeLeft, setTimeLeft] = useState(15);
	const timerRef = useRef<number | null>(null);

	const allQuizData: Record<string, RawQuizItem[]> = {
		"1": [
			{
				question: "교육 일정 \n 이번 워크숍은 언제 진행되나요?",
				correct: "3월 22일 (금)",
				wrong: ["3월 10일 (월)", "3월 15일 (토)"],
			},
			{
				question: "할인 혜택 \n 얼리버드 할인을 받으려면 언제까지 결제를 완료해야 하나요?",
				correct: "3월 10일까지",
				wrong: ["3월 5일까지", "3월 15일까지"],
			},
			{
				question: "수강료\n얼리버드 할인가는 얼마인가요?",
				correct: "144,000원",
				wrong: ["160,000원", "180,000원"],
			},
		],
		"2": [
			{
				question: "4월 1일 이후에도 복지포인트를 계속 쓸 수 있는 곳은?",
				correct: "헬스장",
				wrong: ["영화관", "서점", "여행사"],
			},
			{
				question: "영화 보러 갈 때 복지포인트를 쓰려면 언제까지 써야 하나?",
				correct: "3월 말까지",
				wrong: ["2월 말까지", "4월 말까지", "언제든지 가능"],
			},
			{
				question: "이번 변경으로 복지포인트를 쓸 수 있는 항목이 몇 개로 줄어드나?",
				correct: "2개",
				wrong: ["1개", "5개", "7개"],
			},
		],
	};

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
	}, [id]);

	// ✅ 스텝 바뀌면 선택/타이머 리셋
	useEffect(() => {
		setSelectedIndex(null);
		setTimeLeft(15);
	}, [currentStep]);

	// ✅ 타이머 시작
	useEffect(() => {
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
	}, [currentStep, id, currentQuiz]);

	// ✅ 타임아웃 자동 제출
	useEffect(() => {
		if (timeLeft > 0) return;

		if (timerRef.current) {
			window.clearInterval(timerRef.current);
			timerRef.current = null;
		}

		submitAndGoNext(selectedIndex); // 선택 없으면 null -> 오답
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeLeft]);

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
		submitAndGoNext(selectedIndex);
	};

	if (!currentQuiz) return null;

	return (
		<div
			style={{
				padding: "60px 20px",
				maxWidth: "500px",
				margin: "0 auto",
				fontFamily: "sans-serif",
			}}
		>
			{/* 타이머 + 진행 */}
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "4px",
				}}
			>
				<p
					style={{
						margin: 0,
						fontFamily: "Paperlogy",
						color: "#54759a",
						fontWeight: "bold",
						fontSize: "1.8rem",
					}}
				>
					Q{currentStep + 1}.{" "}
					<span style={{ fontSize: "1.8rem", color: "#777" }}>
						({currentStep + 1}/{total})
					</span>
				</p>

				<div
					style={{
						padding: "6px 10px",
						borderRadius: "10px",
						border: "1px solid #e5e8eb",
						fontSize: "1.6rem",
						fontFamily: "Paperlogy",
						color: timeLeft <= 5 ? "#c0392b" : "#333",
						backgroundColor: "#fff",
					}}
				>
					⏱ {Math.max(timeLeft, 0)}초
				</div>
			</div>

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

					return (
						<button
							key={index}
							type="button"
							onClick={() => setSelectedIndex(index)}
							style={{
								padding: "15px 20px",
								borderRadius: "12px",
								border: isSelected ? "1px solid #54759a" : "1px solid #e5e8eb",
								backgroundColor: isSelected ? "rgba(84, 117, 154, 0.08)" : "#fff",
								textAlign: "left",
								fontSize: "1.6rem",
								cursor: "pointer",
								transition: "all 0.2s ease",
								color: "#333",
								transform: isSelected ? "translateY(-1px)" : "none",
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.borderColor = "#54759a";
							}}
							onMouseOut={(e) => {
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
