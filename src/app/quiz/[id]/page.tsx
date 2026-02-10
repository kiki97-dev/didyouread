"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { allQuizData } from "../_data/quizData";
import { buildQuizData } from "../_utils/buildQuiz";
import { useQuizScore } from "../_hooks/useQuizScore";
import { useCountdown } from "../_hooks/useCountdown";

import QuizHeader from "../_components/QuizHeader";
import OptionList from "../_components/OptionList";
import NextButton from "../_components/NextButton";

export default function QuizPage() {
	const router = useRouter();
	const params = useParams();
	const id = (params?.id as string) ?? "1";

	const { recordAnswer } = useQuizScore();

	const [currentStep, setCurrentStep] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const rawQuizData = allQuizData[id] || allQuizData["1"];
	const total = rawQuizData.length;

	// ✅ 옵션 섞인 결과를 “id 기준으로 한 번” 확정
	const builtQuizData = useMemo(() => buildQuizData(rawQuizData), [id]); // rawQuizData는 id로 결정됨
	const currentQuiz = builtQuizData[currentStep];

	// ✅ id 변경 시 step만 리셋(점수는 누적이므로 건드리지 않음)
	useEffect(() => {
		setCurrentStep(0);
		setSelectedIndex(null);
	}, [id]);

	// ✅ step 변경 시 선택 리셋
	useEffect(() => {
		setSelectedIndex(null);
	}, [currentStep]);

	const submitAndGoNext = (picked: number | null) => {
		if (!currentQuiz) return;

		const isCorrect = picked !== null && picked === currentQuiz.correctIndex;
		recordAnswer(isCorrect);

		const nextStep = currentStep + 1;

		// 다음 문항
		if (nextStep < total) {
			setCurrentStep(nextStep);
			return;
		}

		// --- 현재 퀴즈(id) 끝 ---
		if (id === "1") {
			const nextVersion = Math.random() < 0.5 ? "a" : "b";
			alert("첫 번째 퀴즈 완료! 다음 공지로 이동합니다.");
			router.push(`/notice/2?type=${nextVersion}`);
		} else {
			alert("모든 테스트가 완료되었습니다!");
			router.push("/result");
		}
	};

	// ✅ 30초 카운트다운 (0초면 자동 제출)
	const { timeLeft, reset: resetCountdown } = useCountdown({
		initialSeconds: 30,
		isActive: !!currentQuiz,
		onExpire: () => submitAndGoNext(selectedIndex),
	});

	// step/id 바뀔 때 타이머 리셋
	useEffect(() => {
		resetCountdown(30);
	}, [currentStep, id, resetCountdown]);

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
			<QuizHeader step={currentStep} total={total} timeLeft={timeLeft} />

			<h2
				style={{
					fontSize: "1.3rem",
					fontWeight: "bold",
					lineHeight: "1.3",
					marginBottom: "22px",
					wordBreak: "keep-all",
					fontFamily: "Paperlogy",
					color: "#333",
				}}
			>
				{currentQuiz.question}
			</h2>

			<OptionList
				options={currentQuiz.options}
				selectedIndex={selectedIndex}
				onSelect={setSelectedIndex}
			/>

			<NextButton
				isLast={currentStep === total - 1}
				onClick={() => submitAndGoNext(selectedIndex)}
			/>
		</div>
	);
}
