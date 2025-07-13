"use client";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export const ProjectsDisplay = () => {
  const [projects, setProjects] = useState<SanityDocument[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch<SanityDocument[]>(
          `*[_type == "project"]{_id, title, definition, slug, techstack, description, projectImage}`
        );
        setProjects(data);
        console.log("Fetched projects:", data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);
  return (
    <div className="flex flex-col h-screen items-center gap-8 py-8">
      <h1 className="text-4xl">Projects</h1>
      <ul className="flex flex-row items-start flex-wrap gap-12">
        {projects.map((project) => (
          <li
            key={project._id}
            className="flex flex-col justify-center py-6 w-xs"
          >
            <Image
              className="rounded-xl shadow"
              alt={project.title || "Project image"}
              src={urlFor(project.projectImage).url()}
              width={320}
              height={320}
            />
            <h2 className="text-sm text-neutral-400">{project.definition}</h2>
            <h1 className="text-3xl">{project.title}</h1>
            <p className="text-neutral-400 pt-2">{project.description}</p>
            <Link href="#" className="text-neutral-400 underline pt-2">VIEW PROJECT</Link>
            {/* <div className="flex flex-wrap gap-2 pt-2">
              {project.techstack?.map((tech: string) => (
                <span
                  key={tech}
                  className="bg-red-900 text-red-300 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
