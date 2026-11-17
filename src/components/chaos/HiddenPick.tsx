"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { findEgg, toast } from "./eggs";
import { playPowerChord } from "./sounds";

type Spot = { top: number; left: number; rotate: number; size: number };

const PICK_LINES = [
  "🎸 Nick's pick! He's been looking for that since 2023.",
  "🎸 A pick. Slightly chewed. Definitely Nick's.",
  "🎸 Found it under the sofa of the internet.",
];

export function HiddenPick() {
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
      size: 22 + Math.random() * 14,
    });
  }, [pathname]);

  if (!spot || found) return null;

  return (
    <button
      type="button"
      aria-label="A lost guitar pick"
      className="hidden-pick"
      style={{
        top: spot.top,
        left: `${spot.left}vw`,
        width: spot.size,
        height: spot.size,
        transform: `rotate(${spot.rotate}deg)`,
      }}
      onClick={() => {
        setFound(true);
        playPowerChord(1.2);
        toast(PICK_LINES[Math.floor(Math.random() * PICK_LINES.length)]);
        findEgg("pick");
      }}
    />
  );
}
