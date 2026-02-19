"use client";

import { useEffect, useState } from "react";

/** @description 현재 스크롤 진행률을 계산하여 상단에 막대 그래프로 표시합니다. */
export default function ProgressBar() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let raf = 0; // RAF 식별 번호를 담을 변수

		const update = () => {
			// 실제 스크롤 가능한 높이 계산
			const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollTop = window.scrollY; // 현재 스크롤 위치

			if (scrollHeight > 0) {
				// 백분율 계산 후 상태 업데이트
				setProgress((scrollTop / scrollHeight) * 100);
			} else {
				// 스크롤이 필요 없는 짧은 페이지는 꽉 찬 상태로 표시
				setProgress(100);
			}

			// 다음 프레임에서도 계속 업데이트하도록 예약 (무한 반복 루프)
			raf = requestAnimationFrame(update);
		};

		raf = requestAnimationFrame(update); // 첫 실행

		// 컴포넌트가 사라질 때 감시 종료 (중요!)
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<div
			style={{
				position: "sticky",
				top: 0,
				left: 0,
				width: "100%",
				height: "6px",
				backgroundColor: "rgba(229, 232, 235, 0.5)",
				zIndex: 100,
				overflow: "hidden",
			}}
		>
			<div
				style={{
					width: `${progress}%`,
					height: "100%",
					background: "linear-gradient(91deg, #89a9d0 1.24%, #54759a 100%)",
					transition: "width 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
				}}
			/>
		</div>
	);
}
