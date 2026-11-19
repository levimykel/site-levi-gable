"use client";

import { useState } from "react";
import { toast } from "@/components/chaos/eggs";
import { playYeaaap, randomPitch } from "@/components/chaos/sounds";

type CartLabels = { add: string; inCart: string; soldOut: string };

export function CartButton({
  disabled,
  labels,
  messages,
}: {
  disabled: boolean;
  labels: CartLabels;
  messages: string[];
}) {
  const [clicks, setClicks] = useState(0);

  return (
    <button
      type="button"
      className="chaos-button cart-button"
      disabled={disabled}
      onClick={() => {
        setClicks((c) => c + 1);
        playYeaaap({ pitch: randomPitch() });
        if (messages.length > 0) toast(messages[clicks % messages.length]);
      }}
    >
      {disabled ? labels.soldOut : clicks > 0 ? labels.inCart.replaceAll("{count}", String(clicks)) : labels.add}
    </button>
  );
}
