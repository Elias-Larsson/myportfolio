const technologyLabels: Record<string, string> = {
  golang: "Go",
  javascript: "JavaScript",
  nextjs: "Next.js",
  postgresql: "PostgreSQL",
  rabbitmq: "RabbitMQ",
  typescript: "TypeScript",
};

const archiveSummaries: Record<string, string> = {
  combat: "An AI-driven combat command simulation.",
  webcrawler: "A concurrent Go crawler scoped to a single domain.",
  streamline: "A B2B studio project for websites and custom software.",
  elana:
    "A full-stack business platform built with Next.js, Express, and RabbitMQ.",
  trainerclash:
    "A full-stack React game where players battle randomly selected Pokémon from PokéAPI.",
  lootboxkilla:
    "A digital marketplace for opening loot boxes and trading items.",
};

export const formatTechnologyLabel = (label: string) =>
  technologyLabels[label.trim().toLowerCase().replace(/[^a-z0-9]/g, "")] ??
  label.trim();

export const getProjectArchiveSummary = (
  slug: string,
  ...fallbacks: Array<string | undefined>
) => archiveSummaries[slug] ?? fallbacks.find((value) => value?.trim())?.trim();
