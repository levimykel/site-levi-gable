import type { Metadata } from "next";
import { Suspense } from "react";
import { asDate, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink, getPreviewRef } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { getGig } from "@/lib/data";
import { wobble } from "@/lib/wobble";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

export default function ShowPage({ params }: PageProps<"/shows/[uid]">) {
  return (
    <Suspense>
      <Show params={params} />
    </Suspense>
  );
}

async function Show({ params }: Pick<PageProps<"/shows/[uid]">, "params">) {
  const { uid } = await params;
  const gig = await getGig(uid, await getPreviewRef());
  const { venue, city, date, poster, notes, status, tickets, setlist, highlight, photos, clips } = gig.data;
  const day = asDate(date);

  return (
    <article className="show">
      <header className="show-header">
        <p className="show-date">{day ? dateFormat.format(day) : "Some night. We were there."}</p>
        <h1>{venue}</h1>
        {city ? <p className="show-city">📍 {city}, deep in the desert rock region</p> : null}
        <p className="gig-status">{status}</p>
        {notes ? <p className="show-notes">{notes}</p> : null}
        {isFilled.link(tickets) ? (
          <PrismicNextLink field={tickets} className="chaos-button">
            Tickets / info
          </PrismicNextLink>
        ) : null}
      </header>

      {isFilled.image(poster) ? (
        <PrismicNextImage field={poster} className="show-poster shaky-img" fallbackAlt="" />
      ) : null}

      {highlight ? (
        <p className="show-highlight">
          <span>Highlight of the night</span>
          {highlight}
        </p>
      ) : null}

      {isFilled.richText(setlist) ? (
        <section className="show-setlist">
          <h2>The set list</h2>
          <p className="setlist-tape">(gaffer-taped to the floor, slightly beer-stained)</p>
          <PrismicRichText field={setlist} />
        </section>
      ) : null}

      {clips.length > 0 ? (
        <section className="show-clips">
          <h2>Moving pictures</h2>
          {clips.map((clip, i) => (
            <figure key={i} className="crt">
              {isFilled.linkToMedia(clip.file) && clip.file.url ? (
                <video controls preload="metadata" playsInline src={clip.file.url} />
              ) : isFilled.embed(clip.embed) && clip.embed.html ? (
                <div className="embed" dangerouslySetInnerHTML={{ __html: clip.embed.html }} />
              ) : null}
              {clip.title ? <figcaption>{clip.title}</figcaption> : null}
            </figure>
          ))}
        </section>
      ) : null}

      {photos.length > 0 ? (
        <section className="show-photos">
          <h2>Evidence</h2>
          <div className="photo-pile">
            {photos.map((photo, i) =>
              isFilled.image(photo.image) ? (
                <figure key={i} className="polaroid" style={{ "--rot": `${wobble(i + 61, 9)}deg` }}>
                  <PrismicNextImage field={photo.image} className="shaky-img" fallbackAlt="" />
                  {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
                </figure>
              ) : null,
            )}
          </div>
        </section>
      ) : null}
    </article>
  );
}

export async function generateMetadata({ params }: PageProps<"/shows/[uid]">): Promise<Metadata> {
  const { uid } = await params;
  const gig = await getGig(uid, await getPreviewRef());
  return {
    title: gig.data.venue || "Show",
    description: gig.data.notes || "MRS live, straight from the desert rock region.",
  };
}

export async function generateStaticParams() {
  const gigs = await createClient().getAllByType("gig");
  return gigs.map((gig) => ({ uid: gig.uid }));
}
