"use client";

type Props = {
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
};

export default function OptionList({ options, selectedIndex, onSelect }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            style={{
              padding: "15px 20px",
              borderRadius: "12px",
              border: isSelected ? "1px solid #54759a" : "1px solid #e5e8eb",
              backgroundColor: isSelected ? "rgba(84, 117, 154, 0.08)" : "#fff",
              textAlign: "left",
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              color: "#333",
              transform: isSelected ? "translateY(-1px)" : "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#54759a";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = isSelected ? "#54759a" : "#e5e8eb";
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
