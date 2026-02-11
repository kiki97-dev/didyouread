"use client";

import { useEffect } from "react";
import { FaInstagram, FaLink } from "react-icons/fa";
import { SiKakaotalk, SiThreads } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

type Props = {
	open: boolean;
	onClose: () => void;
	text: string;
};

export default function ShareModal({ open, onClose, text }: Props) {
	const title = "읽은 줄 알았지? 진짜 읽었는지 확인해 보기";
	const url = typeof window !== "undefined" ? window.location.href : "https://example.com";

	const shareToX = () => {
		const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
			`${title} - ${text}`
		)}&url=${encodeURIComponent(url)}`;
		window.open(shareUrl, "_blank", "noopener,noreferrer");
	};

	const shareToThreads = () => {
		const shareUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(
			`${title} ${url}`
		)}`;
		window.open(shareUrl, "_blank", "noopener,noreferrer");
	};

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
			alert("링크 복사 완료!");
		} catch {
			// 구형 브라우저 fallback
			const ta = document.createElement("textarea");
			ta.value = url;
			document.body.appendChild(ta);
			ta.select();
			document.execCommand("copy");
			document.body.removeChild(ta);
			alert("링크 복사 완료!");
		}
	};

	// ESC 닫기 + 스크롤 잠금
	useEffect(() => {
		if (!open) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKeyDown);

		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			window.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = prevOverflow;
		};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label="퀴즈 결과 공유하기"
			onClick={onClose}
			style={{
				position: "fixed",
				inset: 0,
				background: "rgba(0,0,0,0.45)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 16,
				zIndex: 9999,
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				style={{
					width: "min(520px, 100%)",
					background: "#fff",
					borderRadius: 16,
					boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
					padding: 18,
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 12,
						marginBottom: 12,
					}}
				>
					<div style={{ fontSize: 18, fontWeight: 700 }}>퀴즈 결과 공유하기</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="닫기"
						style={{
							width: 36,
							height: 36,
							borderRadius: 10,
							border: "1px solid #e5e5e5",
							background: "#fff",
							cursor: "pointer",
						}}
					>
						✕
					</button>
				</div>

				<div
					style={{
						background: "#f6f7f8",
						borderRadius: 12,
						padding: 12,
						marginBottom: 14,
						lineHeight: 1.4,
					}}
				>
					<h3
						style={{
							fontWeight: 500,
							color: "#666",
							fontSize: "1.4rem",
							marginBottom: 4,
						}}
					>
						{title}
					</h3>
					<p
						style={{
							fontWeight: 700,
							fontSize: "1.6rem",
						}}
					>
						{text}
					</p>
				</div>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(5, 1fr)",
						gap: 10,
					}}
				>
					<ShareIconButton
						icon={<SiKakaotalk size={22} />}
						label="카카오톡"
						onClick={copyLink}
					/>

					<ShareIconButton
						icon={<FaInstagram size={22} />}
						label="Instagram"
						onClick={copyLink}
					/>

					<ShareIconButton
						icon={<SiThreads size={22} />}
						label="Threads"
						onClick={shareToThreads}
					/>

					<ShareIconButton icon={<FaXTwitter size={22} />} label="X" onClick={shareToX} />

					<ShareIconButton
						icon={<FaLink size={22} />}
						label="링크복사"
						onClick={copyLink}
					/>
				</div>

				<div style={{ marginTop: 14 }}>
					<div
						style={{
							marginTop: 6,
							display: "flex",
							gap: 8,
							alignItems: "center",
						}}
					>
						<input
							readOnly
							value={url}
							style={{
								flex: 1,
								padding: "10px 12px",
								borderRadius: 10,
								border: "1px solid #e5e5e5",
								fontSize: 13,
							}}
						/>
						<button
							type="button"
							onClick={copyLink}
							style={{
								padding: "10px 12px",
								borderRadius: 10,
								border: "1px solid #e5e5e5",
								background: "#111",
								color: "#fff",
								cursor: "pointer",
								whiteSpace: "nowrap",
							}}
						>
							복사
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function ShareIconButton({
	icon,
	label,
	onClick,
}: {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				border: "1px solid #eee",
				background: "#fff",
				borderRadius: 14,
				padding: "10px 8px",
				cursor: "pointer",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 6,
			}}
		>
			<div
				style={{
					width: 44,
					height: 44,
					borderRadius: 999,
					border: "1px solid #e9e9e9",
					display: "grid",
					placeItems: "center",
				}}
			>
				{icon}
			</div>

			<div style={{ fontSize: 12, fontWeight: 500 }}>{label}</div>
		</button>
	);
}
