"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import ProgressBar from "./_components/ProgressBar";
import QuizModal from "./_components/QuizModal";

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [showQuiz, setShowQuiz] = useState(false);
	const requestRef = useRef<number>(null);

	const router = useRouter();
	const { id } = useParams();

	useEffect(() => {
		const updateScrollProgress = () => {
			const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollTop = window.scrollY;

			if (scrollHeight > 0) {
				const progress = (scrollTop / scrollHeight) * 100;
				setScrollProgress(progress);
				if (progress >= 90 && !showQuiz) setShowQuiz(true);
			}
			requestRef.current = requestAnimationFrame(updateScrollProgress);
		};

		requestRef.current = requestAnimationFrame(updateScrollProgress);
		return () => {
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
		};
	}, [showQuiz]);

	return (
		<section style={{ position: "relative", minHeight: "100vh" }}>
			<ProgressBar progress={scrollProgress} />

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
			</div>

			{showQuiz && <QuizModal onConfirm={() => router.push(`/quiz/${id}`)} />}
		</section>
	);
}
