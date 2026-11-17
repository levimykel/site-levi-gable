"use client";

import type { ReactNode } from "react";
import type { TriggerName } from "./triggers";
import { bassDrop, desertRockRegion, drumFill, falling, feedback, frescoYBueno, shout, toeRack } from "./ChaosLayer";

const ACTIONS: Record<TriggerName, () => void> = {
  mrs: feedback,
  martin: bassDrop,
  vincent: drumFill,
  desert: desertRockRegion,
  fresco: frescoYBueno,
  falling,
  toerack: toeRack,
};

export function EggTrigger({ egg, children }: { egg: TriggerName; children: ReactNode }) {
  return (
    <span role="button" tabIndex={-1} className="egg-trigger" onClick={() => ACTIONS[egg]()}>
      {children}
    </span>
  );
}

export function ShoutTrigger({ name, children }: { name: string; children: ReactNode }) {
  return (
    <span role="button" tabIndex={-1} className="egg-trigger" onClick={() => shout(name)}>
      {children}
    </span>
  );
}
