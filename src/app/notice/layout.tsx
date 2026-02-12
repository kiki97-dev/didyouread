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

	const [showQuiz, setShowQuiz] = useState(false);
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const dwellTimerRef = useRef<number | null>(null);
	useEffect(() => {
		if (!bottomRef.current) return;

		const el = bottomRef.current;

		const startDwellTimer = () => {
			if (showQuiz) return;
			if (dwellTimerRef.current) return;

			dwellTimerRef.current = window.setTimeout(() => {
				setShowQuiz(true);
				dwellTimerRef.current = null;
			}, 800);
		};

		const cancelDwellTimer = () => {
			if (dwellTimerRef.current) {
				clearTimeout(dwellTimerRef.current);
				dwellTimerRef.current = null;
			}
		};

		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// ✅ 핵심 예외처리: 유저가 스크롤 의도를 보이기 전에는 트리거 금지
					if (!hasUserInteracted) return;
					startDwellTimer();
				} else {
					cancelDwellTimer();
				}
			},
			{
				threshold: 0.01,
				rootMargin: "0px 0px 0px 0px",
			}
		);

		io.observe(el);

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
