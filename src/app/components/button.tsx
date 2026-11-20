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
      className={`group relative inline-block w-fit overflow-hidden rounded-sm border px-4 py-2 transition duration-300 ease-in-out hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-midnight motion-reduce:transition-none motion-reduce:hover:text-tertiary ${variantClass}`}
    >
      <span className="relative block overflow-hidden">
        <span className="block font-[family-name:var(--font-heading)] uppercase transition-transform duration-300 ease-in-out group-hover:translate-y-full motion-reduce:transform-none motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          {children}
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-y-full font-[family-name:var(--font-heading)] uppercase text-tertiary transition-transform duration-300 ease-in-out group-hover:translate-y-0 motion-reduce:hidden"
        >
          {children}
        </span>
      </span>
    </Link>
  );
};
