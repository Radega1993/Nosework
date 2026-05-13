import Link from "next/link";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export default function DashboardSeasonSummary({ stats }) {
  const { localizedHref } = useLocalizedLink();
  const pts = Number(stats?.totalPoints ?? 0);
  const comps = Number(stats?.competitionsCount ?? 0);

  return (
    <div className="bg-white p-5 md:p-6 rounded-xl shadow-soft border border-surface-container-highest flex flex-col justify-between">
      <h3 className="font-montserrat text-lg font-semibold text-primary mb-4">Resumen de temporada</h3>
      <div className="space-y-3 flex-1">
        <div className="flex justify-between items-center pb-2 border-b border-surface-variant">
          <span className="text-on-surface-variant text-sm">Puntos ranking</span>
          <span className="font-bold text-primary text-xl">{pts.toLocaleString("es-ES")}</span>
        </div>
        <div className="flex justify-between items-center pb-2 border-b border-surface-variant">
          <span className="text-on-surface-variant text-sm">Competiciones (resultados)</span>
          <span className="font-bold text-primary text-xl">{String(comps).padStart(2, "0")}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-on-surface-variant text-sm">Resultados en tabla</span>
          <span className="font-bold text-primary text-xl">{String(stats?.resultsCount ?? 0).padStart(2, "0")}</span>
        </div>
      </div>
      <Link
        href={localizedHref("/resultados-rankings")}
        className="mt-4 w-full py-2.5 text-center bg-surface-container-highest text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        Ver resultados
      </Link>
    </div>
  );
}
