import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { AboutMedia } from "@/sanity/types/about";

type MediaFrameProps = {
  media: AboutMedia;
  sizes: string;
  className?: string;
  cover?: boolean;
  preload?: "none" | "metadata";
};

export const hasMedia = (media?: AboutMedia | null): media is AboutMedia =>
  media?.kind === "image" ? Boolean(media.image) : Boolean(media?.videoUrl);

export function MediaFrame({
  media,
  sizes,
  className,
  cover = false,
  preload = "none",
}: MediaFrameProps) {
  if (!hasMedia(media)) return null;

  const fit = cover ? "object-cover" : "object-contain";

  return (
    <figure className={className}>
      <div
        className={`relative ${cover ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-video"}`}
      >
        {media.kind === "video" && media.videoUrl ? (
          <video
            aria-label={media.alt || "Video"}
            className={`h-full w-full ${fit}`}
            controls
            playsInline
            preload={preload}
            poster={
              media.posterImage
                ? urlFor(media.posterImage).width(1600).url()
                : undefined
            }
          >
            <source
              src={media.videoUrl}
              type={media.videoMimeType || undefined}
            />
            {media.captionsUrl && (
              <track
                default
                kind="captions"
                label="Captions"
                src={media.captionsUrl}
                srcLang={media.captionsLanguage || "en"}
              />
            )}
            Your browser does not support embedded video.
          </video>
        ) : (
          media.image && (
            <Image
              alt={media.alt || ""}
              className={fit}
              fill
              sizes={sizes}
              src={urlFor(media.image).width(1600).auto("format").url()}
              placeholder={media.imageLqip ? "blur" : "empty"}
              blurDataURL={media.imageLqip || undefined}
            />
          )
        )}
      </div>
      {media.caption && (
        <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-primary/70">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}
