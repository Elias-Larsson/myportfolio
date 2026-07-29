import { client } from "@/sanity/lib/client";
import { professionalProfileQuery } from "@/sanity/lib/queries";
import type {
  EducationEntry,
  ExperienceEntry,
  ProfessionalProfile,
} from "@/sanity/types/professionalProfile";

const revalidate = 60;

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

const getAchievements = (item: ExperienceEntry) => {
  const achievements = item.achievements
    ?.map((achievement) => achievement.trim())
    .filter(Boolean);

  if (achievements?.length) return achievements;

  return (
    item.summary
      ?.split(/\n\s*\n/)
      .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
      .filter(Boolean) ?? []
  );
};

const getEducationMeta = (item: EducationEntry) => {
  const startMatch = item.period?.match(
    /\b(jan|feb|mar|apr|may|maj|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{4})\b/i,
  );
  const startMonth = startMatch
    ? monthIndexes[startMatch[1].toLowerCase()]
    : null;
  const now = new Date();
  const startValue =
    startMatch && typeof startMonth === "number"
      ? Number(startMatch[2]) * 12 + startMonth
      : null;
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
    status: item.status,
  };
};

export const Experience = async () => {
  const profile = await client.fetch<ProfessionalProfile | null>(
    professionalProfileQuery,
    {},
    {
      next: { revalidate },
    },
  );

  if (!profile) return null;

  return (
    <section
      aria-labelledby="experience-heading"
      className="relative z-10 bg-tertiary px-4 py-32 md:py-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="experience-reveal mx-auto max-w-3xl text-center">
          <h2
            id="experience-heading"
            className="text-[10.5dvw] leading-[0.98] sm:text-6xl md:text-7xl"
          >
            {profile.heading}{" "}
            <span className="text-secondary">{profile.headingAccent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-primary/70 md:text-lg md:leading-8">
            {profile.description}
          </p>
        </header>

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-36">
          {profile.experiences?.length > 0 && (
            <div className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
              <header className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs uppercase tracking-[0.22em] text-secondary">
                  [01]
                </p>
                <h3
                  className="mt-4 text-3xl md:text-4xl"
                  id="experience-list-heading"
                >
                  Experience
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-5 block h-px w-12 bg-secondary/60"
                />
              </header>

              <ol
                aria-labelledby="experience-list-heading"
                className="relative border-y border-white/10 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-secondary/35"
              >
                {profile.experiences.map((item, index) => {
                  const achievements = getAchievements(item);
                  const technologies = item.technologies
                    ?.map((technology) => technology.trim())
                    .filter(Boolean);

                  return (
                    <li
                      className="experience-reveal relative border-b border-white/10 py-12 pl-9 last:border-b-0 md:py-16 md:pl-12"
                      key={item._key}
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -left-[0.3125rem] top-[3.15rem] size-[0.6875rem] rounded-full bg-secondary ring-4 ring-tertiary md:top-[4.15rem]"
                      />
                      <article>
                        <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em]">
                          <span className="text-secondary">
                            [{String(index + 1).padStart(2, "0")}]
                          </span>
                          {item.period && (
                            <time className="text-right text-primary/45">
                              {formatPeriod(item.period)}
                            </time>
                          )}
                        </div>

                        <div className="mt-7 grid gap-8 md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1fr)] md:gap-10">
                          <div>
                            <h4 className="text-3xl leading-tight md:text-4xl">
                              {item.role.trim()}
                            </h4>
                            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-secondary">
                              {item.company}
                            </p>
                          </div>

                          <div>
                            {achievements.length > 0 && (
                              <ul className="space-y-4">
                                {achievements.map((achievement, achievementIndex) => (
                                  <li
                                    className="flex gap-3 text-sm leading-7 text-primary/72 md:text-base"
                                    key={`${achievement}-${achievementIndex}`}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-[0.8rem] h-px w-4 shrink-0 bg-secondary/70"
                                    />
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {(technologies?.length || item.detail) && (
                              <div className="mt-8 border-t border-white/10 pt-5">
                                <p className="text-[0.68rem] uppercase tracking-[0.2em] text-primary/40">
                                  {technologies?.length ? "Stack" : "Project focus"}
                                </p>
                                {technologies?.length ? (
                                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs uppercase tracking-[0.14em] text-primary/65">
                                    {technologies.map((technology, techIndex) => (
                                      <li
                                        className="flex items-center gap-3"
                                        key={`${technology}-${techIndex}`}
                                      >
                                        {techIndex > 0 && (
                                          <span
                                            aria-hidden="true"
                                            className="text-secondary/50"
                                          >
                                            /
                                          </span>
                                        )}
                                        {technology}
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <p className="mt-3 text-sm leading-6 text-primary/65">
                                    {item.detail}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {profile.education?.length > 0 && (
            <div className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
              <header className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs uppercase tracking-[0.22em] text-secondary">
                  [02]
                </p>
                <h3
                  className="mt-4 text-3xl md:text-4xl"
                  id="education-list-heading"
                >
                  Education
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-5 block h-px w-12 bg-secondary/60"
                />
              </header>

              <ol
                aria-labelledby="education-list-heading"
                className="border-y border-white/10"
              >
                {profile.education.map((item, index) => {
                  const { period, status } = getEducationMeta(item);

                  return (
                    <li
                      className="experience-reveal border-b border-white/10 py-10 last:border-b-0 md:py-12"
                      key={item._key}
                    >
                      <article className="grid gap-5 sm:grid-cols-[2.75rem_minmax(0,1fr)_auto] sm:gap-6">
                        <p className="text-xs tracking-[0.18em] text-secondary">
                          [{String(index + 1).padStart(2, "0")}]
                        </p>
                        <div>
                          {status && (
                            <p
                              className={`text-xs uppercase tracking-[0.18em] ${
                                status === "Previous studies"
                                  ? "text-primary/40"
                                  : "text-secondary"
                              }`}
                            >
                              {status}
                            </p>
                          )}
                          <h4 className="mt-3 text-2xl leading-tight md:text-3xl">
                            {item.school}
                          </h4>
                          {item.programme && (
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-primary/68 md:text-base">
                              {item.programme}
                            </p>
                          )}
                        </div>
                        {period && (
                          <time className="text-xs uppercase tracking-[0.14em] text-primary/45 sm:text-right">
                            {period}
                          </time>
                        )}
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
