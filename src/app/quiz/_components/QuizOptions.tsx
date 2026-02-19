interface QuizOptionsProps {
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  phase: "quiz" | "review";
  onSelect: (index: number) => void;
}

/** @description 퀴즈 선택지 버튼 리스트 (채점 결과 포함) */
export default function QuizOptions({
  options,
  selectedIndex,
  correctIndex,
  phase,
  onSelect,
}: QuizOptionsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const showReview = phase === "review";
        const isAnswer = index === correctIndex;
        const isPicked = selectedIndex === index;

        // 기본 스타일 설정
        let borderColor = isSelected ? "#54759a" : "#e5e8eb";
        let backgroundColor = isSelected ? "rgba(84, 117, 154, 0.08)" : "#fff";

        // 해설 단계일 때 색상 덮어쓰기
        if (showReview) {
          if (isAnswer) {
            borderColor = "#2ecc71";
            backgroundColor = "rgba(46, 204, 113, 0.12)";
          } else if (isPicked && !isAnswer) {
            borderColor = "#e74c3c";
            backgroundColor = "rgba(231, 76, 60, 0.10)";
          } else {
            borderColor = "#e5e8eb";
            backgroundColor = "#fff";
          }
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            style={{
              padding: "15px 20px",
              borderRadius: "12px",
              border: `1px solid ${borderColor}`,
              backgroundColor,
              textAlign: "left",
              fontSize: "1.6rem",
              cursor: showReview ? "default" : "pointer",
              transition: "all 0.2s ease",
              color: "#333",
              transform: isSelected && !showReview ? "translateY(-1px)" : "none",
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}