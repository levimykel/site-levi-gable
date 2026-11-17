export const TRIGGERS = ["mrs", "martin", "vincent", "desert", "fresco", "falling", "toerack"] as const;

export type TriggerName = (typeof TRIGGERS)[number];

export function isTrigger(name: string): name is TriggerName {
  return TRIGGERS.some((trigger) => trigger === name);
}
