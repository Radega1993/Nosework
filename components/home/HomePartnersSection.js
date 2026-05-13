import Link from "next/link";
import Section from "@/components/Section";

export default function HomePartnersSection({
  localizedHref,
  contactHref = "/contact",
  title = "Patrocinadores y partners",
  body = "Próximamente anunciaremos nuestros patrocinadores y partners oficiales.",
  sponsorPrompt = "¿Interesado en patrocinar?",
  contactLabel = "Contáctanos",
}) {
  return (
    <Section background="white" padding="lg" className="border-t border-outline-variant">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="font-montserrat text-2xl font-bold text-primary mb-4">{title}</h2>
        <p className="text-on-surface-variant mb-4">{body}</p>
        <p className="text-on-surface-variant">
          {sponsorPrompt}{" "}
          <Link
            href={localizedHref(contactHref)}
            className="font-semibold text-secondary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
          >
            {contactLabel}
          </Link>
        </p>
      </div>
    </Section>
  );
}
