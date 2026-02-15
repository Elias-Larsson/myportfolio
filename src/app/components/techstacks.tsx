import { Icon } from "./techstackIcon";

type Props = {
  techstacks: { label: string; url: string; color: string; icon: string }[];
};
export const Techstacks = ({ techstacks }: Props) => {
  return (
   <div className="flex justify-center flex-wrap gap-6">
          {techstacks?.map((techstack) => (
            <a
              href={techstack.url}
              key={techstack.label}
              className="flex gap-1 transition hover:text-secondary"
            >
              <Icon name={techstack.icon} />
              {techstack.label}
            </a>
          ))}
        </div>
  );
};
