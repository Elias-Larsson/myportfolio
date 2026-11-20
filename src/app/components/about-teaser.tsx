import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { aboutQuery } from "@/sanity/lib/queries";
import type { About } from "@/sanity/types/about";
import { Button } from "./button";

const revalidate = 60;

type AboutTeaserProps = {
  body?: string | null;
  title?: string | null;
};

const defaultBody =
  "I like understanding how the whole system fits together: how a product feels, how its data moves, and how it stays running. That curiosity continues through mobile products, distributed backends, and the homelab where I test new ideas.";

export const AboutTeaser = async ({
  body = defaultBody,
  title = "Beyond the code.",
}: AboutTeaserProps) => {
  const about = await client.fetch<About | null>(aboutQuery, {}, {
    next: { revalidate },
  });
  const profileUrl = about?.profileImage
    ? urlFor(about.profileImage).width(900).height(700).fit("crop").url()
    : null;
  const visibleBody = body?.trim() || defaultBody;
  const visibleTitle = title?.trim() || "Beyond the code.";

  return (
    <section
      aria-labelledby="about-teaser-heading"
      className="relative z-10 bg-tertiary px-4 pb-16 pt-8 md:pb-24"
    >
      <div className="about-reveal mx-auto grid w-full max-w-6xl overflow-hidden border-y border-white/10 lg:grid-cols-12 lg:items-stretch">
        <div className="flex flex-col justify-center py-12 lg:col-span-6 lg:pr-16">
          <h2
            className="text-4xl leading-tight sm:text-5xl md:text-6xl"
            id="about-teaser-heading"
          >
            {visibleTitle}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-primary/72 md:text-lg">
            {visibleBody}
          </p>
          <div className="mt-8">
            <Button route="/about">More about me</Button>
          </div>
        </div>

        {profileUrl && (
          <figure className="relative min-h-80 overflow-hidden bg-midnight lg:col-span-6 lg:min-h-[30rem]">
            <span
              aria-hidden="true"
              className="absolute -right-12 -top-12 z-10 size-36 rounded-full bg-secondary md:size-44"
            />
            <Image
              alt={about?.profileAlt || "Elias Larsson"}
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              src={profileUrl}
              {...(about?.profileLqip
                ? {
                    blurDataURL: about.profileLqip,
                    placeholder: "blur" as const,
                  }
                : {})}
            />
          </figure>
        )}
      </div>
    </section>
  );
};
