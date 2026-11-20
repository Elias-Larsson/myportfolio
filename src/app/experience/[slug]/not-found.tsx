import { Button } from "@/app/components/button";
import { HomeDuck } from "@/app/components/home-duck";

export default function ExperienceNotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-tertiary px-4 py-24 text-center">
      <HomeDuck />
      <div>
        <h1 className="text-3xl sm:text-5xl">Experience not found</h1>
        <div className="mt-8">
          <Button route="/#experience">Back to experience</Button>
        </div>
      </div>
    </main>
  );
}
