"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type ClinicPin = {
  id: string;
  name: string;
  lng: number;
  lat: number;
};

const CLINICS: ClinicPin[] = [
  { id: "northstar", name: "Northstar Family Clinic", lng: 121.038, lat: 14.609 },
  { id: "harbor", name: "Harbor Dental Studio", lng: 121.022, lat: 14.596 },
  { id: "lumen", name: "Lumen Skin & Wellness", lng: 121.055, lat: 14.618 },
];

export function MedMapCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mapStyle = process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? "https://demotiles.maplibre.org/style.json";
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: [121.04, 14.608],
      zoom: 12.8,
      pitch: 48,
      bearing: -12,
      antialias: true,
      attributionControl: true,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "bottom-right");

    map.on("load", () => {
      CLINICS.forEach((clinic) => {
        const marker = new maplibregl.Marker({ color: "#f5fbff" })
          .setLngLat([clinic.lng, clinic.lat])
          .setPopup(new maplibregl.Popup({ offset: 18 }).setText(clinic.name))
          .addTo(map);

        marker.getElement().style.filter = "drop-shadow(0 0 14px rgba(137, 231, 255, .75))";
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={containerRef} className="map-canvas" aria-label="Interactive clinic map" />;
}
