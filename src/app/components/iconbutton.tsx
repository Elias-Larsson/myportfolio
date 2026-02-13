import Image from "next/image";
import Link from "next/link";

type Props = {
  route: "github" | "linkedin";
};

export const IconButton = ({ route }: Props) => {
  let imageLight = "";
  let imageDark = "";
  let routeURL = "#"
  switch (route) {
    case "github":
      imageLight = "/github_light.svg";
      imageDark = "/github_dark.svg";
        routeURL =
          "https://github.com/Elias-Larsson";

      break;
    case "linkedin":
      imageLight = "/linkedin_light.svg";
      imageDark = "/linkedin_dark.svg";
      routeURL = "https://www.linkedin.com/in/elias-h-larsson";
      break;
    default:
      return null;
  }

  return (
    <Link
      href={routeURL}
      target="_blank"
      className="relative inline-block w-9 h-9 group"
    >
      {/* Dark icon visible by default */}
      <Image
        src={imageDark}
        alt={`${route} icon`}
        width={36}
        height={36}
        className="absolute inset-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
      />

      {/* Light icon slides in on hover */}
      <Image
        src={imageLight}
        alt={`${route} icon`}
        width={36}
        height={36}
        className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
      />
    </Link>
  );
};
