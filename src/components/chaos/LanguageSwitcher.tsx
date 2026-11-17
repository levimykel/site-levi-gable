"use client";

import { useEffect, useState } from "react";
import { COOL_LANGUAGES } from "../CoolAndGood";
import { toast } from "./eggs";

type Language = keyof typeof COOL_LANGUAGES;

const STORAGE_KEY = "mrs:lang";
const LANGUAGES = Object.keys(COOL_LANGUAGES).filter((l): l is Language => l in COOL_LANGUAGES);

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {}
    const initial = LANGUAGES.find((l) => l === saved);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the saved language only exists in the browser
    if (initial) setLanguage(initial);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.cool = language;
  }, [language]);

  return (
    <div className="language-switcher" role="group" aria-label="Language">
      <span aria-hidden="true">🌐</span>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={code === language}
          onClick={() => {
            setLanguage(code);
            try {
              localStorage.setItem(STORAGE_KEY, code);
            } catch {}
            toast(`🌐 Website translated. 1 phrase changed. You're welcome.`);
          }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
