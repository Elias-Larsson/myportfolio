import Link from "next/link";
import Image from "next/image";

type Props = {
  name: string;
  route: string | "#";
  decoration: boolean;
};

export const Button = ({ name, route, decoration }: Props) => {
    return (
      <Link href={route} className="cursor-pointer">
        <div className="button flex flex-row justify-center items-center w-fit bg-neutral-300/30 bg-blur p-2 rounded-3xl gap-2">
          <p>{name}</p>
          {decoration && 
            <Image src="/maki_arrow.svg" alt="arrow" width={24} height={24} />
          }
        </div>
      </Link>
    )
  }