"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SHOUT_EVENT } from "./ChaosLayer";
import { withCool } from "../CoolAndGood";

export type Shout = { name: string; text: string; image: ImageField; mouthX: number; mouthY: number };

type Showing = Shout & { id: number; side: "left" | "right" };

const FIRST_SHOUT_MS = 30_000;
const SHOUT_MS = 5_500;

export function Shouts({ shouts }: { shouts: Shout[] }) {
  const [showing, setShowing] = useState<Showing | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    if (shouts.length === 0) return;
    let hideTimer = 0;
    let nextTimer = 0;

    const show = (name?: string) => {
      const pool = shouts.filter((s) => !name || s.name.toLowerCase() === name.toLowerCase());
      const picked = (pool.length > 0 ? pool : shouts)[Math.floor(Math.random() * (pool.length || shouts.length))];
      if (!picked) return;
      window.clearTimeout(hideTimer);
      setShowing({ ...picked, id: nextId.current++, side: Math.random() > 0.5 ? "left" : "right" });
      hideTimer = window.setTimeout(() => setShowing(null), SHOUT_MS);
    };

    const schedule = (ms: number) => {
      nextTimer = window.setTimeout(() => {
        show();
        schedule(75_000 + Math.random() * 45_000);
      }, ms);
    };

    const onShout = (event: Event) =>
      show(event instanceof CustomEvent && typeof event.detail === "string" ? event.detail : undefined);

    window.addEventListener(SHOUT_EVENT, onShout);
    schedule(FIRST_SHOUT_MS);
    return () => {
      window.removeEventListener(SHOUT_EVENT, onShout);
      window.clearTimeout(hideTimer);
      window.clearTimeout(nextTimer);
    };
  }, [shouts]);

  if (!showing) return null;
  const { width = 1, height = 1 } = showing.image.dimensions ?? {};

  return (
    <div
      key={showing.id}
      className={`shout shout-${showing.side}`}
      role="status"
      style={{ "--ratio": width / height, "--mx": showing.mouthX / 100, "--my": showing.mouthY / 100 }}
    >
      <PrismicNextImage field={showing.image} className="shout-cutout" fallbackAlt="" />
      <p className="shout-bubble">
        <span className="shout-name">{showing.name}</span>
        {withCool(showing.text)}
      </p>
    </div>
  );
}
