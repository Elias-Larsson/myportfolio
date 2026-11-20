const fallbackSiteUrl = "https://myportfolio-gilt-seven.vercel.app";

const deploymentUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;
const configuredSiteUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();
const localConfiguredUrl = configuredSiteUrl?.match(
  /^https?:\/\/(?:localhost|127(?:\.\d{1,3}){3})(?::\d+)?(?:\/|$)/i,
);
const resolvedConfiguredUrl =
  process.env.NODE_ENV === "production" && localConfiguredUrl
    ? undefined
    : configuredSiteUrl;

export const siteUrl = new URL(
  resolvedConfiguredUrl || deploymentUrl || fallbackSiteUrl,
);

export const siteName = "Elias Larsson — Full-stack Developer";

export const contactHref = "mailto:elias@eliaslarsson.dev";

export const siteDescription =
  "Portfolio of Elias Larsson, a full-stack developer in Stockholm building web products, backend systems, and infrastructure.";

export const absoluteUrl = (pathname: string) =>
  new URL(pathname, siteUrl).toString();
