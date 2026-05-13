export default function DashboardLicenseCard({ profile }) {
  const hasLicense = Boolean(profile.licenseNumber);

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-soft border border-surface-container-highest overflow-hidden flex flex-col md:flex-row">
      <div className="p-5 md:p-6 bg-primary-container text-white flex flex-col justify-between w-full md:w-2/3 min-h-[200px]">
        <div>
          <div className="flex justify-between items-start gap-2 mb-4">
            <span className="font-montserrat text-sm font-bold tracking-tight">NTC</span>
            {profile.licenseStatus ? (
              <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-xs font-bold uppercase shrink-0">
                {profile.licenseStatus}
              </span>
            ) : (
              <span className="bg-white/15 text-white/90 px-2 py-0.5 rounded-full text-xs font-bold uppercase">Sin licencia emitida</span>
            )}
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider opacity-70 mb-1">Nº licencia</p>
          {hasLicense ? (
            <p className="font-montserrat text-xl md:text-2xl font-bold tracking-widest">{profile.licenseNumber}</p>
          ) : (
            <p className="text-sm opacity-90 leading-relaxed">
              Cuando tengas licencia federativa aparecerá aquí. Los datos se cargan desde tu perfil en la base de datos.
            </p>
          )}
        </div>
        {profile.delegation ? (
          <p className="text-sm opacity-80 mt-4">
            <span className="font-bold">Delegación:</span> {profile.delegation}
          </p>
        ) : null}
      </div>
      <div className="p-5 flex flex-col items-center justify-center bg-surface-container-lowest border-t md:border-t-0 md:border-l border-surface-container-highest flex-1 min-h-[160px]">
        <div className="w-28 h-28 rounded-lg bg-primary/90 flex items-center justify-center mb-3" aria-hidden>
          <span className="material-symbols-outlined text-white text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
        </div>
        <p className="text-xs text-on-surface-variant text-center">Identidad federativa digital (MVP)</p>
      </div>
    </div>
  );
}
