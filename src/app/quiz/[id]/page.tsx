"use client";

import { useCallback, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import QuizHeader from "../_components/QuizHeader";

export default function QuizPage() {
	const router = useRouter();
	const params = useParams();
	const id = params?.id as string;
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

	const handleOptionClick = useCallback(() => {
		// 마지막 문제가 아닐 경우 다음 문제로
		if (currentStep < quizData.length - 1) {
			setCurrentStep((prev) => prev + 1);
			return;
		}

		// --- 마지막 문제 풀이 후 이동 로직 ---
		if (id === "1") {
			// 퀴즈 1 완료 -> 공지 2로 이동 (A/B안 랜덤 결정)
			const nextVersion = Math.random() < 0.5 ? "a" : "b";
			alert("첫 번째 퀴즈 완료! 다음 퀴즈로 이동합니다.");
			router.push(`/notice/2?type=${nextVersion}`);
		} else {
			// 퀴즈 2 완료 -> 결과 페이지로 이동
			alert("모든 테스트가 완료되었습니다!");
			router.push("/result");
		}
	}, [currentStep, id, quizData.length, router]);

	return (
		<div
			style={{
				padding: "60px 20px",
				maxWidth: "500px",
				margin: "0 auto",
				fontFamily: "sans-serif",
			}}
		>
			<QuizHeader
				currentStep={currentStep}
				totalSteps={quizData.length}
				resetKey={currentStep}
				onTimeout={handleOptionClick}
			/>

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
					marginBottom: "30px",
					wordBreak: "keep-all",
					fontFamily: "Paperlogy",
					color: "#333",
				}}
			>
				{quizData[currentStep].question}
			</h2>

			{/* 선택지 목록 스타일링 */}
			<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
				{quizData[currentStep].options.map((option, index) => (
					<button
						key={index}
						onClick={handleOptionClick}
						style={{
							padding: "15px 20px",
							borderRadius: "12px",
							border: "1px solid #e5e8eb",
							backgroundColor: "#fff",
							textAlign: "left",
							fontSize: "0.9rem",
							cursor: "pointer",
							transition: "all 0.2s ease",
							color: "#333",
						}}
						onMouseOver={(e) => (e.currentTarget.style.borderColor = "#54759a")}
						onMouseOut={(e) => (e.currentTarget.style.borderColor = "#e5e8eb")}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}
