export const productionOrigin = "https://www.eliaslarsson.dev";

export const siteUrl = new URL(
  (process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_BASE_URL?.trim()) ||
    productionOrigin,
);

export const personName = "Elias Larsson";
export const siteName = `${personName} — Full-stack Developer`;

export const socialProfiles = {
  github: "https://github.com/Elias-Larsson",
  linkedin: "https://www.linkedin.com/in/elias-h-larsson",
};

export const contactHref = "mailto:elias@eliaslarsson.dev";

export const siteDescription =
  "Portfolio of Elias Larsson, a full-stack developer in Stockholm building web products, backend systems, and infrastructure.";

export const absoluteUrl = (pathname: string) =>
  new URL(pathname, siteUrl).toString();
