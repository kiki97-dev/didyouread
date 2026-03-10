"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * @description 안내사항 페이지
 */
export default function NotificationPage() {
	const router = useRouter();

	const handleStart = () => {
		// window 객체 존재 확인 (빌드 에러 방지)
		if (typeof window !== "undefined") {
			// 1. 사용자 식별 ID(UID) 관리
			let uid = localStorage.getItem("user_id");

			if (!uid) {
				// 2. UUID 생성 (지원 안 하는 구형 브라우저 대비 로직 포함 가능)
				uid = window.crypto?.randomUUID?.() || Math.random().toString(36).substring(2);
				localStorage.setItem("user_id", uid);
			}
		}

		const quizId = "1";
		const versions = ["a", "b"];
		const version = versions[Math.floor(Math.random() * versions.length)];

		router.push(`/notice/${quizId}?type=${version}`);
	};

	return (
		<section className="main01">
			<div className="main01__inner main-common-inner">
				<Image src="/images/notification01.png" alt="알림" width={1536} height={1024} />
				<h1>
					📢 <br />
					안내사항
				</h1>
				<p>
					시작하면 뒤로 갈 수 없어요. <br />
					실제 공지 읽듯이 쭉 읽어주세요!
				</p>

				<button
					className="common-btn"
					onClick={handleStart}
					style={{ cursor: "pointer", border: "none" }}
				>
					확인
				</button>
			</div>
		</section>
	);
}
