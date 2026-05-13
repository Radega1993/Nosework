import Image from "next/image";

export default function DashboardHeader({ profile }) {
  const first = profile.displayName?.split(/\s+/)[0] || "Guía";

  return (
    <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8 md:mb-10">
      <div>
        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-primary">
          Hola, {first}
        </h2>
        <p className="text-on-surface-variant text-base mt-1">Bienvenido/a a tu panel de control.</p>
      </div>
      <div className="flex items-center gap-4 sm:text-right">
        <div>
          <p className="font-bold text-primary">{profile.displayName}</p>
          <p className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">HANDEL ID: {profile.publicId}</p>
        </div>
        <div className="relative w-14 h-14 rounded-full border-2 border-secondary-fixed overflow-hidden bg-surface-container-highest shrink-0">
          {profile.avatarUrl && String(profile.avatarUrl).startsWith("/") ? (
            <Image src={profile.avatarUrl} alt="" fill className="object-cover" sizes="56px" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary font-montserrat font-bold text-lg" aria-hidden>
              {profile.displayName?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
