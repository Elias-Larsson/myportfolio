"use client";
import { Button } from "./components/button";
import { ProjectsDisplay } from "./components/projects/projectsdisplay";
import { Footer } from "./components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { Homepage } from "@/sanity/types/homepage";
import { IconButton } from "./components/iconbutton";
import { VectorTransition } from "./components/background/depthbg";
import { ReverseVectorTransition } from "./components/background/reversedepthbg";
import { useScrollY } from "./hooks/scrollY";

export default function Home() {
  const [homepage, setHomepage] = useState<Homepage>();
  const scrollY = useScrollY();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch<Homepage>(homepageQuery);
        setHomepage(data);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
      }
    }
    fetchProjects();
  }, []);

  if (!homepage) return <div>Loading...</div>;
  return (
    <>
      <main className="relative flex flex-col items-center justify-between min-h-screen">
        <div></div>
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
                My name is Elias Larsson, I am currently studying in Stockholm
                and building both web applications and backend tools in my spare
                time.
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
      <ProjectsDisplay />
      <main className="relative flex flex-col items-center justify-between">
        <ReverseVectorTransition />
        <Footer />
      </main>
    </>
  );
}
