"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
	const searchParams = useSearchParams();

	// 퀴즈 페이지에서 넘겨준 정답 개수 (기본값 0)
	const score = Number(searchParams.get("score") || "0");

	// 점수별 데이터 매핑
	const resultData = {
		2: {
			level: "res_level_3",
			title: "2개",
			subTitle: "공지계의 알파고",
			desc: "당신의 눈은 스캐너인가요?\n복잡한 줄글 속에서도 핵심만 쏙쏙 골라내는\n문해력 상위 1%의 소유자입니다.",
		},
		1: {
			level: "res_level_2",
			title: "1개",
			subTitle: "요약본 수집가",
			desc: "중요 정보 하나는 건졌지만,\n나머지 하나는 스크롤과 함께 흘려보냈군요.\n2% 부족한 당신, 세 줄 요약이 시급합니다!",
		},
		0: {
			level: "res_level_1",
			title: "0개",
			subTitle: "스크롤 스피드레이서",
			desc: "읽긴 읽으셨나요?\n혹시 마우스 휠만 광속으로 돌린 건 아니시죠?\n당신에게 공지사항은 그저 빠르게 스쳐 지나가는 풍경일 뿐...",
		},
	};

	// 점수에 해당하는 데이터 선택 (범위 외 점수는 0점 처리)
	const currentResult = resultData[score as keyof typeof resultData] || resultData[0];

	return (
		<section className="main01">
			<div className="main01__inner main-common-inner" style={{ textAlign: "center" }}>
				{/* 캐릭터 이미지 */}
				<Image
					src={`/images/${currentResult.level}.png`}
					alt={currentResult.subTitle}
					width={1536}
					height={1024}
					priority
				/>

				{/* 정답 개수 타이틀 */}

				{/* 결과 등급명 */}
				<h1>
					정답 : {currentResult.title} <br />
					{currentResult.subTitle}
				</h1>

				{/* 결과 설명 문구 */}
				<p>{currentResult.desc}</p>

				{/* 다시 하기 버튼 (기존 common-btn 스타일 유지) */}
				<a
					href="/"
					className="common-btn"
					style={{ display: "inline-block", marginTop: "30px", textDecoration: "none" }}
				>
					다시 테스트하기
				</a>
			</div>
		</section>
	);
}
