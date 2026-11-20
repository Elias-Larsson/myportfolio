import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/app/components/button";
import { Footer } from "@/app/components/footer";
import { HomeDuck } from "@/app/components/home-duck";
import { hasMedia, MediaFrame } from "@/app/components/media-frame";
import { Icon } from "@/app/components/techstackIcon";
import { getExperienceCases } from "@/sanity/lib/professional-profile";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

const findCase = async (slug: string) =>
  (await getExperienceCases()).find((item) => item.slug === slug);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findCase(slug);

  if (!item) return { title: "Experience not found", robots: { index: false } };

  return {
    title: item.company,
    description: item.overview?.slice(0, 160),
    alternates: { canonical: `/experience/${item.slug}` },
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { slug } = await params;
  const item = await findCase(slug);
  if (!item) notFound();

  const roleDescription = item.caseStudy?.roleDescription?.trim();
  const achievements =
    item.achievements?.map((point) => point.trim()).filter(Boolean) ?? [];
  const technologies = [
    ...new Set(item.technologies?.map((tech) => tech.trim()).filter(Boolean)),
  ];
  const media = (item.caseStudy?.media ?? []).filter(hasMedia);

  return (
    <>
      <main className="relative bg-tertiary px-4 pb-28 pt-28 wrap-anywhere sm:px-8 sm:pt-36 lg:px-12">
        <HomeDuck />
        <article className="mx-auto w-full max-w-6xl">
          <header className="border-b border-primary/25 pb-12 md:pb-16">
            <h1 className="text-[clamp(2rem,9vw,3.5rem)] leading-[0.94] text-secondary sm:text-[clamp(3.5rem,10vw,7rem)]">
              {item.company}
            </h1>
          </header>

          <div className="divide-y divide-primary/20">
            {item.overview && (
              <section className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[minmax(10rem,0.35fr)_minmax(0,1fr)] md:py-14">
                <h2 className="text-2xl">Overview</h2>
                <p className="max-w-3xl whitespace-pre-line leading-8 text-primary/80">
                  {item.overview}
                </p>
              </section>
            )}

            <section className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[minmax(10rem,0.35fr)_minmax(0,1fr)] md:py-14">
              <h2 className="text-2xl">My role</h2>
              <div>
                <p className="text-lg text-primary">{item.role}</p>
                {item.period && (
                  <p className="mt-1 text-sm text-secondary-readable">
                    {item.period}
                  </p>
                )}
                {roleDescription && (
                  <p className="mt-5 max-w-3xl whitespace-pre-line leading-8 text-primary/80">
                    {roleDescription}
                  </p>
                )}
                {achievements.length > 0 && (
                  <ul className="mt-5 max-w-3xl list-disc space-y-2 pl-5 leading-7 text-primary/80 marker:text-secondary-readable">
                    {achievements.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {technologies.length > 0 && (
              <section className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[minmax(10rem,0.35fr)_minmax(0,1fr)] md:py-14">
                <h2 className="text-2xl">Tech stack</h2>
                <ul className="flex flex-wrap items-start gap-2">
                  {technologies.map((technology) => (
                    <li
                      className="flex max-w-full items-center gap-2 rounded-sm border border-primary/20 px-3 py-2 text-sm text-primary/80 [&_svg]:shrink-0"
                      key={technology}
                    >
                      <Icon name={technology} size={16} />
                      <span className="min-w-0">{technology}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {media.length > 0 && (
              <section
                className="py-10 md:py-14"
                aria-labelledby="experience-media-heading"
              >
                <h2 className="text-2xl" id="experience-media-heading">
                  Media
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {media.map((asset) => (
                    <MediaFrame
                      className="overflow-hidden rounded-sm border border-white/10 bg-midnight only:col-span-full"
                      key={asset._key}
                      media={asset}
                      sizes={
                        media.length === 1
                          ? "(min-width: 1280px) 1152px, 100vw"
                          : "(min-width: 1280px) 566px, (min-width: 640px) 50vw, 100vw"
                      }
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        <nav
          aria-label="Return to experience"
          className="mt-16 flex justify-center"
        >
          <Button route="/#experience">Back to experience</Button>
        </nav>
      </main>
      <Footer />
    </>
  );
}
