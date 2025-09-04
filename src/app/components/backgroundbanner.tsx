type Props = {
  url: string;
};
export const Banner = ({ url }: Props) => {
  return (
    <div className="w-full h-104 overflow-hidden rounded-b-2xl shadow-2xl">
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
