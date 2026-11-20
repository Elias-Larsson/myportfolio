type SectionSkeletonProps = {
  label: string;
};

export const SectionSkeleton = ({ label }: SectionSkeletonProps) => (
  <section
    aria-busy="true"
    aria-label={`Loading ${label}`}
    className="bg-tertiary px-4 py-32"
  >
    <div className="mx-auto w-full max-w-6xl animate-pulse motion-reduce:animate-none">
      <div className="mx-auto h-12 w-2/3 max-w-xl bg-primary/10" />
      <div className="mx-auto mt-6 h-4 w-1/2 max-w-md bg-primary/10" />
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="h-64 bg-primary/5" />
        <div className="h-64 bg-primary/5" />
      </div>
    </div>
  </section>
);
