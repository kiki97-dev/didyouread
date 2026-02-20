"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ShareModal from "./_components/ShareModal";

/** [Constants & Types] 페이지 공통 설정 */
const SCORE_KEY = "quiz_score";

type Score = {
  correct: number;
  total: number;
  updatedAt?: number;
};

/**
 * @description 퀴즈 결과 페이지 컴포넌트
 * 로컬 스토리지의 점수를 기반으로 사용자 등급을 산출하고 결과를 표시합니다.
 */
export default function ResultPage() {
  const router = useRouter();

  /* --- [State] 상태 관리 --- */
  const [open, setOpen] = useState(false); // 공유 모달 상태
  const [loaded, setLoaded] = useState(false); // 로딩 완료 여부
  const [scoreData, setScoreData] = useState<Score>({ correct: 0, total: 0 });

  /* --- [Effect] 데이터 로드 --- */
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
      // 파싱 실패 시 초기값 유지
    } finally {
      setLoaded(true);
    }
  }, []);

  /* --- [Logic] 결과 등급 매핑 --- */
  const correct = scoreData.correct ?? 0;

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

  /** 현재 점수에 따른 결과 상수 추출 */
  const key = correct >= 2 ? 2 : correct >= 1 ? 1 : 0;
  const currentResult = resultData[key as keyof typeof resultData];

  /* --- [Handlers] 인터랙션 핸들러 --- */
  const handleRetry = () => {
    localStorage.removeItem(SCORE_KEY);
    router.push("/");
  };

  /* --- [View] 렌더링 구간 --- */
  if (!loaded) {
    return (
      <section className="main01">
        <div className="main01__inner main-common-inner" style={{ textAlign: "center", padding: "100px 20px" }}>
          결과 로딩중...
        </div>
      </section>
    );
  }

  return (
    <section className="main01">
      <div className="main01__inner main-common-inner" style={{ textAlign: "center" }}>
        {/* 결과 비주얼 */}
        <Image
          src={`/images/${currentResult.level}.png`}
          alt={currentResult.subTitle}
          width={1536}
          height={1024}
          priority
        />

        {/* 결과 텍스트 */}
        <h1>
          정답 : {correct}개 <br />
          {currentResult.subTitle}
        </h1>
        <p style={{ whiteSpace: "pre-line" }}>{currentResult.desc}</p>

        {/* 제어 버튼 */}
        <div className="result-btn-wrap">
          <button type="button" onClick={handleRetry} className="result-btn01">다시하기</button>
          <button type="button" onClick={() => setOpen(true)} className="result-btn02">공유하기</button>
        </div>

        <ShareModal
          text={currentResult.subTitle}
          open={open}
          onClose={() => setOpen(false)}
        />
      </div>
    </section>
  );
}