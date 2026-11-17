import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

export type TheBarProps = SliceComponentProps<Content.TheBarSlice>;

export default function TheBar({ slice }: TheBarProps) {
  const { location } = slice.primary;
  const mapSrc = isFilled.geoPoint(location)
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude - 0.004},${location.latitude - 0.0025},${location.longitude + 0.004},${location.latitude + 0.0025}&layer=mapnik&marker=${location.latitude},${location.longitude}`
    : null;

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="the-bar">
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} fallback={<h2>After Practice HQ</h2>} />
      </div>
      <div className="bar-card">
        <PrismicNextImage field={slice.primary.photo} className="shaky-img bar-photo" fallbackAlt="" />
        <div>
          <h3 className="bar-name">{slice.primary.bar_name || "The Bar"}</h3>
          <PrismicRichText field={slice.primary.description} />
          {slice.primary.address ? <p className="bar-address">📍 {slice.primary.address}</p> : null}
          <p className="bar-stats">
            Distance from practice: <strong>0.3 beers</strong>
            <br />
            Band meetings held here: <strong>all of them</strong>
          </p>
          {isFilled.link(slice.primary.map_link) ? (
            <PrismicNextLink field={slice.primary.map_link} className="chaos-button">
              Take me there 🍺
            </PrismicNextLink>
          ) : null}
        </div>
      </div>
      {mapSrc ? <iframe className="bar-map" title="Map to the bar" src={mapSrc} loading="lazy" /> : null}
    </section>
  );
}
