export type RawQuizItem = {
  question: string;
  correct: string;
  wrong: [string, string, string];
};

export const allQuizData: Record<string, RawQuizItem[]> = {
  "1": [
    {
      question: "개정된 이용약관의 효력 발생일은 언제인가요?",
      correct: "2026년 3월 15일",
      wrong: ["2026년 3월 1일", "2026년 4월 1일", "2026년 5월 1일"],
    },
    {
      question: "보안 강화를 위해 변경된 접속 로그 보관 주기는?",
      correct: "1년",
      wrong: ["3개월", "6개월", "무제한"],
    },
    {
      question: "약관 개정에 동의하지 않을 경우 사용자의 선택은?",
      correct: "회원 탈퇴",
      wrong: ["고객센터 전화", "이메일 문의", "유료 결제"],
    },
  ],
  "2": [
    {
      question: "공지사항 2번 관련 퀴즈 질문을 여기에?",
      correct: "정답 선택지",
      wrong: ["오답 1", "오답 2", "오답 3"],
    },
  ],
};
