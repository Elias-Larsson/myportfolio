import type { Metadata } from "next";
import { Suspense } from "react";
import { Education, Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { ProjectsDisplay } from "./components/projects/projectsdisplay";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import type { Homepage } from "@/sanity/types/homepage";
import { AboutTeaser } from "./components/about-teaser";
import { SectionSkeleton } from "./components/section-skeleton";
import { siteDescription, siteName } from "./site";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_SE",
    siteName: "Elias Larsson Portfolio",
    title: siteName,
    description: siteDescription,
    url: "/",
    images: [
      {
        url: "/portfoliowebpage.png",
        width: 1200,
        height: 630,
        alt: "Elias Larsson's full-stack developer portfolio",
      },
    ],
  },
};

export default async function Home() {
  const homepage = await client.fetch<Homepage>(homepageQuery, {}, {
    next: { revalidate },
  });

  return (
    <>
      <main>
        <Hero
          description={homepage?.heroDescription}
          heading={homepage?.heroHeading}
          headingAccent={homepage?.heroHeadingAccent}
        />
        <Suspense fallback={<SectionSkeleton label="experience" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="selected projects" />}>
          <ProjectsDisplay />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="about preview" />}>
          <AboutTeaser
            body={homepage?.aboutTeaserBody}
            title={homepage?.aboutTeaserTitle}
          />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="education" />}>
          <Education />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
