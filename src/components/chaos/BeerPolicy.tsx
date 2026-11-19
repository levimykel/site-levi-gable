"use client";

import { useEffect, useState } from "react";
import { findEgg, sayEgg, toast } from "./eggs";
import { playBurp } from "./sounds";

const STORAGE_KEY = "mrs:beer-policy";

export type BeerPolicyText = {
  text: string;
  textAgain: string;
  accept: string;
  alsoAccept: string;
  decline: string;
  declineMessage: string;
};

export function BeerPolicy({ text }: { text: BeerPolicyText }) {
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {}
    const timer = window.setTimeout(() => setOpen(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open || !text.text) return null;

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "accepted, obviously");
    } catch {}
  };

  return (
    <div className="beer-policy" role="dialog" aria-label="Beer policy">
      <p>{round === 0 ? text.text : text.textAgain || text.text}</p>
      <div className="beer-policy-buttons">
        <button type="button" onClick={close}>
          {text.accept}
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
            sayEgg("cookies");
            close();
          }}
        >
          {text.alsoAccept}
        </button>
        <button
          type="button"
          className="decline"
          onMouseEnter={(event) => {
            const button = event.currentTarget;
            button.style.transform = `translate(${(Math.random() - 0.5) * 300}px, ${(Math.random() - 0.5) * 120}px)`;
          }}
          onClick={() => toast(text.declineMessage)}
        >
          {text.decline}
        </button>
      </div>
    </div>
  );
}
