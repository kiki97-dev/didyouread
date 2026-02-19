interface QuizHeaderProps {
  currentStep: number;
  total: number;
  timeLeft: number;
}

/** @description 퀴즈 진행도와 남은 시간을 표시하는 상단 바 */
export default function QuizHeader({ currentStep, total, timeLeft }: QuizHeaderProps) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "4px",
    }}>
      <p style={{
        margin: 0,
        fontFamily: "Paperlogy",
        color: "#54759a",
        fontWeight: "bold",
        fontSize: "1.8rem",
      }}>
        Q{currentStep + 1}.{" "}
        <span style={{ fontSize: "1.8rem", color: "#777" }}>
          ({currentStep + 1}/{total})
        </span>
      </p>

      <div style={{
        padding: "6px 10px",
        borderRadius: "10px",
        border: "1px solid #e5e8eb",
        fontSize: "1.6rem",
        fontFamily: "Paperlogy",
        color: timeLeft <= 5 ? "#c0392b" : "#333", // 5초 이하면 빨간색
        backgroundColor: "#fff",
      }}>
        ⏱ {Math.max(timeLeft, 0)}초
      </div>
    </div>
  );
}