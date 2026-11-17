import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { wobble } from "@/lib/wobble";

export type BandMembersProps = SliceComponentProps<Content.BandMembersSlice>;

export default function BandMembers({ slice }: BandMembersProps) {
  const members = slice.primary.members
    .map((item) => item.member)
    .filter((member) => isFilled.contentRelationship(member) && member.data !== undefined);

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="band-members">
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} fallback={<h2>Meet the Culprits</h2>} />
      </div>
      <div className="members">
        {members.map((member, i) => {
          if (!isFilled.contentRelationship(member) || !member.data) return null;
          const { name, instrument, photo, quote, weird_fact, shake_level } = member.data;
          return (
            <article
              key={member.id}
              className={`member ${i % 2 === 0 ? "member-left" : "member-right"}`}
              style={{ "--rot": `${wobble(i + 11, 4)}deg` }}
            >
              <PrismicNextImage
                field={photo}
                className="shaky-img"
                data-shake={shake_level ?? "unhinged"}
                fallbackAlt=""
              />
              <div className="member-text">
                <h3>{name}</h3>
                {instrument ? <p className="instrument">{instrument}</p> : null}
                <div className="quote">
                  <PrismicRichText field={quote} />
                </div>
                {weird_fact ? <p className="weird-fact">⚠️ {weird_fact}</p> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
