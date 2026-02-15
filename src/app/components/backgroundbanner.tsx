type Props = {
  url: string;
};
export const Banner = ({ url }: Props) => {
  return (
    <div className="w-full h-1/2 overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${url ? url : ""})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          height: "800px",
        }}
      ></div>
    </div>
  );
};
