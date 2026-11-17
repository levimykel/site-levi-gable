import type { Content } from "@prismicio/client";
import { PrismicRichText, type JSXMapSerializer, type SliceComponentProps } from "@prismicio/react";
import { pick, wobble } from "@/lib/wobble";

export type ManifestoProps = SliceComponentProps<Content.ManifestoSlice>;

const RANSOM_FONTS = [
  "var(--font-wet)",
  "var(--font-metal)",
  "var(--font-shade)",
  "var(--font-marker)",
  "var(--font-comic)",
  "var(--font-typewriter)",
  "Georgia, serif",
  "Impact, sans-serif",
];
const RANSOM_COLORS = ["#fff", "#f5c518", "#ff2e88", "#00e5ff", "#111", "#b6ff00", "#ff5a1f"];

function ransom(text: string, seedOffset: number) {
  return text.split(/(\s+)/).map((word, i) => {
    if (/^\s+$/.test(word)) return word;
    const seed = seedOffset + i;
    const bg = pick(RANSOM_COLORS, seed);
    return (
      <span
        key={i}
        className="ransom-word"
        style={{
          fontFamily: pick(RANSOM_FONTS, seed + 3),
          background: bg,
          color: bg === "#111" ? "#fff" : "#111",
          transform: `rotate(${wobble(seed, 6)}deg)`,
        }}
      >
        {word}
      </span>
    );
  });
}

export default function Manifesto({ slice }: ManifestoProps) {
  const style = slice.primary.style ?? "ransom-note";
  let blockIndex = 0;

  const components: JSXMapSerializer | undefined =
    style === "ransom-note"
      ? {
          paragraph: ({ text }) => <p>{ransom(text ?? "", ++blockIndex * 100)}</p>,
          heading2: ({ text }) => <h2>{ransom(text ?? "", ++blockIndex * 100)}</h2>,
          heading3: ({ text }) => <h3>{ransom(text ?? "", ++blockIndex * 100)}</h3>,
        }
      : undefined;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`manifesto manifesto-${style}`}
    >
      <PrismicRichText field={slice.primary.body} components={components} />
    </section>
  );
}
