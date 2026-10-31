import HeroSplit from "@/components/HeroSplit";
import { PROPOSAL_PHOTOS } from "@/data/visualProposal";

export default function NormativasHero({ hero }) {
  const photo = PROPOSAL_PHOTOS.normasHero;

  return (
    <HeroSplit
      compact
      eyebrow="Normativas"
      title={hero.title}
      description={hero.subtitle}
      imageSrc={photo.src}
      imageAlt={photo.alt}
      objectPosition={photo.objectPosition}
    />
  );
}
