import { urlFor } from "@/sanity/lib/image";
type Props = {
  url: string;
};
export const Banner = ({ url }: Props) => {
  return (
    <div className="w-full sm:w-3/4 h-104 overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${url ? urlFor(url).url() : ""})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          height: "800px",
        }}
      ></div>
    </div>
  );
};
