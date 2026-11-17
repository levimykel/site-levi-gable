"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { findEgg, toast } from "./eggs";
import { playYeaaap } from "./sounds";

type Spot = { top: number; left: number; rotate: number; size: number };

const HENRY_LINES = [
  "Henry: hangin' round",
  "Henry says hi",
  "Henry has no comment",
  "You found Henry. Henry found you first.",
];

export function HiddenHenry() {
  const pathname = usePathname();
  const [spot, setSpot] = useState<Spot | null>(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const height = document.body.scrollHeight;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- position must be random per visit, so it can only be picked on the client
    setFound(false);
    setSpot({
      top: 400 + Math.random() * Math.max(0, height - 800),
      left: Math.random() > 0.5 ? Math.random() * 6 : 92 + Math.random() * 6,
      rotate: (Math.random() - 0.5) * 120,
      size: 28 + Math.random() * 20,
    });
  }, [pathname]);

  if (!spot || found) return null;

  return (
    <button
      type="button"
      aria-label="A suspicious tiny Henry"
      className="hidden-henry"
      style={{
        top: spot.top,
        left: `${spot.left}vw`,
        width: spot.size,
        height: spot.size,
        transform: `rotate(${spot.rotate}deg)`,
      }}
      onClick={() => {
        setFound(true);
        playYeaaap({ pitch: 1.8 });
        toast(HENRY_LINES[Math.floor(Math.random() * HENRY_LINES.length)]);
        findEgg("hidden_henry");
      }}
    />
  );
}
