"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { findEgg, toast, TOAST_EVENT } from "./eggs";
import { playBurp, playFeedbackScreech, playPowerChord, playYeaaap, randomPitch } from "./sounds";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const IDLE_MS = 30_000;

const DEFAULT_AWAY_TITLES = [
  "come back, the beer is getting warm 🍺",
  "MRS misses you 🥺",
  "you left the amp on",
  "Henry is looking for you",
];

type Toast = { id: number; message: string };

export function ChaosLayer({ awayTitles }: { awayTitles: string[] }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [drunk, setDrunk] = useState(false);
  const [sober, setSober] = useState(false);

  useToasts(setToasts);
  useSecretWords();
  useDrunkIdle(setDrunk);
  useAwayTitle(awayTitles.length > 0 ? awayTitles : DEFAULT_AWAY_TITLES);
  useScrollTilt();
  useBubbleTrail();
  useBottomOfTheBarrel();

  useEffect(() => {
    document.documentElement.classList.toggle("drunk", drunk && !sober);
  }, [drunk, sober]);

  useEffect(() => {
    document.documentElement.classList.toggle("sober", sober);
  }, [sober]);

  return (
    <>
      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.message}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="sober-toggle"
        onClick={() => {
          setSober((s) => !s);
          toast(sober ? "🍻 Back to normal (drunk)" : "🧃 Sober mode. Boring. Enjoy.");
          if (sober) playBurp();
        }}
      >
        {sober ? "🧃 sober" : "🍺 drunk"} mode
      </button>
    </>
  );
}

