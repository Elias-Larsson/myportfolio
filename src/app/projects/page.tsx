import type { Metadata } from "next";

import { Footer } from "../components/footer";
import { HomeDuck } from "../components/home-duck";
import { ProjectsPage } from "../components/projects/projects";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected case studies, backend systems, product work, and development experiments by Elias Larsson.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    locale: "en_SE",
    siteName: "Elias Larsson Portfolio",
    title: "Projects",
    description:
      "Selected case studies, backend systems, product work, and development experiments by Elias Larsson.",
    url: "/projects",
    images: [
      {
        url: "/portfoliowebpage.png",
        width: 1200,
        height: 630,
        alt: "Projects by Elias Larsson",
      },
    ],
  },
};

export default function Projects() {
  return (
    <>
      <main className="relative w-full bg-tertiary wrap-anywhere">
        <HomeDuck />
        <ProjectsPage />
      </main>
      <Footer />
    </>
  );
}
