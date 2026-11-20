import type { Metadata } from "next";
import { Suspense } from "react";
import { Education, Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { ProjectsDisplay } from "./components/projects/projectsdisplay";
import { getHomepage } from "@/sanity/lib/homepage";
import { getExperienceCases } from "@/sanity/lib/professional-profile";
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
  const [homepage, experience] = await Promise.all([
    getHomepage(),
    getExperienceCases(),
  ]);

  return (
    <>
      <main className="wrap-anywhere">
        <Hero
          description={homepage?.description}
          hasExperience={experience.length > 0}
        />
        <Suspense fallback={<SectionSkeleton label="experience" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton label="selected projects" />}>
          <ProjectsDisplay
            heading={homepage?.featuredHeading}
            description={homepage?.featuredDescription}
          />
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
