"use client";

interface QuizModalProps {
	onConfirm: () => void;
}

export default function QuizModal({ onConfirm }: QuizModalProps) {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.4)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				zIndex: 1000,
				padding: "20px",
			}}
		>
			<div
				style={{
					backgroundColor: "#fff",
					padding: "30px 20px",
					borderRadius: "20px",
					width: "100%",
					maxWidth: "400px",
					textAlign: "center",
					boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
					animation: "modalUp 0.4s ease-out",
				}}
			>
				<h3 style={{ marginBottom: "20px", fontSize: "1.2rem", fontWeight: "bold" }}>
					📖 읽기 완료!
				</h3>
				<p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "20px", lineHeight: "1.4" }}>
					내용을 모두 확인하셨나요?
					<br />
					본문 내용을 바탕으로 퀴즈를 풀어보세요.
				</p>
				<button
					onClick={onConfirm}
					style={{
						width: "100%",
						padding: "14px",
						borderRadius: "12px",
						backgroundColor: "#54759a",
						color: "#fff",
						border: "none",
						fontSize: "0.9rem",
						fontWeight: "500",
						cursor: "pointer",
					}}
				>
					퀴즈 풀러 가기
				</button>
			</div>
			<style jsx>{`
				@keyframes modalUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}
