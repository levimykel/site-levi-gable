"use client";

import type { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import { useRef } from "react";
import { eggMessages, findEgg, toast } from "./chaos/eggs";
import { playYeaaap, randomPitch } from "./chaos/sounds";
import { toeRack } from "./chaos/ChaosLayer";

export function Logo({ title, image }: { title: string; image: ImageField | undefined }) {
  const pokes = useRef(0);

  return (
    <Link
      href="/"
      className="logo"
      aria-label={title}
      onClick={() => {
        pokes.current += 1;
        playYeaaap({ pitch: randomPitch() });
        const complaints = eggMessages("logo");
        if (pokes.current >= 3 && complaints.length > 0) {
          toast(complaints[Math.min(pokes.current - 3, complaints.length - 1)]);
        }
        if (pokes.current === 5) {
          findEgg("logo");
          toeRack();
        }
      }}
    >
      <PrismicNextImage field={image} preload fallback={<span>{title}</span>} />
    </Link>
  );
}
