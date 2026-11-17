"use client";

import { useState } from "react";
import { toast } from "@/components/chaos/eggs";
import { playYeaaap, randomPitch } from "@/components/chaos/sounds";

const EXCUSES = [
  "🛒 There is no cart. There was never a cart.",
  "🛒 Added to cart! (The cart is Nick's backpack.)",
  "🛒 Payment accepted in euros, beer, or a decent fuzz pedal.",
  "🛒 Checkout is at the merch table, after the show, if Martin remembered the box.",
  "🛒 Error 418: the merch guy is at the bar.",
];

export function CartButton({ disabled }: { disabled: boolean }) {
  const [clicks, setClicks] = useState(0);

  return (
    <button
      type="button"
      className="chaos-button cart-button"
      disabled={disabled}
      onClick={() => {
        setClicks((c) => c + 1);
        playYeaaap({ pitch: randomPitch() });
        toast(EXCUSES[clicks % EXCUSES.length]);
      }}
    >
      {disabled ? "gone forever" : clicks > 0 ? `in cart ×${clicks}` : "add to cart"}
    </button>
  );
}
