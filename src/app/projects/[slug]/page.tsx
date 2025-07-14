// app/project/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { groq, SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Banner } from "@/app/components/backgroundbanner";
import { Techstacks } from "@/app/components/techstacks";
import { Button } from "@/app/components/button";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default function SlugProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<SanityDocument | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = groq`*[_type == "project" && slug.current == $slug][0] {
        title,
        slug,
        techstack,
        description,
        longDescription,
        projectImage,
        backgroundImage,
        previewImage,
        repoLink,
        liveDemoLink,
        video {
          asset-> {
            url
          }
        }
      }`;
        const project = await client.fetch(query, { slug });
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
      <Banner url={project.backgroundImage}></Banner>
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
            <Button decoration="/mdi_github.svg" route={project.repoLink} />
          </div>
          <p className="max-w-128 text-neutral-400">{project.description}</p>
          <p className="text-base/7 max-w-152">{project.longDescription}</p>
        </div>
        <div className="flex flex-col items-center gap-4 max-w-128">
          {project.video ? (
            <video
              src={project.video.asset.url}
              className="object-cover object-top w-96"
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
                className="object-cover object-top w-96 max-h-128"
              />
            )
          )}
          <Techstacks techstacks={project.techstack} />
        </div>
      </main>
    </>
  );
}
