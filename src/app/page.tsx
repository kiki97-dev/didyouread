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
					공지사항, <br />
					어디까지 읽어봤니?
				</h1>
				<p>
					공지사항의 구성 방식이 정보 이해도와 읽기 지속성에 <br />
					어떤 영향을 미치는지 확인하는 실험 프로젝트입니다. <br />
					아래 버튼을 눌러 공지사항을 읽고 퀴즈에 참여해 보세요.
				</p>

				{/* Link 대신 버튼 클릭 이벤트로 랜덤 라우팅 처리 */}
				<button
					className="common-btn"
					onClick={handleStart}
					style={{ cursor: "pointer", border: "none" }}
				>
					시작하기
				</button>
			</div>
		</section>
	);
}
