"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { eggMessages, findEgg, toast } from "./eggs";
import { playPowerChord } from "./sounds";

type Spot = { top: number; left: number; rotate: number; size: number };

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
        const messages = eggMessages("pick");
        const lines = messages.filter((line) => !line.includes("{count}"));
        const tally = messages.find((line) => line.includes("{count}"));
        if (lines.length > 0) toast(lines[Math.floor(Math.random() * lines.length)]);
        const returned = returnPick();
        if (returned > 1 && tally) {
          toast(tally.replaceAll("{count}", String(returned)).replaceAll("{more}", String(returned + 1)));
        }
        findEgg("pick");
      }}
    />
  );
}

const PICKS_KEY = "mrs:picks";

function returnPick() {
  try {
    const returned = (Number(localStorage.getItem(PICKS_KEY)) || 0) + 1;
    localStorage.setItem(PICKS_KEY, String(returned));
    return returned;
  } catch {
    return 1;
  }
}
