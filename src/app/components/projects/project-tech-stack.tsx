import type { ProjectSkill } from "@/sanity/types/project";
import { Icon } from "../techstackIcon";

type Props = {
  skills?: ProjectSkill[] | null;
  limit?: number;
  compact?: boolean;
  className?: string;
};

export const ProjectTechStack = ({
  skills,
  limit,
  compact = false,
  className = "",
}: Props) => {
  const visible = skills
    ?.filter((skill) => skill.label?.trim())
    .slice(0, limit);

  if (!visible?.length) return null;

  return (
    <ul
      aria-label="Tech stack"
      className={`flex flex-wrap ${compact ? "gap-x-3 gap-y-1" : "gap-2"} ${className}`}
    >
      {visible.map(({ label, icon }) => (
        <li
          className={`inline-flex max-w-full items-center text-xs text-primary/75 ${compact ? "gap-1 [&_svg]:size-3" : "gap-1.5 rounded-sm border border-primary/20 px-2.5 py-1 [&_svg]:size-4"} [&_svg]:shrink-0`}
          key={label}
        >
          <Icon name={icon || label} />
          <span className="min-w-0 wrap-anywhere">{label}</span>
        </li>
      ))}
    </ul>
  );
};
