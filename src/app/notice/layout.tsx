"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProgressBar from "./_components/ProgressBar";
import QuizModal from "./_components/QuizModal";
import { useUserInteraction } from "./_hooks/useUserInteraction";

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { id } = useParams();

	/** @description 유저의 첫 스크롤/터치 활동 여부를 감지하여 가져옵니다. */
	const hasUserInteracted = useUserInteraction();

	/* 사용자가 페이지 맨 밑에 도착했을 때 진짜로 머물러 있는지 0.8초 동안 지켜봤다가 퀴즈를 띄워주는 로직 */
	const [showQuiz, setShowQuiz] = useState(false);
	const bottomRef = useRef<HTMLDivElement | null>(null); // 하단 위치 저장
	const dwellTimerRef = useRef<number | null>(null); // 체류 시간 타이머 저장
	useEffect(() => {
		if (!bottomRef.current) return;
		const el = bottomRef.current;

		/** @description 하단 도달 시 0.8초 대기 후 퀴즈 실행 */
		const startDwellTimer = () => {
			if (showQuiz || dwellTimerRef.current) return;

			dwellTimerRef.current = window.setTimeout(() => {
				setShowQuiz(true);
				dwellTimerRef.current = null;
			}, 800);
		};

		/** @description 사용자가 하단에서 벗어나면 실행 대기 취소 */
		const cancelDwellTimer = () => {
			if (dwellTimerRef.current) {
				clearTimeout(dwellTimerRef.current);
				dwellTimerRef.current = null;
			}
		};

		/** @description 특정 요소가 화면에 보이는지 감시하는 브라우저 도구 */
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// [중요] 섹션 1의 사용자 활동이 감지되었을 때만 타이머 시작
					if (!hasUserInteracted) return;
					startDwellTimer();
				} else {
					// 화면에서 사라지면(위로 올라가면) 타이머 중단
					cancelDwellTimer();
				}
			},
			{ threshold: 0.01 } // 요소가 1%라도 보이면 감지 시작
		);

		io.observe(el); // 감시 시작

		// [Clean-up] 페이지 이동 시 감시 중단 및 타이머 제거
		return () => {
			cancelDwellTimer();
			io.disconnect();
		};
	}, [hasUserInteracted, showQuiz]);

	return (
		<section style={{ position: "relative", minHeight: "100vh" }}>
			<ProgressBar />

			<div
				style={{
					maxWidth: "500px",
					margin: "0 auto",
					filter: showQuiz ? "blur(12px)" : "none",
					transition: "filter 0.5s ease",
					pointerEvents: showQuiz ? "none" : "auto",
				}}
			>
				{children}

				{/* ✅ 하단 감지용 sentinel */}
				<div ref={bottomRef} style={{ height: 1 }} />
			</div>

			{showQuiz && <QuizModal onConfirm={() => router.push(`/quiz/${id}`)} />}
		</section>
	);
}
