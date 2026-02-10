"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function QuizPage() {
	const router = useRouter();
	const params = useParams();
	const id = (params?.id as string) ?? "1";

	//점수 기록 훅
	const { recordAnswer } = useQuizScore();

	//현재 진행 상태(문제, 사용자가 선택한 보기인덱스)
	const [currentStep, setCurrentStep] = useState(0);

	// 공지사항 내용에 맞춘 퀴즈 데이터 (id별 분기)
	const allQuizData: Record<string, { question: string; options: string[] }[]> = {
		"1": [
			{
				question: "개정된 이용약관의 효력 발생일은 언제인가요?",
				options: ["2026년 3월 1일", "2026년 3월 15일", "2026년 4월 1일", "2026년 5월 1일"],
			},
			{
				question: "보안 강화를 위해 변경된 접속 로그 보관 주기는?",
				options: ["3개월", "6개월", "1년", "무제한"],
			},
			{
				question: "약관 개정에 동의하지 않을 경우 사용자의 선택은?",
				options: ["고객센터 전화", "이메일 문의", "회원 탈퇴", "유료 결제"],
			},
		],
		"2": [
			{
				question: "공지사항 2번 관련 퀴즈 질문을 여기에?",
				options: ["정답 선택지", "오답 1", "오답 2", "오답 3"],
			},
			// ... 퀴즈 2번 문항들 추가
		],
	};

	const quizData = allQuizData[id] || allQuizData["1"]; // 데이터 없을 시 기본값 1번

	const handleOptionClick = () => {
		// 마지막 문제가 아닐 경우 다음 문제로
		if (currentStep < quizData.length - 1) {
			setCurrentStep(currentStep + 1);
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

	return (
		<div
			style={{
				padding: "60px 20px",
				maxWidth: "500px",
				margin: "0 auto",
				fontFamily: "sans-serif",
			}}
		>
			{/* 문항 표시 스타일링 */}
			<p
				style={{
					fontFamily: "Paperlogy",
					color: "#54759a",
					fontWeight: "bold",
					fontSize: "1.1rem",
					marginBottom: "6px",
				}}
			>
				Q{currentStep + 1}.
			</p>

			{/* 질문 내용 스타일링 */}
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
