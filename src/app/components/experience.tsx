import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import {
  getExperienceCases,
  getProfessionalProfile,
} from "@/sanity/lib/professional-profile";

const darkWordmarks = new Set(["sprinto", "samples"]);

export const Experience = async () => {
  const cases = await getExperienceCases();

  if (!cases.length) return null;

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
            const company = item.company
              .trim()
              .toLowerCase()
              .replace(/\.$/, "");

            return (
              <li key={item._key}>
                <Link
                  aria-label={item.company}
                  className="relative grid h-24 place-items-center border-b border-r border-white/10 bg-midnight text-primary transition-colors hover:z-10 hover:bg-tertiary hover:ring-1 hover:ring-secondary/60 hover:ring-inset focus-visible:z-10 focus-visible:bg-tertiary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary motion-reduce:transition-none md:h-32"
                  href={`/experience/${item.slug}`}
                >
                  {item.logo ? (
                    <span className="relative block h-11 w-2/3 max-w-36 md:h-14">
                      <Image
                        alt=""
                        className={
                          darkWordmarks.has(company)
                            ? "object-contain invert"
                            : "object-contain"
                        }
                        fill
                        sizes="(min-width: 640px) 144px, 33vw"
                        src={urlFor(item.logo)
                          .width(320)
                          .fit("max")
                          .auto("format")
                          .url()}
                      />
                    </span>
                  ) : (
                    <span className="wrap-anywhere px-3 text-center font-[family-name:var(--font-heading)] text-sm leading-tight sm:text-base">
                      {item.company}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export const Education = async () => {
  const profile = await getProfessionalProfile();
  const education = profile?.education ?? [];

  if (!education.length) return null;

  return (
    <section
      aria-labelledby="education-heading"
      className="relative z-10 bg-tertiary px-4 pb-24 pt-12 md:pb-32 md:pt-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2
          className="text-[clamp(2rem,7vw,4.5rem)] leading-[0.94]"
          id="education-heading"
        >
          Education
        </h2>

        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10 md:mt-12">
          {education.map((item) => (
            <li
              className="grid gap-4 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8 md:py-8"
              key={item._key}
            >
              <div className="min-w-0">
                <h3 className="text-xl leading-tight sm:text-2xl md:text-3xl">
                  {item.school}
                </h3>
                {item.programme && (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-primary/75 md:text-base">
                    {item.programme}
                  </p>
                )}
              </div>
              {(item.period || item.status) && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 self-center text-sm sm:flex-col sm:items-end sm:text-right">
                  {item.period && (
                    <p className="text-primary/75">{item.period}</p>
                  )}
                  {item.status && (
                    <p className="text-xs text-secondary-readable">
                      {item.status}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
