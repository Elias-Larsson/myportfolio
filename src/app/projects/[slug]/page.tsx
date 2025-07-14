// app/project/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { groq, SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export default function SlugProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<SanityDocument | null>(null);

  useEffect(() => {
    async function fetchData() {
      const query = groq`*[_type == "project" && slug.current == $slug][0]`;
      const project = await client.fetch(query, { slug });
      console.log("Fetched project:", project.projectImage);
      setProject(project);
    }

    fetchData();
  }, [slug]);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <section className="h-96 flex justify-center items-center overflow-hidden">
        <div className="w-[800px] h-[600px] justify-center items-center relative">
          <Image
            src={urlFor(project.projectImage).url()}
            alt="background image"
            width={800}
            height={600}
            className="object-cover"
          />
        </div>
      </section>

      <div className="whitespace-nowrap">
        <h1 className="text-3xl">{project.title}</h1>
      </div>
    </div>
  );
}
