import { Button } from "@/app/components/button";
import { Footer } from "@/app/components/footer";
import { HomeDuck } from "@/app/components/home-duck";

export default function ProjectNotFound() {
  return (
    <>
      <main className="relative flex min-h-[75svh] items-center bg-tertiary px-4 py-28 sm:px-8">
        <HomeDuck />
        <div className="mx-auto w-full max-w-4xl border-y border-primary/20 py-16 sm:py-20">
          <p className="text-xs uppercase tracking-[0.18em] text-secondary-readable">
            [ 404 · Project not found ]
          </p>
          <h1 className="mt-5 text-5xl leading-[0.95] sm:text-7xl">
            This story is not in the archive.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-primary/70">
            The project may have moved, or the address may be incomplete.
          </p>
          <div className="mt-8">
            <Button route="/projects">← Back to projects</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
