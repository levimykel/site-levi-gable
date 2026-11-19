import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { wobble } from "@/lib/wobble";
import { PourButton } from "./PourButton";

export type BeerCellarProps = SliceComponentProps<Content.BeerCellarSlice>;

export default function BeerCellar({ slice }: BeerCellarProps) {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="beer-cellar">
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} fallback={<h2>The Beer Cellar</h2>} />
      </div>
      <div className="beer-intro">
        <PrismicRichText field={slice.primary.intro} />
      </div>
      <div className="beers">
        {slice.primary.beers.map(({ beer }, i) => {
          if (!isFilled.contentRelationship(beer) || !beer.data) return null;
          const { name, style, abv, label, tasting_notes, side_effects, glow } = beer.data;
          return (
            <article
              key={beer.id}
              className="beer"
              style={{
                "--glow": glow ?? "#f5c518",
                "--rot": `${wobble(i + 21, 6)}deg`,
              }}
            >
              <div className="beer-label-frame">
                {isFilled.image(label) ? (
                  <PrismicNextImage
                    field={label}
                    className="beer-label shaky-img"
                    data-shake="earthquake"
                    fallbackAlt=""
                  />
                ) : (
                  <div className="beer-label beer-label-missing">{slice.primary.missing_label_text}</div>
                )}
              </div>
              <h3>{name}</h3>
              <p className="beer-meta">
                {style}
                {abv !== null ? <span className="abv">{abv}% ABV</span> : null}
              </p>
              <div className="tasting">
                <PrismicRichText field={tasting_notes} />
              </div>
              {isFilled.richText(side_effects) ? (
                <div className="side-effects">
                  {slice.primary.side_effects_label ? <strong>{slice.primary.side_effects_label}</strong> : null}
                  <PrismicRichText field={side_effects} />
                </div>
              ) : null}
              {slice.primary.pour_label ? (
                <PourButton
                  label={slice.primary.pour_label}
                  message={(slice.primary.pour_message ?? "").replaceAll("{beer}", name ?? "")}
                />
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
