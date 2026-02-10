"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const SCORE_KEY = "quiz_score";

type Score = {
  correct: number;
  total: number;
  updatedAt?: number;
};

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ localStorage 점수
  const [scoreData, setScoreData] = useState<Score>({ correct: 0, total: 0 });

  useEffect(() => {
    // (fallback) 기존 query score가 있으면 임시로 읽을 수도 있음
    // 하지만 최종은 localStorage를 기준으로!
    const queryScore = Number(searchParams.get("score") || "0");

    try {
      const raw = localStorage.getItem(SCORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setScoreData({
          correct: Number(parsed.correct) || 0,
          total: Number(parsed.total) || 0,
          updatedAt: parsed.updatedAt,
        });
        return;
      }
    } catch {}

    // localStorage 값이 없으면 queryScore라도 보여주기(원치 않으면 제거 가능)
    setScoreData({ correct: queryScore, total: queryScore ? queryScore : 0 });
  }, [searchParams]);

  const correct = scoreData.correct ?? 0;
  const total = scoreData.total ?? 0;

  // ✅ 점수별 데이터 매핑 (기존 0~2 기준 + 누적 대응)
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

  // ✅ 누적 점수일 때: 2 이상이면 최상급으로 고정(최소 변경)
  const key = correct >= 2 ? 2 : correct >= 1 ? 1 : 0;
  const currentResult = resultData[key as keyof typeof resultData];

  const handleRetry = () => {
    // ✅ 점수 초기화
    localStorage.removeItem(SCORE_KEY);
    // 필요하면 다른 누적 데이터도 여기서 같이 제거
    router.push("/");
  };

  return (
    <div className="main01__inner main-common-inner" style={{ textAlign: "center" }}>
      <Image
        src={`/images/${currentResult.level}.png`}
        alt={currentResult.subTitle}
        width={1536}
        height={1024}
        priority
      />

      <h1>
        정답 : {correct}개 <br />
        {currentResult.subTitle}
      </h1>

      <p style={{ whiteSpace: "pre-line" }}>{currentResult.desc}</p>

      {/* ✅ 다시 하기: 버튼으로 처리(초기화 로직 포함) */}
      <button
        type="button"
        onClick={handleRetry}
        className="common-btn"
        style={{
          display: "inline-block",
          textDecoration: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        다시 테스트하기
      </button>
    </div>
  );
}

export default function ResultPage() {
  return (
    <section className="main01">
      <Suspense fallback={<div style={{ textAlign: "center", padding: "100px" }}>결과를 분석 중입니다...</div>}>
        <ResultContent />
      </Suspense>
    </section>
  );
}
