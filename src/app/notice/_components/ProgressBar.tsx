"use client";

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div style={{
      position: "sticky", top: 0, left: 0, width: "100%", height: "6px",
      backgroundColor: "rgba(229, 232, 235, 0.5)", zIndex: 100, overflow: "hidden"
    }}>
      <div style={{
        width: `${progress}%`, height: "100%",
        background: "linear-gradient(91deg, #89a9d0 1.24%, #54759a 100%)",
        transition: "width 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }} />
    </div>
  );
}