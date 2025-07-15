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

export default function SlugProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    async function fetchData() {
      try {
        const project = await client.fetch<Project>(projectQuery, { slug });
        console.log("Fetched project:", project);
        setProject(project);
      } catch (err) {
        console.log(`Error when fetching slug project`, err);
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
    <>
      <Banner url={project.backgroundImage || "/wavebackground.svg"}></Banner>
      <main className="py-8 flex flex-col items-start gap-8 justify-around sm:flex-row">
        <div className="flex flex-col  gap-4 px-4">
          <h1 className="text-4xl">{project.title}</h1>
          <div className="flex flex-row gap-2">
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
          </div>
          <p className="max-w-128 text-neutral-400">{project.description}</p>
          <p className="text-base/7 max-w-152">{project.longDescription}</p>
        </div>
        <div className="flex flex-col items-center gap-4 max-w-128">
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
                src={project.previewImage}
                alt="Project preview"
                width={384}
                height={384}
                className="object-cover object-top w-96 rounded-2xl"
              />
            )
          )}
          {project.techstacks && (
            <Techstacks techstacks={project.techstack || []} />
          )}
        </div>
      </main>
    </>
  );
}
