import { asDate, isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink, getPreviewRef } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { getGigs } from "@/lib/data";

export type GigListProps = SliceComponentProps<Content.GigListSlice>;

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

export default async function GigList({ slice }: GigListProps) {
  const gigs = await getGigs(await getPreviewRef());

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="gig-list">
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} fallback={<h2>Gigs</h2>} />
      </div>
      {gigs.length === 0 ? (
        <div className="gig-empty">
          <PrismicRichText
            field={slice.primary.empty_message}
            fallback={<p>No gigs right now. We&rsquo;re at the bar. Check back after practice.</p>}
          />
        </div>
      ) : (
        <ol className="gigs">
          {gigs.map((gig) => {
            const date = asDate(gig.data.date);
            const evidence =
              gig.data.clips.length === 0 && slice.primary.evidence_label_no_clips
                ? slice.primary.evidence_label_no_clips
                : slice.primary.evidence_label;
            return (
              <li key={gig.id} className={`gig gig-${(gig.data.status ?? "upcoming").split(" ")[0]}`}>
                {isFilled.image(gig.data.poster) ? (
                  <PrismicNextImage field={gig.data.poster} className="gig-poster shaky-img" fallbackAlt="" />
                ) : isFilled.image(gig.data.photos[0]?.image) ? (
                  <PrismicNextImage field={gig.data.photos[0].image} className="gig-poster shaky-img" fallbackAlt="" />
                ) : (
                  <div className="gig-poster gig-poster-missing">{slice.primary.missing_poster_text}</div>
                )}
                <div>
                  <p className="gig-date">{date ? dateFormat.format(date) : slice.primary.missing_date_text}</p>
                  <h3>
                    <PrismicNextLink document={gig}>{gig.data.venue}</PrismicNextLink>
                    {gig.data.city ? <span className="gig-city"> — {gig.data.city}</span> : null}
                  </h3>
                  {gig.data.notes ? <p>{gig.data.notes}</p> : null}
                  <p className="gig-status">{gig.data.status}</p>
                  {evidence && (gig.data.photos.length > 0 || gig.data.clips.length > 0) ? (
                    <PrismicNextLink document={gig} className="gig-evidence">
                      {evidence
                        .replaceAll("{photos}", String(gig.data.photos.length))
                        .replaceAll("{clips}", String(gig.data.clips.length))}
                    </PrismicNextLink>
                  ) : null}
                  {isFilled.link(gig.data.tickets) ? (
                    <PrismicNextLink field={gig.data.tickets} className="chaos-button">
                      {slice.primary.tickets_label || gig.data.tickets.text}
                    </PrismicNextLink>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
