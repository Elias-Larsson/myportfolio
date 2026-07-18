import type { Metadata } from "next";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { aboutQuery } from "@/sanity/lib/queries";
import type {
  About,
  AboutMedia,
  AboutStorySection,
} from "@/sanity/types/about";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About | Elias Larsson",
  description:
    "The story, interests, and experiences behind Elias Larsson's work as a full-stack developer.",
};

type MediaFrameProps = {
  media: AboutMedia;
  className?: string;
  imageClassName?: string;
  sizes: string;
  preload?: "none" | "metadata";
};

const hasVisual = (media: AboutMedia | null | undefined) =>
  Boolean(
    media &&
      ((media.kind === "video" && media.videoUrl) ||
        (media.kind !== "video" && media.image)),
  );

function MediaFrame({
  media,
  className = "",
  imageClassName = "aspect-[4/3] sm:aspect-[16/10]",
  sizes,
  preload = "none",
}: MediaFrameProps) {
  if (!hasVisual(media)) return null;

  const posterUrl = media.posterImage
    ? urlFor(media.posterImage).width(1600).height(1000).fit("crop").url()
    : undefined;

  return (
    <figure className={className}>
      <div
        className={`group relative overflow-hidden bg-black/30 ${imageClassName}`}
      >
        {media.kind === "video" && media.videoUrl ? (
          <video
            aria-label={media.alt || "About page video"}
            className="h-full w-full object-cover"
            controls
            playsInline
            poster={posterUrl}
            preload={preload}
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
              alt={media.alt || "A moment from my life"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              fill
              sizes={sizes}
              src={urlFor(media.image)
                .width(1600)
                .height(1100)
                .fit("crop")
                .url()}
              {...(media.imageLqip
                ? { blurDataURL: media.imageLqip, placeholder: "blur" as const }
                : {})}
            />
          )
        )}
      </div>
      {media.caption && (
        <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-relaxed text-primary/55">
          {media.caption}
        </figcaption>
      )}
    </figure>
  );
}

function StoryChapter({
  chapter,
  index,
}: {
  chapter: AboutStorySection;
  index: number;
}) {
  const showMedia = hasVisual(chapter.media);
  const mediaLeft =
    chapter.layout === "mediaLeft" ||
    (chapter.layout !== "mediaRight" && index % 2 === 1);

  return (
    <article className="about-reveal grid gap-10 border-t border-white/10 py-16 last:border-b md:py-24 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div
        className={`${
          showMedia ? "lg:col-span-5" : "lg:col-span-8"
        } ${mediaLeft && showMedia ? "lg:order-2" : ""}`}
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-secondary">
          <span>[{String(index + 1).padStart(2, "0")}]</span>
          {chapter.eyebrow && (
            <>
              <span aria-hidden="true" className="h-px w-8 bg-secondary/45" />
              <span>{chapter.eyebrow}</span>
            </>
          )}
        </div>
        <h3 className="mt-5 text-3xl leading-tight sm:text-4xl md:text-5xl">
          {chapter.title}
        </h3>
        <p className="mt-6 whitespace-pre-line text-base leading-8 text-primary/70 md:text-lg">
          {chapter.body}
        </p>
      </div>

      {showMedia && chapter.media && (
        <MediaFrame
          className={`overflow-hidden rounded-sm border border-white/10 bg-midnight lg:col-span-7 ${
            mediaLeft ? "lg:order-1" : ""
          }`}
          media={chapter.media}
          preload={index === 0 ? "metadata" : "none"}
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
      )}
    </article>
  );
}

export default async function AboutPage() {
  const about = await client.fetch<About | null>(aboutQuery, {}, {
    next: { revalidate },
  });

  const storySections = about?.storySections ?? [];
  const profileUrl = about?.profileImage
    ? urlFor(about.profileImage).width(1000).height(1250).fit("crop").url()
    : null;

  return (
    <>
      <main className="overflow-hidden bg-tertiary">
        <section className="relative isolate px-4 pb-32 pt-24 md:pb-48 md:pt-36">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid items-end gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:gap-20">
              <div className="relative z-10">
                <h1 className="text-[12vw] leading-[0.94] sm:text-6xl md:text-7xl lg:text-8xl">
                  {about?.heading || "The person"}
                  <br />
                  <span className="text-secondary">
                    {about?.headingAccent || "behind the code."}
                  </span>
                </h1>
                <p className="mt-8 max-w-2xl whitespace-pre-line text-lg leading-8 text-primary/72 md:text-xl md:leading-9">
                  {about?.description ||
                    "I am a full-stack developer and student who cares about the people behind every product I build."}
                </p>
                <div className="mt-10 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-primary/45">
                  <span aria-hidden="true" className="h-px w-12 bg-primary/25" />
                  Scroll through my story
                </div>
              </div>

              {profileUrl && (
                <figure className="relative mx-auto w-full max-w-md lg:mx-0">
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 -z-10 h-44 w-44 rounded-full bg-secondary sm:h-56 sm:w-56"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-5 -left-5 -z-10 h-full w-full rounded-sm"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-midnight shadow-2xl shadow-black/35">
                    <Image
                      alt={about?.profileAlt || "A personal photo selected by Elias Larsson"}
                      className="object-cover"
                      fill
                      priority
                      sizes="(min-width: 1024px) 36vw, (min-width: 640px) 65vw, 92vw"
                      src={profileUrl}
                      {...(about?.profileLqip
                        ? {
                            blurDataURL: about.profileLqip,
                            placeholder: "blur" as const,
                          }
                        : {})}
                    />
                  </div>
                  <Image
                    alt=""
                    aria-hidden="true"
                    className="absolute -bottom-9 -right-3 h-auto w-20 -rotate-12 drop-shadow-xl sm:-right-10 sm:w-24"
                    height={96}
                    src="/awesomeduck.svg"
                    width={96}
                  />
                </figure>
              )}
            </div>
          </div>
        </section>

        {storySections.length > 0 && (
          <section
            aria-labelledby="story-heading"
            className="bg-tertiary px-4 py-32 md:py-48"
          >
            <div className="mx-auto w-full max-w-6xl">
              <header className="about-reveal mx-auto mb-16 max-w-2xl text-center md:mb-24">
                <h2
                  className="text-[10.5dvw] sm:text-6xl md:text-7xl"
                  id="story-heading"
                >
                  {about?.storyHeading || "My"}{" "}
                  <span className="text-secondary">
                    {about?.storyHeadingAccent || "story."}
                  </span>
                </h2>
                {about?.storyIntroduction && (
                  <p className="mx-auto mt-5 max-w-xl whitespace-pre-line leading-7 text-primary/72">
                    {about.storyIntroduction}
                  </p>
                )}
              </header>

              {storySections.map((chapter, index) => (
                <StoryChapter
                  chapter={chapter}
                  index={index}
                  key={chapter._key}
                />
              ))}
            </div>
          </section>
        )}

        <div className="flex justify-center px-4 pb-48 pt-8">
          <Navbar />
        </div>
      </main>
      <Footer heading="LET'S CREATE" headingAccent="SOMETHING." />
    </>
  );
}
