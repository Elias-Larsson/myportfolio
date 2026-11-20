import type { SanityDocument } from "next-sanity";
import type { Image, Slug } from "sanity";

export type ProjectCategory = "caseStudy" | "experiment";

export type ProjectSkill = {
  label: string;
  url?: string;
  color?: string;
  icon?: string;
};

export type SanityImageDimensions = {
  width: number;
  height: number;
  aspectRatio: number;
};

export type Projects = SanityDocument & {
  title: string;
  definition: string;
  featured: boolean;
  description: string;
  slug: Slug;
  projectImage?: Image;
  projectImageAlt?: string;
  projectImageLqip?: string;
  projectImageDimensions?: SanityImageDimensions;
  projectCategory?: ProjectCategory;
  displayOrder?: number;
  year?: number;
  role?: string;
  team?: string;
  timeline?: string;
  context?: string;
  outcomeSummary?: string;
  skills?: ProjectSkill[];
};

export type Project = Projects & {
  longDescription?: string;
  challenge?: string;
  contribution?: string;
  technicalDecision?: string;
  outcome?: string;
  learning?: string;
  liveDemoLink?: string;
  repoLink?: string;
  otherLinks?: { _key: string; label: string; url: string }[] | null;
  backgroundImage?: Image;
  backgroundImageAlt?: string;
  backgroundImageLqip?: string;
  backgroundImageDimensions?: SanityImageDimensions;
  previewImage?: Image;
  previewImageAlt?: string;
  previewImageLqip?: string;
  previewImageDimensions?: SanityImageDimensions;
  video?: string;
  videoMimeType?: string;
};

export type ProjectCaseStudyFallback = {
  outcomeSummary?: string;
  year?: number;
  role?: string;
  team?: string;
  timeline?: string;
  context?: string;
  challenge?: string;
  contribution?: string;
  technicalDecision?: string;
  outcome?: string;
  learning?: string;
};

/**
 * Existing Sanity entries predate the structured case-study fields. These
 * editorial fallbacks keep the strongest work useful now; any value entered in
 * Sanity takes precedence on the project page.
 */
export const PROJECT_CASE_STUDY_FALLBACKS: Record<
  string,
  ProjectCaseStudyFallback
