import { isFilled, type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

export type MusicProps = SliceComponentProps<Content.MusicSlice>;

export default function Music({ slice }: MusicProps) {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="music">
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} fallback={<h2>Noises We Made</h2>} />
      </div>
      <ol className="tracks">
        {slice.primary.tracks.map((track, i) => (
          <li key={i} className="track">
            <div className="cassette" aria-hidden="true">
              <span className="reel" />
              <span className="reel" />
            </div>
            <div className="track-body">
              <h3>{track.title || `Untitled #${i + 1}`}</h3>
              {track.description ? <p>{track.description}</p> : null}
              {isFilled.linkToMedia(track.audio) && track.audio.url ? (
                <audio controls preload="none" src={track.audio.url} />
              ) : null}
              {isFilled.embed(track.embed) && track.embed.html ? (
                <div className="embed" dangerouslySetInnerHTML={{ __html: track.embed.html }} />
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
