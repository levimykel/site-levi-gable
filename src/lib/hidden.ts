export function splitHidden(text: string) {
  const match = /^([^[]*)\[([^\]]+)\](.*)$/.exec(text);
  return match ? { before: match[1], hidden: match[2], after: match[3] } : null;
}
