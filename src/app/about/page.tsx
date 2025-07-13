import { Button } from "../components/button";

export default function About() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-outfit">About Me</h1>
      <p className="text-neutral-400 text-2xl p-4">
        I am a passionate fullstack developer with a love for creating dynamic and engaging web applications. My journey in tech has been fueled by curiosity and a desire to solve real-world problems through code.
      </p>
      <Button name="Contact me" route="/contact" decoration={true} />
    </div>
  );
}