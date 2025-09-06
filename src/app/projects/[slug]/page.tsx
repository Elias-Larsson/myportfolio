// app/project/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Banner } from "@/app/components/backgroundbanner";
import { Techstacks } from "@/app/components/techstacks";
import { Button } from "@/app/components/button";
import Image from "next/image";
import { projectQuery } from "@/sanity/lib/queries";
import { Project } from "@/sanity/types/project";
import { urlFor } from "@/sanity/lib/image";
import { Footer } from "@/app/components/footer";
import { Navbar } from "@/app/components/navbar";

export default function SlugProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    async function fetchData() {
      try {
        const project = await client.fetch<Project>(projectQuery, { slug });
        setProject(project);
      } catch (err) {
        console.error(`Error when fetching slug project`, err);
      }
    }

    fetchData();
  }, [slug]);

  if (!project)
    return (
      <p>
        Loading...
        <br />
      </p>
    );

  return (
    <div className="flex-main items-center pb-24">
      <Navbar />
      <Banner
        url={urlFor(project.backgroundImage || "/wavebackground.svg").url()}
      ></Banner>
      <main className="pt-8 flex flex-col items-start gap-8 pb-48 justify-around sm:flex-row px-6">
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl">{project.title}</h1>
          <nav className="flex flex-row gap-2">
            {project.liveDemoLink && (
              <Button
                name="Live Demo"
                route={project.liveDemoLink}
                decoration="/maki_arrow.svg"
              />
            )}
            <Button
              route={project.repoLink || "#"}
              decoration="/mdi_github.svg"
            />
          </nav>
          <p className="max-w-128 text-neutral-400">{project.description}</p>
          <p className="text-base/7 max-w-152">{project.longDescription}</p>
        </section>
        <figure className="flex flex-col items-center gap-4 max-w-96">
          {project.video ? (
            <video
              src={project.video}
              className="object-cover object-top w-96 rounded-2xl"
              autoPlay
              muted
              loop
            />
          ) : (
            project.previewImage && (
              <Image
                src={urlFor(project.previewImage).url()}
                alt="Project preview"
                width={384}
                height={384}
                className="object-cover object-top w-96 rounded-2xl"
              />
            )
          )}
          {project.techstack && <Techstacks techstacks={project.techstack} />}
        </figure>
      </main>
      <Footer />
    </div>
  );
}
