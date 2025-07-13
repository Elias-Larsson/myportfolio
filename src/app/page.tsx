import Image from "next/image";
import { Button } from "./components/button";
import { ProjectsDisplay } from "./components/projectsdisplay";

export default function Home() {
  return (
    <>
      <div className="font-outfit flex flex-col items-center bg-[url('/wavebackground.svg')] bg-cover bg-center bg-no-repeat h-screen pb-12">
        <div className="flex flex-col justify-center h-full p-4">
            <section>
            <h1 className="text-5xl font-outfit ">Hello, <br /> I am Elias Larsson</h1>
            <h2 className="text-neutral-400 text-2xl">An awesome fullstack developer</h2>
            <p className="p-4">
              I talk about myself and stuff. A short and entising hook
              I talk about myself. <br/>
              I talk about myself and stuff.
            </p>
          </section>
          <Button name="Contact me" route="/contact" decoration={true}/>
        </div>
        <div className="h-24">
        <Image src="/maki_whitedownarrow.svg" alt="" width={38} height={38} className="arrow-animation"/>
        </div>
      </div>
      <ProjectsDisplay />
    </>
  );
}
