"use client";

import { useEffect, useState } from "react";
import { EGG_COUNT, EGG_EVENT, readFoundEggs } from "./eggs";

export function EggCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setCount(readFoundEggs().size);
    update();
    window.addEventListener(EGG_EVENT, update);
    return () => window.removeEventListener(EGG_EVENT, update);
  }, []);

  return (
    <span className="egg-counter" title="There are more. Keep poking.">
      🥚 Easter eggs found: {count ?? "?"}/{EGG_COUNT}
    </span>
  );
}
