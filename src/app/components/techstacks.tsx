type Props = {
  techstacks: string[];
};
export const Techstacks = ({ techstacks }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {techstacks?.map((techstack: string) => (
        <span
          key={techstack}
          className="bg-red-900 px-4 py-2 rounded-xl hover:bg-red-950 transition duration-200 ease-in-out cursor-default"
        >
          {techstack}
        </span>
      ))}
    </div>
  );
};
