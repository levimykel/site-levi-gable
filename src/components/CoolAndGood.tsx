import { Fragment } from "react";

export const COOL_LANGUAGES = {
  es: "fresco y bueno",
  fr: "frais et bon",
  en: "cool and good",
} as const;

export function CoolAndGood() {
  return (
    <span className="cool-and-good">
      {Object.entries(COOL_LANGUAGES).map(([lang, text]) => (
        <span key={lang} lang={lang} data-cool={lang}>
          {text}
        </span>
      ))}
    </span>
  );
}

export function withCool(text: string) {
  return text.split("{cool}").map((part, i) => (
    <Fragment key={i}>
      {i > 0 ? <CoolAndGood /> : null}
      {part}
    </Fragment>
  ));
}
