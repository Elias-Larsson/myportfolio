import * as Logos from "@icons-pack/react-simple-icons";

export const Icon = ({ name, color }: { name: string; color?: string }) => {
  name = `Si${name.charAt(0).toUpperCase() + name.slice(1)}`;

  const Icon = Logos[name as keyof typeof Logos] as Logos.IconType;

  if (!Icon) {
    return <Logos.SiReact />;
  }

  return <Icon color={color} />;
};
