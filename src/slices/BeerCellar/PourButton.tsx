"use client";

import { beerRain } from "@/components/chaos/ChaosLayer";
import { findEgg, toast } from "@/components/chaos/eggs";

export function PourButton({ name }: { name: string }) {
  return (
    <button
      type="button"
      className="chaos-button pour-button"
      onClick={() => {
        beerRain();
        toast(`🍺 Poured one ${name ? `${name} ` : ""}for you. And one for us.`);
        findEgg("beer");
      }}
    >
      pour one
    </button>
  );
}
