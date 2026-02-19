interface QuizReviewProps {
  isCorrect: boolean | null;
  explain: string;
}

/** @description 정답 여부와 해설 내용을 보여주는 박스 */
export default function QuizReview({ isCorrect, explain }: QuizReviewProps) {
  return (
    <div
      style={{
        marginTop: "18px",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #e5e8eb",
        backgroundColor: "#fafafa",
        fontFamily: "Paperlogy",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          marginBottom: "8px",
          fontSize: "1.6rem",
        }}
      >
        {isCorrect ? "✅ 정답입니다!" : "❌ 오답입니다."}
      </div>

      <div
        style={{
          whiteSpace: "pre-line",
          fontSize: "1.5rem",
          color: "#444",
        }}
      >
        {explain}
      </div>
    </div>
  );
}