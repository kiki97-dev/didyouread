"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ShareModal from "./_components/ShareModal";
import Link from "next/link";

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
	const [uid, setUid] = useState<string>(""); //사용자 식별아이디

	/* --- [Effect] 데이터 로드 --- */
	useEffect(() => {
		// 클라이언트 사이드에서 UID 가져오기
		if (typeof window !== "undefined") {
			const savedUid = localStorage.getItem("user_id") || "anonymous";
			setUid(savedUid);
		}

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
		3: {
			level: "res_level_5", // 이미지 파일명은 프로젝트 상황에 맞게 조정하세요!
			subTitle: "공지계의 알파고",
			desc: "혹시 눈이 스캐너인가요?\n복잡한 줄글 속에서도 핵심만 쏙쏙 골라내는\n문해력 상위 1%의 소유자입니다.",
		},
		2: {
			level: "res_level_3",
			subTitle: "요약본 수집가",
			desc: "핵심은 잡았지만,\n디테일 하나가 스크롤과 함께 흘러가 버렸네요.",
		},
		1: {
			// 2, 3개를 포함하는 구간 (대표 키값 2)
			level: "res_level_2",
			subTitle: "스크롤 스피드레이서",
			desc: "스크롤 속도가 상당히 인상적이었어요!\n공지사항이 따라오기 힘들었을지도 모르겠네요.",
		},
		0: {
			// 0, 1개를 포함하는 구간 (대표 키값 0)
			level: "res_level_1",
			subTitle: "",
			desc: "아아.....\n눈은 분명히 움직였는데,\n의미는 끝내 머물지 않았습니다.",
		},
	};

	/** * @description 현재 점수(0~3)를 그대로 키값으로 사용
   * 점수가 3보다 크면 3으로, 0보다 작으면 0으로 고정(Clamping)
   */
  const key = correct >= 3 ? 3 : correct <= 0 ? 0 : correct;

  const currentResult = resultData[key as keyof typeof resultData];

	/* --- [Handlers] 인터랙션 핸들러 --- */
	const handleRetry = () => {
		localStorage.removeItem(SCORE_KEY);
		router.push("/");
	};

	// 구글 폼 기본 주소 (뒤에 entry ID를 확인해서 바꿔주세요!)
	const googleFormBaseUrl =
		"https://docs.google.com/forms/d/e/1FAIpQLSemKZQ7zBeBJWWiwUqZAJkUth9imjqgRqSd01G3t-EbodVuag/viewform";
	const entryId = "entry.684648950"; // 1단계에서 확인한 번호로 교체 필수!

	const feedbackLink = `${googleFormBaseUrl}?usp=pp_url&${entryId}=${uid}`;

	/* --- [View] 렌더링 구간 --- */
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
					<button type="button" onClick={handleRetry} className="result-btn01">
						다시하기
					</button>
					<button type="button" onClick={() => setOpen(true)} className="result-btn02">
						공유하기
					</button>
				</div>
				<Link
					href={feedbackLink}
					rel="noopener noreferrer"
					target="_blank"
					className="result-btn01"
				>
					1분 피드백 참여하고 스벅 쿠폰 2만원 받기 ☕
				</Link>

				<ShareModal
					text={currentResult.subTitle}
					open={open}
					onClose={() => setOpen(false)}
				/>
			</div>
		</section>
	);
}
