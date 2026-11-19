"use client";

import { useEffect, useState } from "react";

export function VisitorCounter({ label }: { label: string }) {
  const [count, setCount] = useState(6669);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((c) => (Math.random() < 0.08 ? 3 : c + Math.floor(Math.random() * 40) - 9));
    }, 700);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="visitor-counter" aria-label="Visitor counter, totally accurate">
      {label}
      {String(Math.max(0, count))
        .padStart(7, "0")
        .split("")
        .map((digit, i) => (
          <span key={i} className="digit">
            {digit}
          </span>
        ))}
    </span>
  );
}
