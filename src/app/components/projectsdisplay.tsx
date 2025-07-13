"use client";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { useState, useEffect } from "react";

export const ProjectsDisplay = () => {
  const [projects, setProjects] = useState<SanityDocument[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await client.fetch<SanityDocument[]>(
        `*[_type == "project"]{_id, projectTitle, projectDescription, projectImage}`
      );
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h2>{project.projectTitle}</h2>
            <p>{project.projectDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}