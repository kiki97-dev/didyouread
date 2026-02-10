"use client";

import { useEffect, useRef, useState } from "react";

interface QuizHeaderProps {
	currentStep: number;
	totalSteps: number;
	resetKey: number;
	initialSeconds?: number;
	onTimeout?: () => void;
}

export default function QuizHeader({
	currentStep,
	totalSteps,
	resetKey,
	initialSeconds = 30,
	onTimeout,
}: QuizHeaderProps) {
	const [timeLeft, setTimeLeft] = useState(initialSeconds);
	const hasTimeoutFiredRef = useRef(false);

	useEffect(() => {
		setTimeLeft(initialSeconds);
		hasTimeoutFiredRef.current = false;
	}, [initialSeconds, resetKey]);

	useEffect(() => {
		if (timeLeft <= 0) return;

		const timerId = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(timerId);
	}, [timeLeft]);

	useEffect(() => {
		if (timeLeft !== 0 || !onTimeout || hasTimeoutFiredRef.current) return;

		hasTimeoutFiredRef.current = true;
		onTimeout();
	}, [onTimeout, timeLeft]);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				marginBottom: "20px",
				fontFamily: "Paperlogy, sans-serif",
			}}
		>
			<p style={{ color: "#54759a", fontWeight: "bold", fontSize: "0.95rem" }}>
				문항 {currentStep + 1}/{totalSteps}
			</p>
			<p
				style={{
					color: timeLeft <= 5 ? "#d93025" : "#333",
					fontWeight: "bold",
					fontSize: "0.95rem",
				}}
			>
				⏱ {timeLeft}초
			</p>
		</div>
	);
}
