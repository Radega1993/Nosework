import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

/**
 * Ruta histórica: redirige al nuevo centro "Mi club".
 */
export default function ManageClubsRedirect() {
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();

  useEffect(() => {
    if (!router.isReady) return;
    router.replace(localizedHref("/dashboard/club"));
  }, [router.isReady, router, localizedHref]);

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
      Redirigiendo…
    </div>
  );
}
