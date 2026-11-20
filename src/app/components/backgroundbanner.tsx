import Image from "next/image";

type Props = {
  url: string;
  alt?: string;
  priority?: boolean;
};

export const Banner = ({ url, alt = "", priority = false }: Props) => {
  if (!url) return null;

  return (
    <div className="relative h-[clamp(20rem,52vw,46rem)] w-full overflow-hidden">
      <Image
        alt={alt}
        className="object-cover object-top"
        fill
        priority={priority}
        sizes="100vw"
        src={url}
      />
    </div>
  );
};
