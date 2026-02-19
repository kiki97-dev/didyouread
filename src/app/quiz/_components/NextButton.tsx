interface NextButtonProps {
  label: string;
  onClick: () => void;
}

/** @description 퀴즈 하단 진행 버튼 */
export default function NextButton({ label, onClick }: NextButtonProps) {
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
        fontSize: "1.6rem",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}