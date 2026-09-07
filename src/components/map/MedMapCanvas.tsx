"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
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

function createClinicMarker(clinic: ClinicPin) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "clinic-map-marker";
  el.setAttribute("aria-label", `Open ${clinic.name}`);
  el.innerHTML = `<span class="clinic-map-marker-core">+</span><span class="clinic-map-marker-ring" aria-hidden="true"></span>`;
  el.title = clinic.name;
  return el;
}

export function MedMapCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mapStyle = process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? "https://demotiles.maplibre.org/style.json";
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: mapStyle,
      center: [121.04, 14.608],
      zoom: 13.05,
      pitch: 58,
      bearing: -18,
      antialias: true,
      attributionControl: true,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true, visualizePitch: true }), "bottom-right");
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120, unit: "metric" }), "bottom-left");

    const markers: maplibregl.Marker[] = [];
    map.on("load", () => {
      CLINICS.forEach((clinic) => {
        const element = createClinicMarker(clinic);
        const marker = new maplibregl.Marker({ element, anchor: "center" })
          .setLngLat([clinic.lng, clinic.lat])
          .setPopup(
            new maplibregl.Popup({ offset: 20, closeButton: false, className: "clinic-popup" })
              .setHTML(`<strong>${clinic.name}</strong><span>Clinic discovery point</span>`),
          )
          .addTo(map);
        markers.push(marker);
      });
    });

    return () => {
      markers.forEach((marker) => marker.remove());
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="map-canvas"
      aria-label="Interactive 3D clinic discovery map"
    />
  );
}
