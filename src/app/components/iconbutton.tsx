import Image from "next/image";
import Link from "next/link";

type Props = {
  route: "github" | "linkedin";
};

export const IconButton = ({ route }: Props) => {
  const social = {
    github: {
      label: "GitHub",
      imageLight: "/github_light.svg",
      imageDark: "/github_dark.svg",
      url: "https://github.com/Elias-Larsson",
    },
    linkedin: {
      label: "LinkedIn",
      imageLight: "/linkedin_light.svg",
      imageDark: "/linkedin_dark.svg",
      url: "https://www.linkedin.com/in/elias-h-larsson",
    },
  }[route];

  return (
    <Link
      aria-label={`Visit Elias Larsson on ${social.label} (opens in a new tab)`}
      href={social.url}
      rel="noopener noreferrer"
      target="_blank"
      className="group relative inline-block size-9 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-midnight"
    >
      <Image
        alt=""
        aria-hidden="true"
        src={social.imageDark}
        width={36}
        height={36}
        className="absolute inset-0 opacity-100 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none"
      />

      <Image
        alt=""
        aria-hidden="true"
        src={social.imageLight}
        width={36}
        height={36}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
      />
    </Link>
  );
};
