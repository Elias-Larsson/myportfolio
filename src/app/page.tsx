import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center bg-[url('/wavebackground.svg')] bg-cover bg-center bg-no-repeat w-screen h-screen">
        <Navbar></Navbar>
        <div className="flex flex-col items-center justify-center flex-1">
          <h1>Elias Larsson</h1>
          <p>coming soon...</p>
          <a href="https://github.com/Elias-Larsson">github</a>
        </div>
      </div>
    </>
  );
}
