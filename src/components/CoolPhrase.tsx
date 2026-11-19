"use client";

import { useSyncExternalStore } from "react";

export type CoolLanguage = {
  code: string;
  label: string;
  name: string;
  phrase: string;
};

type CoolState = { languages: CoolLanguage[]; selected: string };

const STORAGE_KEY = "mrs:lang";
const FALLBACK: CoolLanguage = {
  code: "es",
  label: "ES",
  name: "Spanish",
  phrase: "fresco y bueno",
};
const SERVER_STATE: CoolState = {
  languages: [FALLBACK],
  selected: FALLBACK.code,
};

let state: CoolState = SERVER_STATE;
const listeners = new Set<() => void>();

function emit(next: CoolState) {
  state = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readSaved() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function registerCoolLanguages(languages: CoolLanguage[]) {
  if (languages.length === 0) return;
  const saved = readSaved();
  const selected = languages.some((l) => l.code === saved) ? saved : languages[0].code;
  emit({ languages, selected: selected ?? languages[0].code });
}

export function changeCoolLanguage(code: string) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {}
  emit({ ...state, selected: code });
}

export function useCool() {
  const current = useSyncExternalStore(
    subscribe,
    () => state,
    () => SERVER_STATE,
  );
  const language = current.languages.find((l) => l.code === current.selected) ?? current.languages[0] ?? FALLBACK;
  return { languages: current.languages, language };
}

export function CoolPhrase() {
  const { language } = useCool();
  return (
    <span className="cool-and-good" lang={language.code}>
      {language.phrase}
    </span>
  );
}
