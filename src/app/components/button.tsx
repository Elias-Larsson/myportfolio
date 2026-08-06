import Link from "next/link";

type Props = {
  children: React.ReactNode;
  route: string;
  variant?: "default" | "accent";
};

export const Button = ({ children, route, variant = "default" }: Props) => {
  const variantClass =
    variant === "accent"
      ? "border-secondary/70 bg-secondary/10 shadow-[0_0_0_1px_rgba(255,56,49,0.08)]"
      : "border-white/10 bg-tertiary";

  return (
    <Link
      href={route}
      className={`group relative inline-block w-fit overflow-hidden rounded-sm border px-4 py-2 transition duration-300 ease-in-out hover:bg-primary ${variantClass}`}
    >
      <span className="relative block overflow-hidden">
        {/* Visible text */}
        <h4 className="transition-transform duration-300 ease-in-out group-hover:translate-y-full">
          {children}
        </h4>

        {/* Sliding text from top */}
        <h4 className="absolute inset-0 -translate-y-full transition-transform duration-300 ease-in-out text-tertiary group-hover:translate-y-0">
          {children}
        </h4>
      </span>
    </Link>
  );
};
