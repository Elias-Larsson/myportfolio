import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { aboutQuery } from "@/sanity/lib/queries";
import type { About, AboutStorySection } from "@/sanity/types/about";
import { Button } from "../components/button";
import { hasMedia, MediaFrame } from "../components/media-frame";
import { Footer } from "../components/footer";
import { HomeDuck } from "../components/home-duck";
import { absoluteUrl, personName, socialProfiles } from "../site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About",
  description:
    "The story, interests, and experiences behind Elias Larsson's work as a full-stack developer.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    locale: "en_SE",
    siteName: "Elias Larsson Portfolio",
    title: "About Elias Larsson",
    description:
      "The story, interests, and experiences behind Elias Larsson's work as a full-stack developer.",
    url: "/about",
    images: [
      {
        url: "/portfoliowebpage.png",
        width: 1200,
        height: 630,
        alt: "About Elias Larsson",
      },
    ],
  },
};

function StoryChapter({
  chapter,
  index,
}: {
  chapter: AboutStorySection;
  index: number;
}) {
  const showMedia = hasMedia(chapter.media);
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
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-secondary-readable">
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
          cover
          media={chapter.media}
          preload={index === 0 ? "metadata" : "none"}
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
      )}
    </article>
  );
}

export default async function AboutPage() {
  const about = await client.fetch<About | null>(
    aboutQuery,
    {},
    {
      next: { revalidate },
    },
  );

  if (!about) notFound();

  const storySections = about.storySections ?? [];
  const hasWork = Boolean(
    about.workHeading || about.workHeadingAccent || about.workBody,
  );
  const storyHeading = about.storyHeading;
  const storyHeadingAccent = about.storyHeadingAccent;
  const profileUrl = about.profileImage
    ? urlFor(about.profileImage).width(1000).height(1250).fit("crop").url()
    : null;
  const profileData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/about"),
    mainEntity: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: personName,
      url: absoluteUrl("/"),
      description: about.description || undefined,
      image: profileUrl || undefined,
      sameAs: Object.values(socialProfiles),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(profileData).replace(/</g, "\\u003c"),
        }}
      />
      <main className="relative overflow-hidden bg-tertiary wrap-anywhere">
        <HomeDuck />
        <section className="relative isolate px-4 pb-32 pt-24 md:pb-48 md:pt-36">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid items-end gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:gap-20">
              <div className="relative z-10">
                <h1 className="text-[12vw] leading-[0.94] sm:text-6xl md:text-7xl lg:text-8xl">
                  {about.heading || (!about.headingAccent && "About")}
                  {about.headingAccent && (
                    <span className="block text-secondary">
                      {about.headingAccent}
                    </span>
                  )}
                </h1>
                {about.description && (
                  <p className="mt-8 max-w-2xl whitespace-pre-line text-lg leading-8 text-primary/72 md:text-xl md:leading-9">
                    {about.description}
                  </p>
                )}
                {hasWork && (
                  <a
                    className="mt-10 flex w-fit items-center gap-4 text-xs uppercase tracking-[0.2em] text-primary/60 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                    href="#work-heading"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-12 bg-primary/25"
                    />
                    See how I work ↓
                  </a>
                )}
              </div>

              {profileUrl && (
                <figure className="relative mx-auto w-full max-w-md lg:mx-0">
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-16 -z-10 h-44 w-44 rounded-full bg-secondary sm:h-56 sm:w-56"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-midnight shadow-2xl shadow-black/35">
                    <Image
                      alt={about.profileAlt || ""}
                      className="object-cover"
                      fill
                      priority
                      sizes="(min-width: 1024px) 36vw, (min-width: 640px) 65vw, 92vw"
                      src={profileUrl}
                      {...(about.profileLqip
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
                    className="absolute -bottom-9 right-1 h-auto w-20 -rotate-12 drop-shadow-xl sm:-right-10 sm:w-24"
                    height={96}
                    src="/awesomeduck.svg"
                    width={96}
                  />
                </figure>
              )}
            </div>
          </div>
        </section>

        {hasWork && (
          <section
            aria-labelledby="work-heading"
            className="border-y border-white/10 bg-midnight/25 px-4 py-24 md:py-32"
          >
            <div className="about-reveal mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
              <h2
                className="text-4xl leading-tight sm:text-5xl md:text-6xl lg:col-span-5"
                id="work-heading"
              >
                {about.workHeading ||
                  (!about.workHeadingAccent && "How I work")}
                {about.workHeadingAccent && (
                  <span className="block text-secondary">
                    {about.workHeadingAccent}
                  </span>
                )}
              </h2>
              {about.workBody && (
                <p className="max-w-2xl whitespace-pre-line text-lg leading-8 text-primary/72 md:text-xl md:leading-9 lg:col-span-7">
                  {about.workBody}
                </p>
              )}
            </div>
          </section>
        )}

        {storySections.length > 0 && (
          <section
            aria-labelledby="story-heading"
            className="bg-tertiary px-4 pb-16 pt-32 md:pb-24 md:pt-48"
          >
            <div className="mx-auto w-full max-w-6xl">
              <header className="about-reveal mx-auto mb-16 max-w-2xl text-center md:mb-24">
                <h2
                  className="text-[10.5dvw] sm:text-6xl md:text-7xl"
                  id="story-heading"
                >
                  {storyHeading || (!storyHeadingAccent && "Stories")}
                  {storyHeadingAccent && (
                    <span className="text-secondary">
                      {" "}
                      {storyHeadingAccent}
                    </span>
                  )}
                </h2>
                {about.storyIntroduction && (
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

        <div className="flex justify-center px-4 pb-24 pt-4 md:pb-32">
          <Button route="/">Home</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
