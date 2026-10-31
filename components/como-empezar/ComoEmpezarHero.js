import HeroSplit from "@/components/HeroSplit";
import { PROPOSAL_PHOTOS } from "@/data/visualProposal";

export default function ComoEmpezarHero({ hero, startHref, rulesHref }) {
  const photo = PROPOSAL_PHOTOS.startHero;

  return (
    <HeroSplit
      eyebrow="Cómo empezar"
      title={hero.title}
      description={hero.subtitle}
      imageSrc={hero.imageSrc || photo.src}
      imageAlt={hero.imageAlt || photo.alt}
      objectPosition={photo.objectPosition}
      primaryCTA={{ href: startHref, label: hero.primaryCtaLabel }}
      secondaryCTA={{ href: rulesHref, label: hero.secondaryCtaLabel }}
    />
  );
}
