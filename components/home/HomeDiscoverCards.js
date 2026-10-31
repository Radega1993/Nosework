import Image from "next/image";
import Link from "next/link";
import { PROPOSAL_PHOTOS } from "@/data/visualProposal";

const CARDS = [
  {
    key: "discover",
    tag: "01 · Disciplina",
    title: "Descubre Nosework",
    body: "Conoce cómo funciona esta disciplina y por qué engancha a tantos binomios.",
    href: "/que-es-nosework-trial",
    photo: PROPOSAL_PHOTOS.homeDiscover,
  },
  {
    key: "start",
    tag: "02 · Aprendizaje",
    title: "Empieza con tu perro",
    body: "Aprende las primeras búsquedas y cómo acompañar a tu compañero.",
    href: "/como-empezar",
    photo: PROPOSAL_PHOTOS.homeStart,
  },
  {
    key: "community",
    tag: "03 · Comunidad",
    title: "Forma parte de la comunidad",
    body: "Una red de guías, entrenadores y clubes unidos por el olfato.",
    href: "/clubs",
    photo: PROPOSAL_PHOTOS.homeCommunity,
  },
];

export default function HomeDiscoverCards({ localizedHref }) {
  return (
    <section className="pb-6 pt-10 md:pt-14" aria-labelledby="home-discover-heading">
      <div className="container-redesign">
        <h2 id="home-discover-heading" className="font-display text-[2rem] font-medium tracking-tight text-navy md:text-[2.375rem]">
          Descubre un deporte diferente
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-on-surface-variant">
          Instinto, aprendizaje y complicidad en cada búsqueda.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map((card) => (
            <Link
              key={card.key}
              href={localizedHref(card.href)}
              className="proposal-card group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              <div className="relative h-[210px] overflow-hidden bg-mint">
                <Image
                  src={card.photo.src}
                  alt={card.photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: card.photo.objectPosition }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-secondary">{card.tag}</span>
                <h3 className="mt-2 font-montserrat text-xl font-semibold tracking-tight text-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{card.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