> = {
  monad: {
    outcomeSummary:
      "A distributed workflow orchestration system with queued workers, durable state, and live execution updates.",
    year: 2026,
    role: "Full-stack developer",
    team: "Independent project",
    timeline: "2026",
    context: "Backend systems project",
    challenge:
      "Design a workflow runner where multi-step jobs could move reliably between services without losing their status, inputs, or outputs.",
    contribution:
      "I designed and built the product end to end: the authenticated dashboard, workflow authoring and run history, Go APIs and workers, and the service boundaries connecting them.",
    technicalDecision:
      "PostgreSQL stores durable workflow state, RabbitMQ distributes tasks, and separate Go workers execute steps asynchronously. Next.js surfaces live task status, inputs, and outputs.",
    outcome:
      "The resulting system supports reusable workflows, queued execution, persistent run history, authentication, and real-time progress updates.",
    learning:
      "Monad deepened my understanding of distributed state, asynchronous failure modes, and the value of clear contracts between independently running services.",
  },
  remdoc: {
    outcomeSummary:
      "A Go CLI for deploying and operating Docker containers on remote servers through the Portainer API.",
    year: 2026,
    role: "Developer",
    team: "Independent project",
    timeline: "2026",
    context: "Developer tooling",
    challenge:
      "Remote Docker operations often require direct server access or a heavier control plane. The goal was a focused workflow that could also fit team automation.",
    contribution:
      "I built the command-line application and its Portainer integration, shaping the commands around repeatable container deployment and operational tasks.",
    technicalDecision:
      "Go keeps the tool portable as a single executable, while the Portainer API provides a clear boundary for managing containers on remote hosts.",
    outcome:
      "Remdoc provides a lightweight, automation-friendly path for deploying and operating remote containers without introducing another control plane.",
    learning:
      "The project sharpened how I structure CLI commands, API integrations, configuration, and useful operational feedback.",
  },
  chaschallenge: {
    outcomeSummary:
      "A community platform that helps Järfälla residents discover and register for local activities.",
    year: 2025,
    role: "Full-stack developer",
    team: "11-person cross-functional team",
    timeline: "Mar — Jun 2025",
    context: "Chas Challenge · Järfälla Hus",
    challenge:
      "Järfälla Hus needed a more accessible way for a diverse group of residents to find information and register for activities at a new community hub.",
    contribution:
      "Working in an 11-person Scrum team across development, UX/UI, and DevOps, I implemented authentication and an admin interface for managing events and resident information.",
    technicalDecision:
      "The team used a TypeScript stack with Vite, Express, and MongoDB. My backend work focused on clear system boundaries and the functionality needed to manage community content.",
    outcome:
      "The project received an Honorable Mention from Chas Academy for its backend system design and functionality.",
    learning:
      "The project strengthened my ability to coordinate backend decisions with designers, DevOps engineers, and other developers in a larger delivery team.",
  },
  combat: {
    outcomeSummary:
      "A hackathon simulation for defending cities and bases against missile and drone attacks.",
    role: "Developer",
    team: "Hackathon team",
    context: "Hackathon · 2Hero and Saab",
    challenge:
      "At a 2Hero hackathon in collaboration with Saab, the task was to design a command system that could respond to simulated aerial attacks with limited defensive resources.",
    contribution:
      "I helped turn the scenario into an interactive simulation where a user sends waves of threats and the defensive system allocates aircraft, missiles, and drones in response.",
    technicalDecision:
      "The prototype combines AI-assisted risk assessment with response logic that weighs incoming threats against the defensive resources still available.",
    outcome:
      "The finished prototype demonstrates how a command system can evaluate incoming threats and coordinate a simulated defence under pressure.",
    learning:
      "The hackathon was useful practice in narrowing a complex scenario into a testable simulation and making technical trade-offs within a short deadline.",
  },
  webcrawler: {
    outcomeSummary:
      "A concurrent Go crawler that explores a user-provided domain and reports what it discovers.",
    role: "Developer",
    context: "Go concurrency experiment",
    challenge:
      "The goal was to crawl a user-provided domain concurrently, then return useful run information without turning the project into a general-purpose search engine.",
    contribution:
      "I built the crawler from idea to working command-line tool. It accepts a URL, processes multiple pages concurrently, and reports the duration, page count, and discovered pages.",
    technicalDecision:
      "Goroutines and channels coordinate concurrent page processing, keeping the implementation focused while providing practical experience with Go's concurrency model.",
    outcome:
      "The tool crawls a selected domain and returns the run duration, total page count, and a list of discovered pages.",
    learning:
      "The project gave me hands-on experience with Go, goroutines, channels, and the mechanics of following links across a domain.",
  },
  streamline: {
    outcomeSummary:
      "A focused B2B studio concept for presenting website and custom software services.",
    role: "Developer",
    context: "B2B studio project",
    challenge:
      "The project explored how a small software studio could explain its website and custom software services clearly to prospective business clients.",
    contribution:
      "I developed the studio concept and its web presence around a concise service offer and a direct path for a potential client to start a conversation.",
    technicalDecision:
      "The experience stays intentionally simple, prioritising the service proposition and contact path over unnecessary product complexity.",
    outcome:
      "Streamline became a compact B2B presence for presenting web and software services.",
    learning:
      "The project pushed me to think beyond implementation and frame technical work around the problem a client is trying to solve.",
  },
  elana: {
    outcomeSummary:
      "An e-commerce prototype exploring server rendering, separated business logic, and message-driven updates.",
    role: "Developer",
    context: "Architecture experiment",
    challenge:
      "The goal was to model a storefront that could grow beyond a single application, while keeping the prototype focused on architecture rather than real transactions.",
    contribution:
      "I built the storefront and separated the server-rendered interface from the Express service responsible for business logic.",
    technicalDecision:
      "Next.js handles the rendered storefront, Express owns business logic, and RabbitMQ carries updates between responsibilities instead of coupling them directly.",
    outcome:
      "The result is a non-production commerce prototype that demonstrates service separation and asynchronous updates.",
    learning:
      "Elana helped me understand how message-driven communication changes service boundaries, data flow, and the failure cases an application needs to consider.",
  },
  trainerclash: {
    outcomeSummary:
      "A full-stack Pokémon game with search, collections, and turn-based battles powered by PokéAPI data.",
    role: "Developer",
    context: "Full-stack learning project",
    challenge:
      "The product needed to turn external Pokémon data into a stateful experience where signed-in players could search statistics, manage a collection, and start battles.",
    contribution:
      "I built the authenticated dashboard, Pokémon search and collection flows, and the turn-based battle experience.",
    technicalDecision:
      "React and TypeScript power the interface, MongoDB stores application data, and PokéAPI supplies Pokémon types, abilities, and base statistics.",
    outcome:
      "Trainer Clash brings search, collection management, and randomly matched Pokémon battles into one full-stack application.",
    learning:
      "The project developed my understanding of integrating external API data with authenticated, persistent product state.",
  },
  lootboxkilla: {
    outcomeSummary:
      "An in-progress marketplace where players open loot boxes, keep rewards, and trade items.",
    role: "Developer",
    context: "Full-stack product experiment",
    challenge:
      "The core problem is connecting randomised rewards, player inventories, an in-game currency, and peer-to-peer trading in one understandable flow.",
    contribution:
      "I am building the product loop from opening a crate and receiving an item through to keeping or trading that item with another player.",
    technicalDecision:
      "Angular and TypeScript structure the client experience, while MongoDB supports the evolving inventory and marketplace data model.",
    outcome:
      "The current prototype establishes the core loot-box and trading concept while the wider product remains in development.",
    learning:
      "The project is teaching me how to model inventory ownership, random rewards, and multi-user trades as the product evolves.",
  },
};

export const DEFAULT_CASE_STUDY_SLUGS = [
  "monad",
  "remdoc",
  "chaschallenge",
] as const;

/** Stable fallback order for documents that do not yet have displayOrder. */
export const LEGACY_PROJECT_ORDER: Record<string, number> = {
  monad: 10,
  remdoc: 20,
  chaschallenge: 30,
  combat: 40,
  webcrawler: 50,
  streamline: 60,
  elana: 70,
  trainerclash: 80,
  lootboxkilla: 90,
};
