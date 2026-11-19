import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { wobble } from "@/lib/wobble";
import { EggTrigger, ShoutTrigger } from "@/components/chaos/EggTrigger";
import { isTrigger } from "@/components/chaos/triggers";

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
          const { name, instrument, photo, bio, weird_fact, shake_level } = member.data;
          return (
            <article
              key={member.id}
              className={`member ${i % 2 === 0 ? "member-left" : "member-right"}`}
              style={{ "--rot": `${wobble(i + 11, 4)}deg` }}
            >
              {isFilled.image(photo) ? (
                <ShoutTrigger name={name ?? ""}>
                  <PrismicNextImage
                    field={photo}
                    className="shaky-img"
                    data-shake={shake_level ?? "unhinged"}
                    fallbackAlt=""
                  />
                </ShoutTrigger>
              ) : (
                <div className="member-photo-missing shaky-img" data-shake={shake_level ?? "unhinged"}>
                  photo pending
                  <small>(he&rsquo;s at the bar)</small>
                </div>
              )}
              <div className="member-text">
                <h3>{name}</h3>
                {instrument ? (
                  <p className="instrument">
                    {member.uid && isTrigger(member.uid) ? (
                      <EggTrigger egg={member.uid}>{instrument}</EggTrigger>
                    ) : (
                      instrument
                    )}
                  </p>
                ) : null}
                {isFilled.richText(bio) ? (
                  <div className="bio">
                    <PrismicRichText field={bio} />
                  </div>
                ) : null}
                {weird_fact ? <p className="weird-fact">⚠️ {weird_fact}</p> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
