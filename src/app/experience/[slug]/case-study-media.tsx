import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { AboutMedia } from "@/sanity/types/about";

export function CaseStudyMedia({
  media,
  company,
  fullWidth,
}: {
  media: AboutMedia;
  company: string;
  fullWidth: boolean;
}) {
  const isVideo = media.kind === "video";
  const alt = media.alt?.trim();
  const poster = media.posterImage
    ? urlFor(media.posterImage).width(1280).fit("max").url()
    : undefined;

  return (
    <figure className="overflow-hidden rounded-sm border border-white/10 bg-midnight only:col-span-full">
      <div className="relative aspect-video">
        {isVideo && media.videoUrl ? (
          <video
            aria-label={alt || `${company} case study video`}
            className="h-full w-full object-contain"
            controls
            playsInline
            poster={poster}
            preload="none"
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
              alt={alt || ""}
              className="object-contain"
              fill
              sizes={
                fullWidth
                  ? "(min-width: 1280px) 1152px, 100vw"
                  : "(min-width: 1280px) 566px, (min-width: 640px) 50vw, 100vw"
              }
              src={urlFor(media.image)
                .width(1600)
                .fit("max")
                .auto("format")
                .url()}
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
