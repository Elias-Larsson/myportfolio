import {
  SiAngular,
  SiApachenetbeanside,
  SiAuth0,
  SiExpress,
  SiFastify,
  SiFramer,
  SiGo,
  SiGooglemaps,
  SiJavascript,
  SiJest,
  SiLaravel,
  SiMariadb,
  SiMongodb,
  SiMongoose,
  SiNextdotjs,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiRabbitmq,
  SiReact,
  SiSass,
  SiSvelte,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiTrpc,
  SiVite,
} from "@icons-pack/react-simple-icons";

const icons = {
  angular: SiAngular,
  apachenetbeanside: SiApachenetbeanside,
  auth0: SiAuth0,
  express: SiExpress,
  fastify: SiFastify,
  framer: SiFramer,
  framermotion: SiFramer,
  go: SiGo,
  golang: SiGo,
  googlemaps: SiGooglemaps,
  javascript: SiJavascript,
  jest: SiJest,
  laravel: SiLaravel,
  mariadb: SiMariadb,
  mongodb: SiMongodb,
  mongoose: SiMongoose,
  nextdotjs: SiNextdotjs,
  nextjs: SiNextdotjs,
  openai: SiOpenai,
  openaiapi: SiOpenai,
  php: SiPhp,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  rabbitmq: SiRabbitmq,
  react: SiReact,
  sass: SiSass,
  svelte: SiSvelte,
  supabase: SiSupabase,
  tailwindcss: SiTailwindcss,
  typescript: SiTypescript,
  trpc: SiTrpc,
  vite: SiVite,
  maps: SiGooglemaps,
  motion: SiFramer,
} as const;

const normalizeIconName = (name: string) =>
  name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");

export const Icon = ({
  name,
  color,
  size = 24,
}: {
  name: string;
  color?: string;
  size?: number;
}) => {
  const TechnologyIcon = icons[normalizeIconName(name) as keyof typeof icons];

  if (!TechnologyIcon) {
    return (
      <svg
        aria-hidden="true"
        className="shrink-0"
        fill="none"
        focusable="false"
        height={size}
        width={size}
        viewBox="0 0 24 24"
      >
        <path
          d="m8.5 8-4 4 4 4m7-8 4 4-4 4M14 5l-4 14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.75"
        />
      </svg>
    );
  }

  return (
    <TechnologyIcon
      aria-hidden="true"
      color={color}
      focusable="false"
      size={size}
      title=""
    />
  );
};
