import { isFilled, type Content } from "@prismicio/client";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";

export type VideoProps = SliceComponentProps<Content.VideoSlice>;

export default function Video({ slice }: VideoProps) {
  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className="video-slice">
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} />
      </div>
      <div className="crt">
        {isFilled.embed(slice.primary.video) && slice.primary.video.html ? (
          <div className="embed" dangerouslySetInnerHTML={{ __html: slice.primary.video.html }} />
        ) : (
          <div className="no-signal">NO SIGNAL</div>
        )}
      </div>
      {slice.primary.caption ? <p className="caption">{slice.primary.caption}</p> : null}
    </section>
  );
}
