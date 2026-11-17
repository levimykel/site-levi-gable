import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { wobble } from "@/lib/wobble";
import { CartButton } from "./CartButton";

export type MerchTableProps = SliceComponentProps<Content.MerchTableSlice>;

export default function MerchTable({ slice }: MerchTableProps) {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="merch-table">
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} fallback={<h2>The Merch Table</h2>} />
      </div>
      {isFilled.richText(slice.primary.intro) ? (
        <div className="merch-intro">
          <PrismicRichText field={slice.primary.intro} />
        </div>
      ) : null}
      <ul className="merch-grid">
        {slice.primary.items.map((item, i) => {
          const soldOut = item.stock === "sold out";
          return (
            <li
              key={i}
              className={`merch-item${soldOut ? " merch-sold-out" : ""}`}
              style={{ "--rot": `${wobble(i + 47, 5)}deg` }}
            >
              <div className="merch-photo">
                <PrismicNextImage field={item.image} className="shaky-img" fallbackAlt="" />
                {item.price !== null ? <span className="price-tag">{item.price}€</span> : null}
                {item.stock && item.stock !== "in stock" ? <span className="merch-stamp">{item.stock}</span> : null}
              </div>
              <h3>{item.name || "Mystery item"}</h3>
              {item.description ? <p>{item.description}</p> : null}
              {item.sizes ? <p className="merch-sizes">Sizes: {item.sizes}</p> : null}
              <CartButton disabled={soldOut} />
            </li>
          );
        })}
      </ul>
      {isFilled.link(slice.primary.buy_link) ? (
        <PrismicNextLink field={slice.primary.buy_link} className="chaos-button merch-buy">
          How to actually buy stuff
        </PrismicNextLink>
      ) : null}
    </section>
  );
}
