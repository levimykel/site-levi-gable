import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { HiddenCookie } from "@/components/chaos/HiddenCookie";
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
              {item.sizes ? (
                <p className="merch-sizes">
                  {slice.primary.sizes_label} {item.sizes}
                </p>
              ) : null}
              <CartButton
                disabled={soldOut}
                labels={{
                  add: slice.primary.add_to_cart_label ?? "",
                  inCart: slice.primary.in_cart_label ?? "",
                  soldOut: slice.primary.sold_out_label ?? "",
                }}
                messages={slice.primary.cart_messages.map((m) => m.text ?? "").filter(Boolean)}
              />
            </li>
          );
        })}
      </ul>
      {isFilled.link(slice.primary.buy_link) ? (
        <PrismicNextLink field={slice.primary.buy_link} className="chaos-button merch-buy">
          {slice.primary.buy_link_label || slice.primary.buy_link.text}
        </PrismicNextLink>
      ) : null}
      <HiddenCookie />
    </section>
  );
}
