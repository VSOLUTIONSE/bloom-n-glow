import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { treatments, images } from "@/lib/data";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const t = treatments.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return { treatment: t };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.treatment.name} - Exquisite Medspa` },
          { name: "description", content: loaderData.treatment.tagline },
          { property: "og:title", content: `${loaderData.treatment.name} - Exquisite Medspa` },
          { property: "og:description", content: loaderData.treatment.tagline },
          { property: "og:image", content: loaderData.treatment.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="eyebrow text-muted-foreground">404</p>
        <h1 className="serif-italic text-4xl mt-3">Treatment not found</h1>
        <Link to="/treatments" className="mt-6 inline-block underline">View all treatments</Link>
      </div>
    </div>
  ),
  component: TreatmentDetail,
});

function TreatmentDetail() {
  const { treatment: t } = Route.useLoaderData();
  const idx = treatments.findIndex((x) => x.slug === t.slug);
  const next = treatments[(idx + 1) % treatments.length];

  return (
    <article className="bg-bone text-ink">
      <header className="px-6 md:px-10 pt-12 md:pt-16 pb-8">
        <Link to="/treatments" className="eyebrow text-muted-foreground hover:text-ink inline-flex items-center gap-2">
          ← All treatments
        </Link>
        <div className="grid grid-cols-12 gap-8 mt-10 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="serif-italic text-blush">No. {t.number}</p>
            <h1 className="mt-3 text-5xl md:text-7xl leading-[0.95] text-cobalt">
              {t.name}
            </h1>
            <p className="mt-5 serif-italic text-xl md:text-2xl text-muted-foreground max-w-xl">
              {t.tagline}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-3 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="eyebrow text-muted-foreground">Duration</p>
              <p className="mt-2">{t.duration}</p>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Investment</p>
              <p className="mt-2">{t.from}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 md:px-10">
        <img
          src={t.image}
          alt={t.name}
          width={1280}
          height={960}
          className="w-full h-[55vh] md:h-[75vh] object-cover rounded-sm"
        />
      </div>

      <section className="px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-muted-foreground">The intent</p>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-6">
            <p className="serif-italic text-3xl md:text-4xl leading-[1.15]">{t.intro}</p>
            <p className="text-base leading-relaxed text-muted-foreground">{t.what}</p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24 border-t border-hairline">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-muted-foreground">Results</p>
            <h2 className="serif-italic mt-3 text-4xl text-forest">What to expect</h2>
          </div>
          <ul className="col-span-12 md:col-span-7 divide-y divide-hairline">
            {t.results.map((r: string, i: number) => (
              <li key={i} className="py-5 flex items-start gap-5">
                <span className="serif-italic text-blush text-sm w-8">0{i + 1}</span>
                <span className="text-base md:text-lg leading-snug">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24 border-t border-hairline">
        <div className="grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 md:col-span-4">
            <p className="eyebrow text-muted-foreground">Aftercare</p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <p className="text-lg md:text-xl leading-relaxed">{t.aftercare}</p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <img
              src={images.treatmentSkin}
              alt="Aftercare ritual"
              width={640}
              height={480}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 md:py-28 bg-blush text-ink">
        <div className="max-w-3xl">
          <p className="eyebrow">Begin</p>
          <h2 className="mt-4 text-5xl md:text-7xl leading-[0.95]">
            Book your<br /><span className="serif-italic">consultation</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed">
            A sixty-minute mapping, a written plan, no pressure to book.
          </p>
          <div className="mt-8">
            <MagneticButton to="/booking" variant="ink">Begin</MagneticButton>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 border-t border-hairline">
        <Link
          to="/treatments/$slug"
          params={{ slug: next.slug }}
          className="group grid grid-cols-12 items-center gap-6"
        >
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-muted-foreground">Next</p>
          </div>
          <div className="col-span-12 md:col-span-9 flex items-center justify-between">
            <h3 className="text-3xl md:text-5xl serif-italic">{next.name}</h3>
            <span className="serif-italic text-3xl group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">↗</span>
          </div>
        </Link>
      </section>
    </article>
  );
}
