import { Footer } from "../components/footer";
import { ProjectsPage } from "../components/projects/projects";

export default function Projects() {
  return (
    <>
      <main className="w-screen bg-tertiary">
        <div className="flex-grow flex flex-col items-center justify-center">
          <ProjectsPage />
        </div>
      </main>
      <Footer />
    </>
  );
}
