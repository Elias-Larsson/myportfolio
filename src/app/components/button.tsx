import Link from "next/link";
import Image from "next/image";

type Props = {
  name?: string;
  route: string | "#";
};

export const Button = ({ name, route }: Props) => {

  return (
    <Link href={route} className="cursor-pointer">
      <div
        className={`w-fit bg-tertiary px-4 py-2 rounded-sm border-white/5 border-1`}
      >
        {name && <h4>{name}</h4>}
      </div>
    </Link>
  );
};
