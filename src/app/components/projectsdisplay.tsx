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
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
    fetchProjects();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center gap-12 py-24">
      <div className="flex flex-col items-start w-fit gap-4">
      <h1 className="text-3xl">Projects</h1>
      <p className="text-neutral-400 max-w-128">These are some highlight projects. Each page discusses the purpose of the project, what was learned, and how I came up with solutions.</p>
      </div>
      <ul className="flex flex-row justify-center flex-wrap gap-12">
        {projects.map((project) => (
          <li
            key={project._id}
            className="flex flex-col justify-start w-xs gap-1"
          >
            <Link href={`projects/${project.slug.current}`} className="group projectImage relative overflow-hidden w-xs transition duration-300 ease-in-out rounded-xl hover:shadow-2xl cursor-pointer">
            <Image
              className="rounded-xl group-hover:scale-110 transition duration-300 ease-in-out relative z-[0]" 
              alt={project.title || "Project image"}
              src={urlFor(project.projectImage).url()}
              width={320}
              height={320}
            />       
            <div 
            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out text-white text-lg font-semibold underline-animation"
            >View
            </div>
            </Link>
            <h2 className="text-sm text-neutral-400">{project.definition}</h2>
            <h2 className="text-2xl">{project.title}</h2>
            <p className="text-neutral-400 pt-2 line-clamp">{project.description}</p>
            <Link href={`projects/${project.slug.current}`} className="underline pt-2 hover:text-red-900 transition duration-300 ease-in-out">VIEW PROJECT</Link>
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
