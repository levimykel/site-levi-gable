"use client";

import { useEffect, useState } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { findEgg } from "@/components/chaos/eggs";
import { playYeaaap, randomPitch } from "@/components/chaos/sounds";

export type YeaaapButtonProps = SliceComponentProps<Content.YeaaapButtonSlice>;

const STORAGE_KEY = "mrs:yeaaaps";

export default function YeaaapButton({ slice }: YeaaapButtonProps) {
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(STORAGE_KEY));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable on the client
      if (Number.isFinite(stored)) setCount(stored);
    } catch {}
  }, []);

  const label = slice.primary.label || "Yeaaap!";
  const counterText = slice.primary.counter_text || "You have yeaaaped {count} times.";

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="yeaaap">
      <button
        type="button"
        className={`yeaaap-button ${pressed ? "pressed" : ""}`}
        onClick={() => {
          const next = count + 1;
          setCount(next);
          setPressed(true);
          window.setTimeout(() => setPressed(false), 300);
          try {
            localStorage.setItem(STORAGE_KEY, String(next));
          } catch {}
          playYeaaap({ pitch: next % 10 === 0 ? 0.5 : randomPitch() });
          if (next >= 50) findEgg("yeaaap");
          document.documentElement.style.setProperty("--yeaaap-tilt", String(Math.min(next, 720)));
        }}
      >
        {label.split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </button>
      <p className="yeaaap-count">{counterText.replace("{count}", String(count))}</p>
    </section>
  );
}
