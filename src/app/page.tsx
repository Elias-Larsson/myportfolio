"use client";
import { Button } from "./components/button";
import { ProjectsDisplay } from "./components/projects/projectsdisplay";
import { Footer } from "./components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { homepageQuery, professionalProfileQuery } from "@/sanity/lib/queries";
import { Homepage } from "@/sanity/types/homepage";
import { ProfessionalProfile } from "@/sanity/types/professionalProfile";
import { IconButton } from "./components/iconbutton";
import { VectorTransition } from "./components/background/depthbg";
import { Experience } from "./components/experience";
import { useScrollY } from "./hooks/scrollY";

export default function Home() {
  const [homepage, setHomepage] = useState<Homepage>();
  const [professionalProfile, setProfessionalProfile] = useState<ProfessionalProfile | null>(null);
  const scrollY = useScrollY();

  useEffect(() => {
    async function fetchContent() {
      try {
        const [homepageData, profileData] = await Promise.all([
          client.fetch<Homepage>(homepageQuery),
          client.fetch<ProfessionalProfile | null>(professionalProfileQuery),
        ]);
        setHomepage(homepageData);
        setProfessionalProfile(profileData);
      } catch (err) {
        console.error("Error fetching homepage content:", err);
      }
    }
    fetchContent();
  }, []);

  if (!homepage) return <div>Loading...</div>;
  return (
    <>
      <main className="relative flex flex-col items-center justify-between min-h-screen">
        
        <span
          aria-hidden="true"
          className="z-20 absolute rounded-full bg-secondary size-[20vw] lg:size-[10vw] right-8 top-8"
          style={{
            transform: `translateY(${scrollY * 0.55}px)`,
          }}
        />
        <section
          className="px-4 flex pt-10 items-end flex-grow overflow-visible relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.375}px)`,
          }}
        >
          <div className="flex flex-col">
            <h1 className="text-[10.5dvw] sm:text-6xl md:text-7xl pb-4">
              FUTURE OF WEB
              <br />
              <span className="text-secondary">DEVELOPMENT.</span>
            </h1>
            <div className="flex flex-col gap-4 max-w-128">
              <p>
                {homepage.description}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <Button route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com">
                  Contact me
                </Button>
                <IconButton route="linkedin" />
                <IconButton route="github" />
              </div>
            </div>
          </div>
        </section>
        <VectorTransition />
      </main>
      <Experience profile={professionalProfile} />
      <ProjectsDisplay />
      <main className="relative flex flex-col items-center justify-between">
        <Footer />
      </main>
    </>
  );
}
