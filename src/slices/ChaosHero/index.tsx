import type { Content } from "@prismicio/client";
import { asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";
import { pick, wobble } from "@/lib/wobble";
import { EggTrigger } from "@/components/chaos/EggTrigger";

export type ChaosHeroProps = SliceComponentProps<Content.ChaosHeroSlice>;

const FONTS = ["var(--font-wet)", "var(--font-metal)", "var(--font-shade)", "var(--font-marker)", "var(--font-comic)"];

export default function ChaosHero({ slice }: ChaosHeroProps) {
  const title = asText(slice.primary.title) || "MRS";
  const chaos = Number(slice.primary.chaos_level ?? "11");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="chaos-hero"
      style={{ "--chaos": chaos / 11 }}
    >
      <h1 aria-label={title}>
        <EggTrigger egg="mrs">
          {title.split("").map((letter, i) => (
            <span
              key={i}
              aria-hidden="true"
              style={{
                fontFamily: pick(FONTS, i + 1),
                transform: `rotate(${wobble(i + 3, 18 * (chaos / 11))}deg) translateY(${wobble(i + 7, 20 * (chaos / 11))}px)`,
                animationDelay: `${wobble(i, 1)}s`,
              }}
            >
              {letter === " " ? " " : letter}
            </span>
          ))}
        </EggTrigger>
      </h1>
      {slice.primary.subtitle ? <p className="chaos-hero-subtitle">{slice.primary.subtitle}</p> : null}
      <PrismicNextImage field={slice.primary.image} className="shaky-img chaos-hero-img" fallbackAlt="" />
      {slice.primary.sticker_top ? <div className="sticker sticker-a">{slice.primary.sticker_top}</div> : null}
      {slice.primary.sticker_bottom ? <div className="sticker sticker-b">{slice.primary.sticker_bottom}</div> : null}
    </section>
  );
}
