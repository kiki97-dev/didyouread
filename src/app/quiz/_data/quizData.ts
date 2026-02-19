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
			question: "교육 일정 \n 이번 워크숍은 언제 진행되나요?",
			correct: "3월 22일 (금)",
			wrong: ["3월 10일 (월)", "3월 15일 (토)"],
			explain: "교육은 2026년 3월 22일 (금요일) 13:00~18:00에 진행됩니다.",
		},
		{
			question: "할인 혜택 \n 얼리버드 할인을 받으려면 언제까지 결제를 완료해야 하나요?",
			correct: "3월 10일까지",
			wrong: ["3월 5일까지", "3월 15일까지"],
			explain: "얼리버드 할인은 2026년 3월 10일 (월) 23:59까지 결제 완료 시 적용됩니다.",
		},
		{
			question: "수강료\n얼리버드 할인가는 얼마인가요?",
			correct: "144,000원",
			wrong: ["160,000원", "180,000원"],
			explain: "정가 180,000원에서 20% 할인된 144,000원입니다.",
		},
	],
	"2": [
		{
			question: "4월 1일 이후에도 복지포인트를 계속 쓸 수 있는 곳은?",
			correct: "헬스장",
			wrong: ["영화관", "서점", "여행사"],
			explain: "건강관리 항목에 포함",
		},
		{
			question: "영화 보러 갈 때 복지포인트를 쓰려면 언제까지 써야 하나?",
			correct: "3월 말까지",
			wrong: ["2월 말까지", "4월 말까지", "언제든지 가능"],
			explain: "",
		},
		{
			question: "이번 변경으로 복지포인트를 쓸 수 있는 항목이 몇 개로 줄어드나?",
			correct: "2개",
			wrong: ["1개", "5개", "7개"],
			explain: "자기계발, 건강관리",
		},
	],
};
