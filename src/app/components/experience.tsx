import Image from "next/image";
import { getExperienceCases } from "@/sanity/lib/experience";
import { urlFor } from "@/sanity/lib/image";
import { getProfessionalProfile } from "@/sanity/lib/professional-profile";
import type { EducationEntry } from "@/sanity/types/professionalProfile";
import { ExperienceCard } from "./experience-card";

const lightMark = "brightness-0 invert";

const localLogos: Partial<Record<string, { src: string; treatment?: string }>> =
  {
    sprinto: { src: "/logos/sprinto.png", treatment: lightMark },
    "jarfalla-hus": {
      src: "/logos/jarfalla.png",
      treatment: "invert hue-rotate-180 mix-blend-screen",
    },
    samples: { src: "/logos/samples.png", treatment: lightMark },
    streamline: { src: "/logos/streamline.png" },
    reky: {
      src: "/logos/reky.png",
      treatment: "contrast-125 mix-blend-screen",
    },
    "paws-n-pantry": { src: "/logos/pawsnpantry.png" },
  };

export const Experience = async () => {
  const cases = await getExperienceCases();

  return (
    <section
      aria-labelledby="experience-heading"
      className="relative z-10 scroll-mt-8 bg-tertiary px-4 pb-12 pt-20 md:pb-16 md:pt-24"
      id="experience"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="experience-heading"
          className="text-[clamp(2rem,7vw,4.5rem)] leading-[0.94]"
        >
          Work <span className="text-secondary">Experience</span>
        </h2>

        <ul className="mt-8 grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3 md:mt-12">
          {cases.map((item) => {
            const localLogo = localLogos[item.slug];
            const logo = item.logo
              ? urlFor(item.logo).width(900).fit("max").auto("format").url()
              : localLogo?.src;

            return (
              <ExperienceCard
                company={item.company}
                href={`/experience/${item.slug}`}
                key={item._key}
              >
                {logo && (
                  <Image
                    alt=""
                    className={`object-contain ${item.logo ? "" : (localLogo?.treatment ?? "")}`}
                    fill
                    sizes="(min-width: 640px) 144px, 33vw"
                    src={logo}
                  />
                )}
              </ExperienceCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

const monthLabels: Record<string, string> = {
  jan: "Jan",
  feb: "Feb",
  mar: "Mar",
  apr: "Apr",
  may: "May",
  maj: "May",
  jun: "Jun",
  jul: "Jul",
  aug: "Aug",
  sep: "Sep",
  sept: "Sep",
  oct: "Oct",
  nov: "Nov",
  dec: "Dec",
};

const monthIndexes: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  maj: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  sept: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const formatPeriod = (period?: string) =>
  period
    ?.trim()
    .replace(
      /\b(jan|feb|mar|apr|may|maj|jun|jul|aug|sep|sept|oct|nov|dec)\b/gi,
      (month) => monthLabels[month.toLowerCase()],
    )
    .replace(/\bcurrent\b/gi, "Present")
    .replace(/\s+(?:-|–|—)\s+/g, " — ");

const getPeriodStartValue = (period?: string) => {
  const startMatch = period?.match(
    /\b(jan|feb|mar|apr|may|maj|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{4})\b/i,
  );
  const startMonth = startMatch
    ? monthIndexes[startMatch[1].toLowerCase()]
    : null;

  return startMatch && typeof startMonth === "number"
    ? Number(startMatch[2]) * 12 + startMonth
    : null;
};

const getEducationMeta = (item: EducationEntry) => {
  const startValue = getPeriodStartValue(item.period);
  const now = new Date();
  const currentValue = now.getUTCFullYear() * 12 + now.getUTCMonth();
  const isIncoming =
    item.status === "Incoming" ||
    (item.status === "Current" &&
      startValue !== null &&
      startValue > currentValue);

  if (isIncoming && item.period) {
    const start = item.period.split(/\s+(?:-|–|—)\s+/)[0];

    return {
      period: `Starts ${formatPeriod(start)}`,
      status: "Incoming",
    };
  }

  return {
    period: formatPeriod(item.period),
    status: item.status === "Previous studies" ? "Completed" : item.status,
  };
};

export const Education = async () => {
  const profile = await getProfessionalProfile();
  const education = (profile?.education ?? []).slice(0, 2);

  if (!education.length) return null;

  return (
    <section
      aria-labelledby="education-heading"
      className="relative z-10 bg-tertiary px-4 pb-32 pt-12 md:pb-40 md:pt-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
        <header className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl md:text-4xl" id="education-heading">
            Education
          </h2>
          <span
            aria-hidden="true"
            className="mt-5 block h-px w-12 bg-secondary/60"
          />
        </header>

        <ol className="border-y border-white/10">
          {education.map((item, index) => {
            const { period, status } = getEducationMeta(item);

            return (
              <li
                className="experience-reveal border-b border-white/10 py-10 last:border-b-0 md:py-12"
                key={item._key}
              >
                <article className="grid gap-5 sm:grid-cols-[2.75rem_minmax(0,1fr)_auto] sm:gap-6">
                  <p className="text-xs tracking-[0.18em] text-primary/70">
                    [{String(index + 1).padStart(2, "0")}]
                  </p>
                  <div>
                    {status && (
                      <p
                        className={`text-xs uppercase tracking-[0.18em] ${
                          status === "Completed"
                            ? "text-primary/65"
                            : "text-primary/75"
                        }`}
                      >
                        {status}
                      </p>
                    )}
                    <h3 className="mt-3 text-2xl leading-tight md:text-3xl">
                      {item.school}
                    </h3>
                    {item.programme && (
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-primary/68 md:text-base">
                        {item.programme}
                      </p>
                    )}
                  </div>
                  {period && (
                    <time className="text-xs uppercase tracking-[0.14em] text-primary/65 sm:text-right">
                      {period}
                    </time>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
