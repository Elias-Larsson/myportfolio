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
        console.log("Fetched project:", project);
      setProject(project);
    }

    fetchData();
  }, [slug]);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <Image src={urlFor(project.projectImage).url()} alt="whatver" width={320} height={320}/>
        
    </div>
  );
}
