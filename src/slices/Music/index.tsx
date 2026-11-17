import { isFilled, type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { withCool } from "@/components/CoolAndGood";
import { EggTrigger } from "@/components/chaos/EggTrigger";

const SONG_EGGS = { "fresco-y-bueno": "fresco", falling: "falling" } as const;

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function songEgg(slug: string) {
  if (slug === "fresco-y-bueno" || slug === "falling") return SONG_EGGS[slug];
  return null;
}

export type MusicProps = SliceComponentProps<Content.MusicSlice>;

export default function Music({ slice }: MusicProps) {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="music">
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} fallback={<h2>Noises We Made</h2>} />
      </div>
      <ol className="tracks">
        {slice.primary.tracks.map((track, i) => {
          const title = track.title || `Untitled #${i + 1}`;
          const slug = slugify(title);
          const egg = songEgg(slug);
          return (
            <li key={i} className="track">
              <div className="cassette" aria-hidden="true">
                <span className="reel" />
                <span className="reel" />
              </div>
              <div className="track-body">
                <h3>{egg ? <EggTrigger egg={egg}>{title}</EggTrigger> : title}</h3>
                {track.description ? <p>{withCool(track.description)}</p> : null}
                {isFilled.linkToMedia(track.audio) && track.audio.url ? (
                  <audio controls preload="none" src={track.audio.url} data-song={slug} />
                ) : null}
                {isFilled.embed(track.embed) && track.embed.html ? (
                  <div className="embed" dangerouslySetInnerHTML={{ __html: track.embed.html }} />
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
