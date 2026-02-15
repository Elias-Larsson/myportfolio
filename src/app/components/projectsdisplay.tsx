"use client";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Projects } from "@/sanity/types/project";
import { projectsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "./button";

export const ProjectsDisplay = () => {
  const [projects, setProjects] = useState<Projects[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch<Projects[]>(projectsQuery);
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section className="flex-main items-center gap-8 py-48 px-4 bg-tertiary">
      <h1 className="text-[10.5dvw] sm:text-6xl md:text-7xl text-center">
        Featured <span className="text-secondary">Projects</span>
      </h1>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {projects.map((project, i) => (
          <li key={project._id} className="flex flex-col justify-start gap-2">
            {project.projectImage && (
              <Link
                href={`projects/${project.slug.current}`}
                className="group relative overflow-hidden transition duration-300 ease-in-out rounded cursor-pointer"
              >
                <Image
                  className="rounded group-hover:scale-110 transition duration-300 ease-in-out relative z-[0]"
                  alt={project.title || "Project image"}
                  src={urlFor(project.projectImage)
                    .width(360)
                    .height(360)
                    .fit("crop")
                    .url()}
                  width={360}
                  height={360}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out text-white text-lg underline-animation">
                  <h4 className="text-primary">View</h4>
                </div>
              </Link>
            )}
            <div className="flex justify-between">
              <h2 className=" text-xl md:text-2xl">{project.title}</h2>
              <h4 className="text-sm">[{1+i++}]</h4>
            </div>
            <p className="text-sm">{project.definition}</p>
          </li>
        ))}
      </ul>
      <div className="pt-16">
        <Button route="projects" name="VIEW MORE ->" />
      </div>
    </section>
  );
};
