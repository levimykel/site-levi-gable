import { isFilled, type Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, type SliceComponentProps } from "@prismicio/react";
import { wobble } from "@/lib/wobble";

export type PhotoGalleryProps = SliceComponentProps<Content.PhotoGallerySlice>;

export default function PhotoGallery({ slice }: PhotoGalleryProps) {
  const photos = slice.primary.photos.filter((photo) => isFilled.image(photo.image));
  if (photos.length === 0) return null;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="photo-gallery"
    >
      <div className="slice-heading">
        <PrismicRichText field={slice.primary.heading} fallback={<h2>Photographic Evidence</h2>} />
      </div>
      <div className="photo-pile">
        {photos.map((photo, i) => (
          <figure key={i} className="polaroid" style={{ "--rot": `${wobble(i + 61, 7)}deg` }}>
            <PrismicNextImage
              field={photo.image}
              className="shaky-img"
              sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
              fallbackAlt=""
            />
            {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
