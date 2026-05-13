import Image from "next/image";
import Link from "next/link";

const SPAN = {
  whiteWide: "md:col-span-2",
  primaryCard: "md:col-span-1",
  whiteBorder: "md:col-span-1",
  imageBanner: "md:col-span-2",
};

function BentoWhiteWide({ block }) {
  return (
    <article
      className={`col-span-1 ${SPAN.whiteWide} bg-white p-6 md:p-8 rounded-xl shadow-lg border-l-8 border-secondary-fixed`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-montserrat text-xl md:text-2xl font-semibold text-primary">{block.title}</h3>
          <p className="text-on-surface-variant mt-1">{block.subtitle}</p>
        </div>
        <span className="self-start shrink-0 bg-secondary-container text-on-secondary-container px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide">
          {block.badge}
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {block.columns.map((col) => (
          <div key={col.heading}>
            <h4 className="font-bold text-primary mb-2">{col.heading}</h4>
            {col.body ? <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">{col.body}</p> : null}
            {col.list ? (
              <ul className="list-disc list-inside text-sm md:text-base text-on-surface-variant space-y-1">
                {col.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
      {block.footer ? (
        <div className="mt-8 pt-4 border-t border-surface-container-high">
          <p className="text-xs font-bold uppercase tracking-wide text-on-primary-container leading-relaxed">{block.footer}</p>
        </div>
      ) : null}
    </article>
  );
}

function BentoPrimaryCard({ block, reglamentoHref }) {
  return (
    <article className={`col-span-1 ${SPAN.primaryCard} bg-primary text-white p-6 md:p-8 rounded-xl shadow-lg flex flex-col justify-between min-h-[280px]`}>
      <div>
        <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-3 block" aria-hidden>
          {block.icon}
        </span>
        <h3 className="font-montserrat text-xl md:text-2xl font-semibold mb-2">{block.title}</h3>
        <p className="text-on-primary-container text-sm md:text-base leading-relaxed">{block.body}</p>
      </div>
      <Link
        href={reglamentoHref}
        className="mt-6 w-full inline-flex justify-center items-center py-2.5 rounded-lg bg-secondary-fixed text-[#161e00] font-bold hover:opacity-95 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
      >
        {block.ctaLabel}
      </Link>
    </article>
  );
}

function BentoWhiteBorder({ block }) {
  return (
    <article className={`col-span-1 ${SPAN.whiteBorder} bg-white p-6 md:p-8 rounded-xl shadow-lg border-l-8 border-primary`}>
      <h3 className="font-montserrat text-lg md:text-xl font-semibold text-primary mb-2">{block.title}</h3>
      <p className="text-sm md:text-base text-on-surface-variant mb-4 leading-relaxed">{block.body}</p>
      <div className="space-y-2">
        {block.checklist.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl shrink-0" aria-hidden>
              done_all
            </span>
            <span className="text-sm md:text-base text-on-surface-variant">{item}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

function BentoImageBanner({ block }) {
  return (
    <article className={`col-span-1 ${SPAN.imageBanner} relative h-64 md:h-72 rounded-xl overflow-hidden group shadow-lg`}>
      <Image
        src={block.imageSrc}
        alt={block.imageAlt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 66vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent flex flex-col justify-end p-6 md:p-8">
        <h3 className="text-white font-montserrat text-xl md:text-2xl font-semibold">{block.title}</h3>
        <p className="text-surface-variant max-w-lg text-sm md:text-base mt-2 leading-relaxed">{block.body}</p>
      </div>
    </article>
  );
}

/**
 * @param {object[]} blocks — ver `NIVELES_BENTO_BLOCKS` en data/nivelesTitulosPage.js
 */
export default function NivelesBentoGrid({ blocks, reglamentoHref }) {
  return (
    <section className="py-12 md:py-16 max-w-container-max mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {blocks.map((block) => {
        if (block.variant === "whiteWide") {
          return <BentoWhiteWide key={block.id} block={block} />;
        }
        if (block.variant === "primaryCard") {
          return <BentoPrimaryCard key={block.id} block={block} reglamentoHref={reglamentoHref} />;
        }
        if (block.variant === "whiteBorder") {
          return <BentoWhiteBorder key={block.id} block={block} />;
        }
        if (block.variant === "imageBanner") {
          return <BentoImageBanner key={block.id} block={block} />;
        }
        return null;
      })}
    </section>
  );
}
