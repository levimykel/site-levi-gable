// Deterministic "randomness" so server and client render the same chaos.
export function wobble(seed: number, range = 1) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return ((x - Math.floor(x)) * 2 - 1) * range;
}

export function pick<T>(items: readonly T[], seed: number): T {
  return items[Math.abs(Math.floor(wobble(seed, 1000))) % items.length];
}
