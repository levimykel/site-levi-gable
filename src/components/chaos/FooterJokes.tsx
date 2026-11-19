"use client";

import { splitHidden } from "@/lib/hidden";
import { toggleSlop } from "./ChaosLayer";

export function AiDisclaimer({ text }: { text: string }) {
  const parts = splitHidden(text);
  if (!parts) return <p className="ai-disclaimer">{text}</p>;
  return (
    <p className="ai-disclaimer">
      {parts.before}
      <button type="button" className="slop-link" onClick={toggleSlop}>
        {parts.hidden}
      </button>
      {parts.after}
    </p>
  );
}
