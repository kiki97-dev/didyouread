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

/* 
이 페이지가 하는 일 한 줄 요약
1. URL의 id(퀴즈 1/2)를 보고 해당 퀴즈 목록을 불러온다
2. 보기(정답/오답)를 한 번 섞어 고정한다
3. 사용자가 선택하고 “다음”을 누르거나, 30초가 지나면 자동 제출한다
4. 정답 여부는 localStorage에 누적 점수로 기록한다
5. 마지막 문제면 다음 공지/결과 페이지로 이동한다
*/
export default function QuizPage() {
	const router = useRouter();
	const params = useParams();
	const id = (params?.id as string) ?? "1";

	//점수 기록 훅
	const { recordAnswer } = useQuizScore();

	//현재 진행 상태(문제, 사용자가 선택한 보기인덱스)
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	//id에 맞는 퀴즈 분기처리
	const rawQuizData = allQuizData[id] || allQuizData["1"];
	const total = rawQuizData.length; //총문항수

	// ✅ 옵션 섞인 결과를 “id 기준으로 한 번” 확정
	const builtQuizData = useMemo(() => buildQuizData(rawQuizData), [id]); // rawQuizData는 id로 결정됨
	const currentQuiz = builtQuizData[currentStep];

	// ✅ id 변경 시 step만 리셋
	useEffect(() => {
		setCurrentStep(0);
		setSelectedIndex(null);
	}, [id]);

	// ✅ step 변경 시 사용자 정답 선택값 초기화
	useEffect(() => {
		setSelectedIndex(null);
	}, [currentStep]);

	//제출로직
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
			{/* Q번호/총문항/타이머 표시 */}
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
			{/* 보기 리스트 + 선택 스타일 처리 */}
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
