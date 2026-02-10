"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProgressBar from "./_components/ProgressBar";
import QuizModal from "./_components/QuizModal";

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
	const [showQuiz, setShowQuiz] = useState(false);

	// ✅ A버전: 사용자 입력(스크롤 의도) 1회 이상 감지
	const [hasUserInteracted, setHasUserInteracted] = useState(false);

	const router = useRouter();
	const { id } = useParams();

	const bottomRef = useRef<HTMLDivElement | null>(null);
	const dwellTimerRef = useRef<number | null>(null);

	// ✅ 사용자 입력(스크롤 의도) 1회 감지
	useEffect(() => {
		if (hasUserInteracted) return;

		const mark = () => setHasUserInteracted(true);

		const onWheel = () => mark();
		const onTouchMove = () => mark();
		const onKeyDown = (e: KeyboardEvent) => {
			const keys = ["ArrowDown", "PageDown", " ", "End"];
			if (keys.includes(e.key)) mark();
		};

		window.addEventListener("wheel", onWheel, { passive: true });
		window.addEventListener("touchmove", onTouchMove, { passive: true });
		window.addEventListener("keydown", onKeyDown);

		return () => {
			window.removeEventListener("wheel", onWheel);
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("keydown", onKeyDown);
		};
	}, [hasUserInteracted]);

	// ✅ 하단 도달 + 머문 시간(0.8s) + 사용자 입력 1회 조건
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
