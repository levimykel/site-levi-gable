export const EGG_IDS = [
  "konami",
  "mrs",
  "beer",
  "martin",
  "vincent",
  "slop",
  "desert",
  "fresco",
  "falling",
  "toerack",
  "yeaaap",
  "drunk",
  "away",
  "logo",
  "pick",
  "cookies",
  "cookiejar",
  "lost",
  "bottom",
] as const;

export type EggId = (typeof EGG_IDS)[number];

export const EGG_COUNT = EGG_IDS.length;

export type EggText = { egg: EggId; name: string; messages: string[] };

let eggText = new Map<EggId, EggText>();

export function registerEggText(eggs: EggText[]) {
  eggText = new Map(eggs.map((egg) => [egg.egg, egg]));
}

export function eggMessages(id: EggId) {
  return eggText.get(id)?.messages ?? [];
}

export function sayEgg(id: EggId, index = 0) {
  const message = eggMessages(id)[index];
  if (message) toast(message);
}

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
  if (isNew) toast(`🥚 ${eggText.get(id)?.name || id} (${found.size}/${EGG_COUNT})`);
}

export function toast(message: string) {
  if (!message) return;
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}
