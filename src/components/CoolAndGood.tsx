import { Fragment } from "react";
import { CoolPhrase } from "./CoolPhrase";

export function withCool(text: string) {
  return text.split("{cool}").map((part, i) => (
    <Fragment key={i}>
      {i > 0 ? <CoolPhrase /> : null}
      {part}
    </Fragment>
  ));
}
