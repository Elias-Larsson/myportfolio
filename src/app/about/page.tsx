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
import { HomeDuck } from "../components/home-duck";

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

const ABOUT_INTRODUCTION =
  "I like understanding how the whole system fits together: how a product feels, how its data moves, and how it stays running. That curiosity has taken me from full-stack development into mobile products, distributed backends, and a small homelab. Away from the screen, I train, bake, game, and spend time with friends.";

const HOW_I_WORK =
  "I enjoy moving between the product and the system behind it—asking what people need, breaking unfamiliar problems into smaller parts, and carrying ideas through to working software. In a team, I value clear communication, honest feedback, and taking ownership without losing sight of the people who will use what we build.";

const STORY_INTRODUCTION =
  "I learn by building, experimenting, and staying close to the systems behind the products—from running a homelab to studying alongside people who continue to shape how I work.";

const HOMELAB_COPY = {
  eyebrow: "Infrastructure · homelab",
  title: "A lab for learning",
  body: "I run a small Proxmox cluster where I host services, test projects, and learn how systems behave outside a local development environment. Tailscale and Cloudflare Tunnels provide secure access, while Docker supports tools such as Home Assistant and Nextcloud—plus the occasional game server for friends.",
};

const CHAS_COPY = {
  eyebrow: "Education · community",
  title: "Two years at Chas Academy",
  body: "I studied full-stack development at Chas Academy for two years, building across frontend, backend, and team projects. The technical breadth mattered, but the most lasting part was learning how to collaborate—and the friends and professional relationships I made along the way.",
};

const isLegacyIntroduction = (description: string | null | undefined) =>
  !description?.trim() ||
  description.trim().startsWith("Coding has been a small portion of my life");

const isLegacyStoryIntroduction = (
  introduction: string | null | undefined,
) =>
  !introduction?.trim() ||
  introduction
    .trim()
    .startsWith("Here is some other technical stuff I've been busy with");

function refineChapterCopy(chapter: AboutStorySection): AboutStorySection {
  const title = chapter.title.toLowerCase();
  const eyebrow = chapter.eyebrow?.toLowerCase();

  if (
    (eyebrow === "homelab" || title.includes("proxmox")) &&
    chapter.body.trim().startsWith("Here are my servers")
  ) {
    return { ...chapter, ...HOMELAB_COPY };
  }

  if (
    title.includes("chas academy") &&
    chapter.body.trim().startsWith("I spent to two years")
  ) {
    return { ...chapter, ...CHAS_COPY };
  }

  return chapter;
}

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
              alt={
                media.alt?.replace(/\bphoto of a Elias\b/i, "photo of Elias") ||
                "A moment from Elias Larsson's life"
              }
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

  const storySections = (about?.storySections ?? []).map(refineChapterCopy);
  const description = isLegacyIntroduction(about?.description)
    ? ABOUT_INTRODUCTION
    : about?.description ?? ABOUT_INTRODUCTION;
  const storyHeading =
    !about?.storyHeading?.trim() ||
    about.storyHeading.trim().toLowerCase() === "in my spare"
      ? "How I keep"
      : about.storyHeading;
  const storyHeadingAccent =
    !about?.storyHeadingAccent?.trim() ||
    about.storyHeadingAccent.trim().toLowerCase() === "time"
      ? "learning."
      : about.storyHeadingAccent;
  const storyIntroduction = isLegacyStoryIntroduction(
    about?.storyIntroduction,
  )
    ? STORY_INTRODUCTION
    : about?.storyIntroduction ?? STORY_INTRODUCTION;
  const profileUrl = about?.profileImage
    ? urlFor(about.profileImage).width(1000).height(1250).fit("crop").url()
    : null;

  return (
    <>
      <main className="relative overflow-hidden bg-tertiary">
        <HomeDuck />
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
                  {description}
                </p>
                <a
                  className="mt-10 flex w-fit items-center gap-4 text-xs uppercase tracking-[0.2em] text-primary/60 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
                  href="#work-heading"
                >
                  <span aria-hidden="true" className="h-px w-12 bg-primary/25" />
                  See how I work ↓
                </a>
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
                      alt={about?.profileAlt || "Elias Larsson sitting at a table"}
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

        <section
          aria-labelledby="work-heading"
          className="border-y border-white/10 bg-midnight/25 px-4 py-24 md:py-32"
        >
          <div className="about-reveal mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
            <header className="lg:col-span-5">
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-secondary-readable">
                Approach
              </p>
              <h2
                className="text-4xl leading-tight sm:text-5xl md:text-6xl"
                id="work-heading"
              >
                {about?.workHeading || "How I"}
                <br />
                <span className="text-secondary">
                  {about?.workHeadingAccent || "work."}
                </span>
              </h2>
            </header>
            <div className="lg:col-span-7 lg:pt-9">
              <p className="max-w-2xl whitespace-pre-line text-lg leading-8 text-primary/72 md:text-xl md:leading-9">
                {about?.workBody || HOW_I_WORK}
              </p>
            </div>
          </div>
        </section>

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
                  {storyHeading}{" "}
                  <span className="text-secondary">
                    {storyHeadingAccent}
                  </span>
                </h2>
                <p className="mx-auto mt-5 max-w-xl whitespace-pre-line leading-7 text-primary/72">
                  {storyIntroduction}
                </p>
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
          <Navbar />
        </div>
      </main>
      <Footer />
    </>
  );
}