function useToasts(setToasts: Dispatch<SetStateAction<Toast[]>>) {
  useEffect(() => {
    let nextId = 0;
    const onToast = (event: Event) => {
      if (!(event instanceof CustomEvent) || typeof event.detail !== "string") return;
      const id = nextId++;
      const message = event.detail;
      setToasts((ts) => [...ts.slice(-3), { id, message }]);
      window.setTimeout(() => setToasts((ts) => ts.filter((t) => t.id !== id)), 4500);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => window.removeEventListener(TOAST_EVENT, onToast);
  }, [setToasts]);
}

function useSecretWords() {
  const buffer = useRef("");
  const konamiIndex = useRef(0);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;

      const expected = KONAMI[konamiIndex.current];
      konamiIndex.current = event.key === expected ? konamiIndex.current + 1 : event.key === KONAMI[0] ? 1 : 0;
      if (konamiIndex.current === KONAMI.length) {
        konamiIndex.current = 0;
        moshPit();
        return;
      }

      if (event.key.length !== 1) return;
      buffer.current = (buffer.current + event.key.toLowerCase()).slice(-12);
      const typed = buffer.current;

      if (typed.endsWith("mrs")) {
        playFeedbackScreech();
        flash();
        findEgg("mrs");
      } else if (typed.endsWith("beer")) {
        beerRain();
        findEgg("beer");
      } else if (typed.endsWith("henry")) {
        henryRun();
        findEgg("henry");
      } else if (typed.endsWith("slop")) {
        const on = document.documentElement.classList.toggle("slop");
        toast(on ? "🤖 As an AI language model, I have improved this website." : "🤖 Slop mode off. Humans are back in charge.");
        findEgg("slop");
      } else if (typed.endsWith("yeap")) {
        for (let i = 0; i < 5; i++) window.setTimeout(() => playYeaaap({ pitch: randomPitch() }), i * 160);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

function moshPit() {
  const root = document.documentElement;
  if (root.classList.contains("moshing")) return;
  root.classList.add("moshing");
  playPowerChord();
  playYeaaap({ pitch: 0.7 });
  findEgg("konami");
  toast("🤘 MOSH PIT 🤘");

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("main h1, main h2, main p, main img, main button, main li, header a, footer > *"),
  ).slice(0, 220);

  const animations = elements.map((el) => {
    const rect = el.getBoundingClientRect();
    const fall = window.innerHeight - rect.top - rect.height + Math.random() * 40;
    const x = (Math.random() - 0.5) * 400;
    const r = (Math.random() - 0.5) * 540;
    return el.animate(
      [
        { transform: "none" },
        { transform: `translate(${x * 0.3}px, -60px) rotate(${r * 0.2}deg)`, offset: 0.2 },
        { transform: `translate(${x}px, ${fall}px) rotate(${r}deg)` },
      ],
      { duration: 900 + Math.random() * 900, easing: "cubic-bezier(.5,0,.9,.6)", fill: "forwards" },
    );
  });

  window.setTimeout(() => {
    for (const animation of animations) {
      animation.playbackRate = 2;
      animation.reverse();
    }
    window.setTimeout(() => {
      for (const animation of animations) animation.cancel();
      root.classList.remove("moshing");
    }, 1200);
  }, 5000);
}

function flash() {
  const el = document.createElement("div");
  el.className = "feedback-flash";
  el.textContent = "MRS";
  document.body.appendChild(el);
  window.setTimeout(() => el.remove(), 1400);
}

function beerRain() {
  playBurp();
  for (let i = 0; i < 60; i++) {
    const drop = document.createElement("span");
    drop.className = "beer-drop";
    drop.textContent = Math.random() > 0.1 ? "🍺" : "🍻";
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.animationDelay = `${Math.random() * 1.5}s`;
    drop.style.fontSize = `${1 + Math.random() * 2.5}rem`;
    document.body.appendChild(drop);
    window.setTimeout(() => drop.remove(), 4500);
  }
}

function henryRun() {
  const henry = document.createElement("img");
  henry.src = "/legacy/henry.jpg";
  henry.alt = "Henry";
  henry.className = "henry-run";
  document.body.appendChild(henry);
  playYeaaap({ pitch: 1.6 });
  window.setTimeout(() => henry.remove(), 4200);
}

function useDrunkIdle(setDrunk: (drunk: boolean) => void) {
  useEffect(() => {
    let timer = 0;
    let isDrunk = false;
    const reset = () => {
      if (isDrunk) {
        isDrunk = false;
        setDrunk(false);
        toast("☕ Welcome back. You were swaying a bit there.");
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        isDrunk = true;
        setDrunk(true);
        findEgg("drunk");
      }, IDLE_MS);
    };
    const events = ["mousemove", "keydown", "scroll", "touchstart", "click"];
    for (const e of events) window.addEventListener(e, reset, { passive: true });
    reset();
    return () => {
      window.clearTimeout(timer);
      for (const e of events) window.removeEventListener(e, reset);
    };
  }, [setDrunk]);
}

function useAwayTitle(awayTitles: string[]) {
  useEffect(() => {
    let original = document.title;
    const onVisibility = () => {
      if (document.hidden) {
        original = document.title;
        document.title = awayTitles[Math.floor(Math.random() * awayTitles.length)];
      } else {
        document.title = original;
        findEgg("away");
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [awayTitles]);
}

function useScrollTilt() {
  useEffect(() => {
    let lastY = window.scrollY;
    let tilt = 0;
    let frame = 0;
    const loop = () => {
      const y = window.scrollY;
      const velocity = y - lastY;
      lastY = y;
      tilt = tilt * 0.9 + Math.max(-6, Math.min(6, velocity * 0.08)) * 0.1;
      document.documentElement.style.setProperty("--scroll-tilt", `${tilt.toFixed(3)}deg`);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);
}

function useBubbleTrail() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let last = 0;
    const onMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - last < 45) return;
      last = now;
      const bubble = document.createElement("span");
      bubble.className = "bubble";
      bubble.style.left = `${event.clientX}px`;
      bubble.style.top = `${event.clientY}px`;
      const size = 4 + Math.random() * 10;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      document.body.appendChild(bubble);
      window.setTimeout(() => bubble.remove(), 1100);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}

function useBottomOfTheBarrel() {
  useEffect(() => {
    let triggered = false;
    const onScroll = () => {
      if (triggered) return;
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        triggered = true;
        findEgg("bottom");
        if (Math.random() < 0.5) playYeaaap({ pitch: 0.6 });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
