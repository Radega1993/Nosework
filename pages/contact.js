import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSplit from "@/components/HeroSplit";
import { PROPOSAL_PHOTOS } from "@/data/visualProposal";
import { PARTNER_CLUBS } from "@/data/partnerClubs";
import { useEffect, useMemo, useState } from "react";

export default function Contact() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", message: "", clubSlug: "" });
  const [status, setStatus] = useState("");
  const side = PROPOSAL_PHOTOS.contactSide;
  const hero = PROPOSAL_PHOTOS.contactHero;

  const clubSlug = typeof router.query.club === "string" ? router.query.club : "";
  const selectedClub = useMemo(
    () => PARTNER_CLUBS.find((c) => c.slug === clubSlug) || null,
    [clubSlug]
  );

  useEffect(() => {
    if (!clubSlug) return;
    setForm((prev) => ({
      ...prev,
      clubSlug,
      message: prev.message?.trim()
        ? prev.message
        : `Hola, me pongo en contacto en relación con el club ${selectedClub?.name || clubSlug}.\n\n`,
    }));
  }, [clubSlug, selectedClub?.name]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Enviando...");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        message: selectedClub
          ? `[Club: ${selectedClub.name} / ${selectedClub.slug}]\n${form.message}`
          : form.message,
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("submit-error");
      setStatus("Mensaje enviado correctamente.");
      setForm({ name: "", email: "", message: "", clubSlug: clubSlug || "" });
    } catch {
      setStatus("No se pudo enviar el mensaje. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SEOHead
        title={
          selectedClub
            ? `Contacto – ${selectedClub.name} | Nosework Trial`
            : "Contacto Nosework Trial – Preguntas y Consultas"
        }
        description="Contacta con Nosework Trial. Formulario de contacto, email y redes sociales."
        canonical="/contact"
        ogImage={selectedClub?.logoSrc || hero.src}
        additionalMeta={{
          keywords:
            "contacto nosework trial, email nosework, consultas nosework, información nosework",
        }}
      />

      <Navbar />

      <HeroSplit
        compact
        eyebrow="Contacto"
        title={selectedClub ? `Contactar con ${selectedClub.name}` : "Ponte en contacto"}
        description={
          selectedClub
            ? "Tu mensaje se enviará a la comunidad indicando el club seleccionado."
            : "Escríbenos con tus dudas sobre la comunidad, clubes o cómo empezar."
        }
        imageSrc={hero.src}
        imageAlt={hero.alt}
        objectPosition={hero.objectPosition}
      />

      <main>
        <div className="container-redesign py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            <section className="proposal-card p-8 md:p-10">
              {selectedClub ? (
                <div className="mb-6 flex items-center gap-4 rounded-xl border border-outline-variant bg-mint/60 p-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white border border-outline-variant">
                    <Image
                      src={selectedClub.logoSrc}
                      alt={`Logo ${selectedClub.name}`}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">Club seleccionado</p>
                    <h2 className="font-montserrat text-xl font-semibold text-primary truncate">{selectedClub.name}</h2>
                    <p className="text-sm text-on-surface-variant">
                      {[selectedClub.city, selectedClub.province].filter(Boolean).join(", ") ||
                        "Ubicación por confirmar"}
                    </p>
                  </div>
                </div>
              ) : (
                <h2 className="font-display text-3xl font-medium tracking-tight text-navy mb-6">Formulario</h2>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#697f70]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    className="input bg-[#f9fbf7] border-[#dce5dc]"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#697f70]">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                    className="input bg-[#f9fbf7] border-[#dce5dc]"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#697f70]">
                    Mensaje
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                    className="textarea bg-[#f9fbf7] border-[#dce5dc]"
                    rows="5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-[11px] bg-primary px-4 py-3.5 text-sm font-bold text-white hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  Enviar
                </button>
                {status ? <p className="text-sm text-on-surface-variant">{status}</p> : null}
              </form>
              <div className="mt-8 border-t border-outline-variant pt-6 text-sm text-on-surface-variant space-y-2">
                <p>
                  <strong className="text-navy">Email:</strong> contacto@noseworktrialcommunity.com
                </p>
                <p className="flex gap-3">
                  <a href="https://facebook.com/nosework" className="font-semibold text-primary hover:text-gold">
                    Facebook
                  </a>
                  <a href="https://instagram.com/nosework" className="font-semibold text-primary hover:text-gold">
                    Instagram
                  </a>
                </p>
              </div>
            </section>
            <div className="relative min-h-[420px] overflow-hidden rounded-[18px] bg-mint">
              {selectedClub ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-mint p-8">
                  <div className="relative h-48 w-48 overflow-hidden rounded-2xl bg-white border border-outline-variant shadow-soft">
                    <Image
                      src={selectedClub.logoSrc}
                      alt={`Logo ${selectedClub.name}`}
                      fill
                      className="object-contain p-4"
                      sizes="192px"
                      priority
                    />
                  </div>
                  <p className="text-center font-montserrat text-lg font-semibold text-primary">{selectedClub.name}</p>
                  {selectedClub.website ? (
                    <a
                      href={selectedClub.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-primary hover:underline"
                    >
                      {/instagram/i.test(selectedClub.website) ? "Abrir Instagram" : "Abrir web del club"}
                    </a>
                  ) : null}
                </div>
              ) : (
                <Image
                  src={side.src}
                  alt={side.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: side.objectPosition }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
