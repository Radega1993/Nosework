import Image from "next/image";

/**
 * Bloque estilo certificado (ejemplo ilustrativo).
 */
export default function NivelesCertificadoPreview({ cert }) {
  return (
    <section className="py-12 md:py-20 max-w-container-max mx-auto px-6">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="font-montserrat text-2xl md:text-3xl font-semibold text-primary">{cert.sectionTitle}</h2>
        <p className="text-lg text-on-surface-variant mt-3 max-w-2xl mx-auto leading-relaxed">{cert.sectionSubtitle}</p>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-2xl border-[12px] md:border-[16px] border-surface-container relative">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-center" aria-hidden>
          <span className="material-symbols-outlined text-[200px] md:text-[280px] text-primary">verified_user</span>
        </div>
        <div className="relative z-10 border-2 border-primary/20 p-5 md:p-8 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-10">
            <div className="flex items-center gap-3">
              <Image
                src="/logonosework/nosework-trial-community-long-black-transp.png"
                alt="Nosework Trial Community"
                width={200}
                height={44}
                className="h-8 w-auto max-w-[200px]"
              />
            </div>
            <div className="text-left sm:text-right w-full sm:w-auto">
              <h4 className="font-montserrat text-primary text-lg md:text-xl font-bold">Certificado oficial</h4>
              <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mt-1">{cert.orgLine}</p>
            </div>
          </div>
          <div className="text-center space-y-4 my-8 md:my-10">
            <p className="text-on-surface-variant italic text-sm md:text-base">Por la presente se certifica que el equipo formado por:</p>
            <h2 className="font-montserrat text-2xl md:text-4xl font-bold text-primary leading-tight">{cert.sampleTeam}</h2>
            <p className="text-on-surface-variant text-sm md:text-base">ha superado satisfactoriamente los requisitos técnicos del</p>
            <div>
              <span className="inline-block px-6 py-2 bg-secondary-fixed text-[#161e00] rounded-full font-montserrat font-bold text-lg border-2 border-primary">
                {cert.sampleGrade}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-end gap-6 mt-10 pt-6 border-t border-surface-container-highest text-sm">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Fecha de emisión</p>
              <p className="font-bold text-primary mt-1">{cert.issueDate}</p>
            </div>
            <div className="text-center flex flex-col items-center justify-end">
              <div className="w-28 h-1 bg-primary mb-1" aria-hidden />
              <p className="text-[11px] font-bold uppercase tracking-wider">Sello de la federación</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Código de validación</p>
              <p className="font-bold text-primary mt-1">{cert.validationNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
