"use client";

import { useEffect } from "react";
import { findEgg } from "./eggs";

export function LostEgg() {
  useEffect(() => findEgg("lost"), []);
  return null;
}
