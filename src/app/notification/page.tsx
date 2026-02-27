"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * @description 안내사항 페이지
 */
export default function NotificationPage() {
	const router = useRouter();

	const handleStart = () => {
		// 1. 첫 번째 퀴즈인 '1'번으로 고정
		const quizId = "1";
		// 2. A, B, C, D안 중 하나를 랜덤 결정
		const versions = ["a", "b", "c", "d"];
		const randomIndex = Math.floor(Math.random() * versions.length);
		const version = versions[randomIndex];

		// 3. 쿼리 파라미터로 전달 (/notice/1?type=a)
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
