"use client";

import { useEffect, useId, useRef } from "react";

/**
 * Mapa OpenStreetMap (Leaflet) con todos los clubes geolocalizados.
 * Solo cliente — evita SSR/hidratación con el DOM del mapa.
 */
export default function ClubsLeafletMap({ clubs = [], onSelectClub }) {
  const mapId = useId().replace(/:/g, "");
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const clubsKey = (clubs || [])
    .map((c) => `${c.slug}:${c.lat}:${c.lng}:${c.mapProvisional ? 1 : 0}`)
    .sort()
    .join("|");

  useEffect(() => {
    let cancelled = false;
    let map;
    const selectRef = { current: onSelectClub };

    async function init() {
      if (!containerRef.current) return;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const leaflet = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      const L = leaflet.default || leaflet;

      if (cancelled || !containerRef.current) return;

      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const withCoords = (clubs || []).filter(
        (c) => Number.isFinite(Number(c.lat)) && Number.isFinite(Number(c.lng))
      );

      const bounds = [];
      withCoords.forEach((club) => {
        const lat = Number(club.lat);
        const lng = Number(club.lng);
        const provisional = Boolean(club.mapProvisional) || club.mapStatus === "PROVINCIA_APROX";
        const marker = L.circleMarker([lat, lng], {
          radius: provisional ? 8 : 10,
          color: provisional ? "#c9a56c" : "#123a30",
          weight: 2,
          fillColor: provisional ? "#d9b777" : "#4c745f",
          fillOpacity: 0.9,
        });
        const loc = [club.city, club.province].filter(Boolean).join(", ") || "Ubicación aproximada";
        const note = provisional ? "<br/><em>Ubicación aproximada / por confirmar</em>" : "";
        marker.bindPopup(
          `<strong>${club.name}</strong><br/>${loc}${note}<br/><button type="button" data-club-slug="${club.slug}" class="club-map-goto" style="margin-top:6px;font-weight:700;cursor:pointer;border:0;background:#123a30;color:#fff;padding:6px 10px;border-radius:8px">Ver ficha</button>`
        );
        marker.on("click", () => selectRef.current?.(club));
        marker.addTo(map);
        bounds.push([lat, lng]);
      });

      map.on("popupopen", (e) => {
        const btn = e.popup.getElement()?.querySelector?.(".club-map-goto");
        if (!btn) return;
        btn.onclick = () => {
          const slug = btn.getAttribute("data-club-slug");
          const club = withCoords.find((c) => c.slug === slug);
          if (club) selectRef.current?.(club);
        };
      });

      if (bounds.length === 1) {
        map.setView(bounds[0], 8);
      } else if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [36, 36], maxZoom: 7 });
      } else {
        map.setView([40.2, -3.7], 5.5);
      }

      setTimeout(() => {
        if (!cancelled && mapRef.current) mapRef.current.invalidateSize();
      }, 100);
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // clubsKey serializa posiciones; onSelectClub se lee vía ref estable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubsKey]);

  return (
    <div className="relative h-full w-full min-h-[420px]">
      <div
        id={`clubs-map-${mapId}`}
        ref={containerRef}
        className="h-full w-full min-h-[420px] rounded-xl z-0"
        role="region"
        aria-label="Mapa de clubes Nosework Trial"
      />
      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] max-w-[220px] rounded-lg border border-outline-variant bg-white/95 p-3 text-xs text-primary shadow-md">
        <p className="font-bold mb-1">Leyenda</p>
        <p className="text-on-surface-variant">
          Verde = municipio conocido · Dorado = aproximado / por confirmar
        </p>
      </div>
    </div>
  );
}
