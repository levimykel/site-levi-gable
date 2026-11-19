"use client";

import { useEffect } from "react";
import { changeCoolLanguage, registerCoolLanguages, useCool, type CoolLanguage } from "../CoolPhrase";
import { withCool } from "../CoolAndGood";
import { toast } from "./eggs";

export function LanguageSwitcher({ languages, signOff }: { languages: CoolLanguage[]; signOff: string }) {
  const { languages: registered, language } = useCool();

  useEffect(() => registerCoolLanguages(languages), [languages]);

  return (
    <div className="language-controls">
      {signOff ? (
        <p className="header-sign-off" aria-live="polite">
          {withCool(signOff)}
        </p>
      ) : null}
      {registered.length > 1 ? (
        <select
          className="language-switcher"
          aria-label="Language"
          value={language.code}
          onChange={(event) => {
            const next = registered.find((l) => l.code === event.target.value);
            if (!next) return;
            changeCoolLanguage(next.code);
            toast(`Website translated into ${next.name}.`);
          }}
        >
          {registered.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
}
