import type { ProfessionalProfile } from "@/sanity/types/professionalProfile";

type Props = {
  profile: ProfessionalProfile | null;
};

export const Experience = ({ profile }: Props) => {
  if (!profile) return null;

  return (
    <section
      aria-labelledby="experience-heading"
      className="relative z-10 flex flex-col items-center gap-12 bg-tertiary px-4 py-48"
    >
      <div className="flex w-full max-w-6xl flex-col gap-12">
        <header className="mx-auto max-w-2xl text-center">
          <h1 id="experience-heading" className="text-[10.5dvw] sm:text-6xl md:text-7xl">
            {profile.heading} <span className="text-secondary">{profile.headingAccent}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-primary/75">
            {profile.description}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.85fr)]">
          <div className="flex h-full flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary lg:pl-1">
              Experience
            </p>
            {profile.experiences?.map((item, index) => (
              <article
                key={item.company}
                className="rounded-sm border border-white/10 bg-midnight p-6 md:p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-secondary">[{String(index + 1).padStart(2, "0")}]</p>
                    <h2 className="mt-2 text-2xl md:text-3xl">{item.role}</h2>
                    <p className="mt-1 text-lg text-primary/75">{item.company}</p>
                  </div>
                  <p className="text-sm text-primary/60">{item.period}</p>
                </div>
                {item.summary && <p className="mt-8 max-w-2xl">{item.summary}</p>}
                {item.detail && (
                  <p className="mt-3 border-l-2 border-secondary pl-4 text-sm text-primary/65">
                    {item.detail}
                  </p>
                )}
              </article>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">
              Education
            </p>
            <aside className="flex-1 rounded-sm border border-white/10 bg-midnight p-6 md:p-8">
              <div className="flex flex-col divide-y divide-white/10">
                {profile.education?.map((item) => (
                  <article key={item.school} className="py-6 first:pt-0 last:pb-0">
                    {item.status && <p className="text-sm text-secondary">{item.status}</p>}
                    <h2 className="mt-2 text-xl">{item.school}</h2>
                    {item.programme && <p className="mt-2 text-primary/75">{item.programme}</p>}
                    {item.period && <p className="mt-3 text-sm text-primary/60">{item.period}</p>}
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
