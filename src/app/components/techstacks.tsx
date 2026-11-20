import { Icon } from "./techstackIcon";

type Props = {
  techstacks: {
    label: string;
    url?: string;
    color?: string;
    icon?: string;
  }[];
};
export const Techstacks = ({ techstacks }: Props) => {
  return (
    <ul
      aria-label="Technologies used"
      className="flex flex-wrap justify-center gap-6"
    >
      {techstacks?.map((techstack) => {
        const content = (
          <>
            <Icon
              color={techstack.color}
              name={techstack.icon ?? techstack.label}
            />
            <span className="font-[family-name:var(--font-body)]">
              {techstack.label}
            </span>
          </>
        );

        return (
          <li key={techstack.label}>
            {techstack.url ? (
              <a
                className="flex items-center gap-1 rounded-sm transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-tertiary motion-reduce:transition-none"
                href={techstack.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {content}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="flex items-center gap-1">{content}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
