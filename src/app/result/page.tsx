"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SCORE_KEY = "quiz_score";

type Score = {
  correct: number;
  total: number;
  updatedAt?: number;
};

export default function ResultPage() {
  const router = useRouter();

  const [loaded, setLoaded] = useState(false);
  const [scoreData, setScoreData] = useState<Score>({ correct: 0, total: 0 });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SCORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setScoreData({
          correct: Number(parsed.correct) || 0,
          total: Number(parsed.total) || 0,
          updatedAt: parsed.updatedAt,
        });
      }
    } catch {
      // 파싱 실패 시 0점 유지
    } finally {
      setLoaded(true);
    }
  }, []);

  const correct = scoreData.correct ?? 0;
  const total = scoreData.total ?? 0;

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

  const key = correct >= 2 ? 2 : correct >= 1 ? 1 : 0;
  const currentResult = resultData[key as keyof typeof resultData];

  const handleRetry = () => {
    localStorage.removeItem(SCORE_KEY);
    router.push("/");
  };

  if (!loaded) {
    return (
      <section className="main01">
        <div
          className="main01__inner main-common-inner"
          style={{ textAlign: "center", padding: "100px 20px" }}
        >
          결과 로딩중...
        </div>
      </section>
    );
  }

  return (
    <section className="main01">
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
    </section>
  );
}
