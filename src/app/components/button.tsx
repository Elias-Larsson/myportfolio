import Link from "next/link";
import Image from "next/image";

type Props = {
  name: string;
  route: string | "#";
  decoration: boolean;
};

export const Button = ({ name, route, decoration }: Props) => {
  if (decoration) {
    return (
      <Link href={route}>
        <div className="button flex flex-row justify-center items-center w-fit bg-neutral-300/30 bg-blur p-2 rounded-3xl gap-2 ">
          <p>{name}</p>
          <Image src="/maki_arrow.svg" alt="arrow" width={24} height={24} />
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={route}>
        <div className="button flex flex-row justify-center items-center w-fit bg-neutral-300/30 bg-blur p-2 rounded-3xl gap-2">
          <p>{name}</p>
        </div>
      </Link>
    );
  }
};
