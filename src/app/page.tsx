"use client";
import { Button } from "./components/button";
import { ProjectsDisplay } from "./components/projectsdisplay";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { Homepage } from "@/sanity/types/homepage";
import { IconButton } from "./components/iconbutton";
import { VectorTransition } from "./components/background/depthbg";
import { ReverseVectorTransition } from "./components/background/reversedepthbg";

export default function Home() {
  const [homepage, setHomepage] = useState<Homepage>();
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
        <Navbar />
        <section className="px-4 flex pt-10 items-end flex-grow">
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
                <Button
                  name="Contact me"
                  route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com"
                />
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
        {/* {homepage.skills && <Skills skills={homepage.skills} />} */}
        <Footer />
      </main>
    </>
  );
}