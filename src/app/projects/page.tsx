import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { ProjectsDisplay } from "../components/projectsdisplay";

export default function Projects() {
  return (
    <main className="flex-main items-center pb-24 pt-48 min-h-screen gap-24">
      <div className="flex-grow flex items-center justify-center">
        <Navbar />
        <ProjectsDisplay />
      </div>
      <Footer />
    </main>
  );
}
