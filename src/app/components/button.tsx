import Image from "next/image";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
  route: string;
  variant?: "default" | "accent";
  icon?: string;
  ariaLabel?: string;
  external?: boolean;
};

export const Button = ({
  children,
  route,
  variant = "default",
  icon,
  ariaLabel,
  external = false,
}: Props) => {
  const variantClass =
    variant === "accent"
      ? "border-secondary/70 bg-secondary/10 shadow-[0_0_0_1px_rgba(255,56,49,0.08)]"
      : "border-white/10 bg-tertiary";

  return (
    <Link
      aria-label={ariaLabel}
      href={route}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
      className={`group relative w-fit overflow-hidden rounded-sm border px-4 py-2 transition duration-300 ease-in-out hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-midnight motion-reduce:transition-none motion-reduce:hover:text-tertiary ${icon ? "inline-flex min-h-11 items-center" : "inline-block"} ${variantClass}`}
    >
      <span className="relative block overflow-hidden">
        <span className="flex items-center gap-2 font-[family-name:var(--font-heading)] uppercase transition-transform duration-300 ease-in-out group-hover:translate-y-full motion-reduce:transform-none motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          {icon && (
            <Image
              alt=""
              src={icon}
              width={20}
              height={20}
              className="shrink-0 motion-reduce:group-hover:invert"
            />
          )}
          {children}
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-0 flex -translate-y-full items-center gap-2 font-[family-name:var(--font-heading)] uppercase text-tertiary transition-transform duration-300 ease-in-out group-hover:translate-y-0 motion-reduce:hidden"
        >
          {icon && (
            <Image
              alt=""
              src={icon}
              width={20}
              height={20}
              className="shrink-0 invert"
            />
          )}
          {children}
        </span>
      </span>
    </Link>
  );
};
