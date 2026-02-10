"use client";

type Props = {
  isLast: boolean;
  onClick: () => void;
};

export default function NextButton({ isLast, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        marginTop: "22px",
        width: "100%",
        padding: "14px 16px",
        borderRadius: "12px",
        border: "none",
        backgroundColor: "#54759a",
        color: "#fff",
        fontSize: "1rem",
        cursor: "pointer",
      }}
    >
      {isLast ? "완료" : "다음"}
    </button>
  );
}
