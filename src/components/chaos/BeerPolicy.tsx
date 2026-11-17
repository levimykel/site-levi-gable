"use client";

import { useEffect, useState } from "react";
import { findEgg, toast } from "./eggs";
import { playBurp } from "./sounds";

const STORAGE_KEY = "mrs:beer-policy";

export function BeerPolicy() {
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    const timer = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "accepted, obviously");
    } catch {}
  };

  return (
    <div className="beer-policy" role="dialog" aria-label="Beer policy">
      <p>
        {round === 0
          ? "🍺 This website uses beer to improve your experience. By continuing you agree to have one more."
          : "🍺 Are you sure? This is the last one. (It is not the last one.)"}
      </p>
      <div className="beer-policy-buttons">
        <button type="button" onClick={close}>
          Accept
        </button>
        <button
          type="button"
          onClick={() => {
            playBurp();
            if (round === 0) {
              setRound(1);
              return;
            }
            findEgg("cookies");
            toast("🍻 Policy accepted twice. Respect.");
            close();
          }}
        >
          Also accept
        </button>
        <button
          type="button"
          className="decline"
          onMouseEnter={(event) => {
            const button = event.currentTarget;
            button.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 120}px)`;
          }}
          onClick={() => toast("❌ Declining is not supported in this country.")}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
