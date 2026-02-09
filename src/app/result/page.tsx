"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

// useSearchParams를 사용하는 부분을 별도 컴포넌트로 분리
function ResultContent() {
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

  const currentResult = resultData[score as keyof typeof resultData] || resultData[0];

  return (
    <div className="main01__inner main-common-inner" style={{ textAlign: "center" }}>
      {/* 캐릭터 이미지 */}
      <Image
        src={`/images/${currentResult.level}.png`}
        alt={currentResult.subTitle}
        width={1536}
        height={1024}
        priority
      />

      {/* 결과 타이틀 */}
      <h1>
        정답 : {currentResult.title} <br />
        {currentResult.subTitle}
      </h1>

      {/* 결과 설명 문구: whiteSpace 추가로 줄바꿈 적용 */}
      <p style={{ whiteSpace: "pre-line" }}>{currentResult.desc}</p>

      {/* 다시 하기 버튼 */}
      <Link href="/" className="common-btn" style={{ display: "inline-block", textDecoration: "none" }}>
        다시 테스트하기
      </Link>
    </div>
  );
}

// 빌드 에러 방지를 위한 Suspense 래핑
export default function ResultPage() {
  return (
    <section className="main01">
      <Suspense fallback={<div style={{ textAlign: "center", padding: "100px" }}>결과를 분석 중입니다...</div>}>
        <ResultContent />
      </Suspense>
    </section>
  );
}