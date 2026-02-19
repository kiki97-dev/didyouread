interface QuizQuestionProps {
  question: string;
}

/** @description 퀴즈의 질문 텍스트를 출력하는 컴포넌트 */
export default function QuizQuestion({ question }: QuizQuestionProps) {
  return (
    <h2
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        lineHeight: "1.3",
        marginBottom: "22px",
        wordBreak: "keep-all",
        fontFamily: "Paperlogy",
        color: "#333",
        whiteSpace: "pre-line", // 줄바꿈(\n) 적용을 위해 필수!
      }}
    >
      {question}
    </h2>
  );
}