"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { findEgg, toast } from "./chaos/eggs";
import { playYeaaap, randomPitch } from "./chaos/sounds";

const COMPLAINTS = ["ow", "OW", "please stop", "I'm calling my manager", "fine. FINE."];

export function Logo({ title }: { title: string }) {
  const pokes = useRef(0);

  return (
    <Link
      href="/"
      className="logo"
      onClick={() => {
        pokes.current += 1;
        playYeaaap({ pitch: randomPitch() });
        if (pokes.current >= 3) toast(COMPLAINTS[Math.min(pokes.current - 3, COMPLAINTS.length - 1)]);
        if (pokes.current === 5) findEgg("logo");
      }}
    >
      <Image src="/mrs-logo.jpg" alt={title} width={150} height={150} preload />
    </Link>
  );
}
