import Image from "next/image";
import { CLUB_PROVINCE_OPTIONS, CLUB_SERVICE_FILTERS } from "@/data/partnerClubs";

/**
 * Panel filtros (mockup) + mapa decorativo con pins.
 * @param {{ draftProvince: string, draftServices: Record<string, boolean>, onProvinceChange: (v: string) => void, onServiceToggle: (id: string) => void, onApply: () => void }} props
 */
export default function ClubsFiltersMap({
  draftProvince,
  draftServices,
  onProvinceChange,
  onServiceToggle,
  onApply,
  provinceOptions = CLUB_PROVINCE_OPTIONS,
}) {
  return (
    <section className="max-w-container-max mx-auto px-6 py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container p-6 rounded-xl shadow-soft border border-outline-variant">
            <h3 className="font-montserrat text-lg font-semibold text-primary mb-4">Buscador de clubes</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-1.5">
                  Provincia
                </label>
                <select
                  className="w-full bg-white border border-outline-variant rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
                  value={draftProvince}
                  onChange={(e) => onProvinceChange(e.target.value)}
                >
                  <option value="Todas">Todas las provincias</option>
                  {provinceOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-2">
                  Servicios
                </label>
                <div className="space-y-2">
                  {CLUB_SERVICE_FILTERS.map((f) => (
                    <label key={f.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-outline-variant text-primary focus:ring-secondary"
                        checked={Boolean(draftServices[f.id])}
                        onChange={() => onServiceToggle(f.id)}
                      />
                      {f.label}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={onApply}
                className="w-full bg-secondary text-on-secondary font-bold py-2.5 rounded-lg hover:brightness-105 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 h-[420px] lg:h-[500px] bg-surface-container-highest rounded-xl relative overflow-hidden shadow-soft border border-outline-variant">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-dog.webp"
              alt=""
              fill
              className="object-cover opacity-40 grayscale"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-primary/35" aria-hidden />
          </div>
          <div className="absolute top-1/4 left-[28%] group cursor-pointer">
            <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-primary text-on-primary p-3 rounded-lg text-xs shadow-xl z-10">
              <p className="font-bold">Red de clubes</p>
              <p className="opacity-90">Consulta el listado inferior con todos los participantes.</p>
            </div>
          </div>
          <div className="absolute top-[42%] left-[58%] group cursor-pointer">
            <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              location_on
            </span>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 bg-primary text-on-primary p-3 rounded-lg text-xs shadow-xl z-10">
              <p className="font-bold">España</p>
              <p className="opacity-90">Mapa orientativo; ubicaciones concretas en cada ficha.</p>
            </div>
          </div>
          <div className="absolute bottom-16 right-8 max-w-xs bg-white/95 backdrop-blur-sm rounded-lg p-4 text-sm text-primary border border-outline-variant shadow-lg">
            <p className="font-bold mb-1">Directorio actualizado</p>
            <p className="text-on-surface-variant text-xs">
              Los clubes con logo en esta página colaboran con la comunidad Nosework Trial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
