import Link from "next/link";

type Props = {
  name?: string;
  route: string | "#";
};

export const Button = ({ name = "Button", route }: Props) => {
  return (
    <Link
      href={route}
      className="group relative inline-block overflow-hidden w-fit bg-tertiary px-4 py-2 rounded-sm border-white/5 border hover:bg-primary transition duration-300 ease-in-out"
    >
      <span className="relative block overflow-hidden">
        {/* Visible text */}
        <h4 className="transition-transform duration-300 ease-in-out group-hover:translate-y-full">
          {name}
        </h4>

        {/* Sliding text from top */}
        <h4 className="absolute inset-0 -translate-y-full transition-transform duration-300 ease-in-out text-tertiary group-hover:translate-y-0">
          {name}
        </h4>
      </span>
    </Link>
  );
};
