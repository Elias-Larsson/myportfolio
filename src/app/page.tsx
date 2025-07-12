import { Button } from "./components/button";
import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <>
      <div className="text-white font-outfit flex flex-col items-center bg-[url('/wavebackground.svg')] bg-cover bg-center bg-no-repeat w-screen h-screen">
        <Navbar></Navbar>
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
      </div>
      <div className="h-screen">

      </div>
      </>
  );
}
