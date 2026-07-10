import { Suspense } from "react";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { ProjectsDisplay } from "./components/projects/projectsdisplay";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import type { Homepage } from "@/sanity/types/homepage";

export const revalidate = 60;

export default async function Home() {
  const homepage = await client.fetch<Homepage>(homepageQuery, {}, {
    next: { revalidate },
  });

  return (
    <>
      <Hero description={homepage?.description} />
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectsDisplay />
      </Suspense>
      <main className="relative flex flex-col items-center justify-between">
        <Footer />
      </main>
    </>
  );
}
