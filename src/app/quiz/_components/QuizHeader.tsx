"use client";

type Props = {
  step: number; // 0-based
  total: number;
  timeLeft: number;
};

export default function QuizHeader({ step, total, timeLeft }: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "18px",
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "Paperlogy",
          color: "#54759a",
          fontWeight: "bold",
          fontSize: "1.1rem",
        }}
      >
        Q{step + 1}.{" "}
        <span style={{ fontSize: "0.9rem", color: "#777" }}>
          ({step + 1}/{total})
        </span>
      </p>

      <div
        style={{
          padding: "6px 10px",
          borderRadius: "10px",
          border: "1px solid #e5e8eb",
          fontSize: "0.9rem",
          fontFamily: "Paperlogy",
          color: timeLeft <= 5 ? "#c0392b" : "#333",
          backgroundColor: "#fff",
        }}
      >
        ⏱ {timeLeft}초
      </div>
    </div>
  );
}
