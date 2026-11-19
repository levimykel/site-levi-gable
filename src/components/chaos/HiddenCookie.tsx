"use client";

import { useState } from "react";
import { cookieJar } from "./ChaosLayer";

export function HiddenCookie() {
  const [eaten, setEaten] = useState(false);
  if (eaten) return null;
  return (
    <button
      type="button"
      aria-label="A cookie someone dropped behind the merch table"
      className="hidden-cookie"
      onClick={() => {
        setEaten(true);
        cookieJar();
      }}
    >
      🍪
    </button>
  );
}
