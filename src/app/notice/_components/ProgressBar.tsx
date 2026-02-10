"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;

      if (scrollHeight > 0) {
        setProgress((scrollTop / scrollHeight) * 100);
      } else {
        // 스크롤 불가(짧은 글)일 때 표시 정책: 100 또는 0
        setProgress(100);
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        height: "6px",
        backgroundColor: "rgba(229, 232, 235, 0.5)",
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: "linear-gradient(91deg, #89a9d0 1.24%, #54759a 100%)",
          transition: "width 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
      />
    </div>
  );
}
