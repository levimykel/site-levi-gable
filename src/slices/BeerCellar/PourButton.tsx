"use client";

import { beerRain } from "@/components/chaos/ChaosLayer";
import { findEgg, toast } from "@/components/chaos/eggs";

export function PourButton({ label, message }: { label: string; message: string }) {
  return (
    <button
      type="button"
      className="chaos-button pour-button"
      onClick={() => {
        beerRain();
        toast(message);
        findEgg("beer");
      }}
    >
      {label}
    </button>
  );
}
