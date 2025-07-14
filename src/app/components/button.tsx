import Link from "next/link";
import Image from "next/image";

type Props = {
  name?: string;
  route: string | "#";
  decoration?: string;
};

export const Button = ({ name, route, decoration }: Props) => {
  const invertColors = !name ? "group-hover:invert" : "";


  return (
    <Link href={route} className="cursor-pointer">
      <div
        className={`button flex flex-row justify-center items-center w-fit bg-neutral-300/30 backdrop-blur-sm p-2 rounded-3xl gap-2 group`}
      >
        {name &&(
          <p>{name}</p>
        )}
        {decoration && (
          <Image
            src={decoration}
            alt="arrow"
            width={24}
            height={24}
            className={`${invertColors}`}
          />
        )}
      </div>
    </Link>
  );
};