"use client";

import { toggleSlop } from "./ChaosLayer";

export function AiDisclaimer() {
  return (
    <p className="ai-disclaimer">
      No AIs were harmed in the making of this website (several were{" "}
      <button type="button" className="slop-link" onClick={toggleSlop}>
        bullied
      </button>
      ).
    </p>
  );
}
