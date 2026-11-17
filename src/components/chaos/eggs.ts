export const EGGS = {
  konami: "Mosh pit unlocked",
  mrs: "You summoned the feedback demon",
  beer: "It's raining beer",
  martin: "Martin dropped the bass",
  vincent: "Vincent counted you in",
  slop: "Slop mode: maximum AI",
  desert: "Visited the desert rock region",
  fresco: "Fresco y bueno",
  falling: "Fell for Falling",
  toerack: "Toe Rack (it's Return of the Rat)",
  yeaaap: "Certified Yeaaaper (50 yeaaaps)",
  drunk: "Stayed too long at the bar",
  away: "You left. We noticed.",
  logo: "Stop poking the logo",
  pick: "Found Nick's lost pick",
  cookies: "Accepted the beer policy twice",
  lost: "Got lost in the desert rock region (404)",
  bottom: "Reached the bottom of the barrel",
} as const;

export type EggId = keyof typeof EGGS;

export const EGG_COUNT = Object.keys(EGGS).length;

const STORAGE_KEY = "mrs:eggs";
export const EGG_EVENT = "mrs:egg";
export const TOAST_EVENT = "mrs:toast";

export function readFoundEggs(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : []);
  } catch {
    return new Set();
  }
}

export function findEgg(id: EggId) {
  const found = readFoundEggs();
  const isNew = !found.has(id);
  found.add(id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...found]));
  } catch {}
  window.dispatchEvent(new CustomEvent(EGG_EVENT, { detail: { id, isNew, total: found.size } }));
  if (isNew) toast(`🥚 ${EGGS[id]} (${found.size}/${EGG_COUNT})`);
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}
