"use client";

import { useState } from "react";
import { toggleSlop } from "./ChaosLayer";

const SIGN_OFFS = {
  ES: "Stay fresco y bueno.",
  FR: "Restez fraise et bonne.",
  EN: "Stay cool and good.",
} as const;

const LANGUAGES = ["ES", "FR", "EN"] as const;

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

export function SignOff() {
  const [language, setLanguage] = useState<(typeof LANGUAGES)[number]>("ES");

  return (
    <div className="sign-off">
      <p>{SIGN_OFFS[language]}</p>
      <div className="translate" role="group" aria-label="Translate the website">
        <span>🌐 Translate entire website:</span>
        {LANGUAGES.map((code) => (
          <button key={code} type="button" aria-pressed={code === language} onClick={() => setLanguage(code)}>
            {code}
          </button>
        ))}
      </div>
    </div>
  );
}
