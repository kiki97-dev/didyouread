/** @description 원본 퀴즈 데이터의 형식을 정의합니다. */
export type RawQuizItem = {
	question: string;
	correct: string;
	wrong: string[];
	explain: string;
};

/* 원본 퀴즈 데이터 */
export const allQuizData: Record<string, any> = {
	"1": [
		{
			question: "변경 후 환불 신청 가능 기간은 상품 수령일로부터 며칠 이내인가요?",
			correct: "7일",
			wrong: ["3일", "14일", "30일"],
			explain: "",
		},
		{
			question: "신용카드로 결제한 상품의 환불 처리 기간은?",
			correct: "영업일 기준 3~5일",
			wrong: ["영업일 기준 1~2일", "영업일 기준 2~3일", "영업일 기준 7~10일"],
			explain: "",
		},
		{
			question: "다음 중 환불이 불가한 경우로 올바른 것은?",
			correct: "개봉하여 사용한 위생용품",
			wrong: [
				"배송 중 파손된 상품",
				"색상·사이즈 불만족으로 미개봉 상태인 상품",
				"상품 설명과 현저히 다른 상품",
			],
			explain: "",
		},
	],
	"2": [
		{
			question: "개편 후 마켓플로 회원 등급은 총 몇 단계인가요?",
			correct: "3단계",
			wrong: ["2단계", "4단계", "5단계"],
			explain: "",
		},
		{
			question: "기존 골드 등급 회원은 9월 1일 이후 어떤 등급으로 자동 전환되나요?",
			correct: "ROYAL",
			wrong: ["BASIC", "PRIME", "등급이 초기화됨"],
			explain: "",
		},
		{
			question: "PRIME 등급이 되기 위한 조건으로 올바른 것은?",
			correct: "누적 구매 금액 100만 원 이상이면서 구매 횟수 20회 이상",
			wrong: [
				"누적 구매 금액 100만 원 이상 또는 구매 횟수 20회 이상",
				"누적 구매 금액 30만 원 이상이면서 구매 횟수 20회 이상",
				"누적 구매 금액 100만 원 이상 (횟수 무관)",
			],
			explain: "",
		},
	],
};
