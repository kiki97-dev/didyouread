"use client";

import QuizHeader from "../_components/QuizHeader";
import QuizQuestion from "../_components/QuizQuestion";
import QuizOptions from "../_components/QuizOptions";
import QuizReview from "../_components/QuizReview";
import NextButton from "../_components/NextButton";
import { useQuiz } from "../_hooks/useQuiz";

export default function QuizPage() {
	const {
		currentStep,
		total,
		timeLeft,
		phase,
		isCorrect,
		selectedIndex,
		setSelectedIndex,
		currentQuiz,
		rawQuizData,
		handleNextClick,
	} = useQuiz();

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
			{/* 퀴즈 진행도 + 타이머 */}
			<QuizHeader currentStep={currentStep} total={total} timeLeft={timeLeft} />

			{/* 퀴즈 질문 */}
			<QuizQuestion question={currentQuiz.question} />

			{/* 퀴즈 선택지 */}
			<QuizOptions
				options={currentQuiz.options}
				selectedIndex={selectedIndex}
				correctIndex={currentQuiz.correctIndex}
				phase={phase}
				onSelect={(index) => {
					if (phase === "review") return; // 해설 중엔 클릭 막기
					setSelectedIndex(index);
				}}
			/>

			{/* 정답 여부와 해설 */}
			{phase === "review" && (
				<QuizReview isCorrect={isCorrect} explain={rawQuizData[currentStep].explain} />
			)}

			<NextButton
				label={currentStep === total - 1 ? "완료" : "다음"}
				onClick={handleNextClick}
			/>
		</div>
	);
}
