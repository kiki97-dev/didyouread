"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	const handleStart = () => {
		// 1. 첫 번째 퀴즈인 '1'번으로 고정
		const quizId = "1";
		// 2. A안 또는 B안 랜덤 결정
		const version = Math.random() < 0.5 ? "a" : "b";

		// 3. 쿼리 파라미터로 전달 (/notice/1?type=a)
		router.push(`/notice/${quizId}?type=${version}`);
	};

	return (
		<section className="main01">
			<div className="main01__inner main-common-inner">
				<Image src="/images/main01.png" alt="설명 문구" width={1536} height={1024} />
				<h1>
					읽은 줄 알았지? <br />
					진짜 읽었는지 확인해 보기
				</h1>
				<p>
					공지사항 읽는 척만 하고 있진 않으신가요? <br />
					지금 바로 확인해 보세요! <br />
					<br />
					실제 공지 형식으로 만든 2개의 글, <br />
					읽고 나면 짧은 퀴즈가 기다리고 있어요.
				</p>

				{/* Link 대신 버튼 클릭 이벤트로 랜덤 라우팅 처리 */}
				<button
					className="common-btn"
					onClick={handleStart}
					style={{ cursor: "pointer", border: "none" }}
				>
					지금 도전하기
				</button>

				<p>데모 버전 · 총 2문항</p>
			</div>
		</section>
	);
}
