"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type PoseName = "arrival" | "hall" | "discovery" | "clinic" | "overview";
type SpatialId = "discovery" | "clinic" | "operations";

type Pose = { position: THREE.Vector3; target: THREE.Vector3; fov: number };

const POSES: Record<PoseName, Pose> = {
  arrival: { position: new THREE.Vector3(0.2, 3.0, 15.5), target: new THREE.Vector3(0, 2.0, 0.8), fov: 40 },
  hall: { position: new THREE.Vector3(0.2, 2.5, 10.2), target: new THREE.Vector3(0, 2.0, 0.4), fov: 44 },
  discovery: { position: new THREE.Vector3(-2.7, 2.35, 5.8), target: new THREE.Vector3(-2.2, 1.75, 2.0), fov: 48 },
  clinic: { position: new THREE.Vector3(2.8, 2.25, 5.9), target: new THREE.Vector3(2.2, 1.8, 1.9), fov: 48 },
  overview: { position: new THREE.Vector3(0.1, 4.0, 8.8), target: new THREE.Vector3(0, 1.0, -0.2), fov: 45 },
};

const OBJECTS: Array<{ id: SpatialId; label: string; position: [number, number, number]; color: number }> = [
  { id: "discovery", label: "Find clinics", position: [-2.4, 0, 1.9], color: 0x7bd0d8 },
  { id: "clinic", label: "Clinic", position: [2.25, 0, 1.9], color: 0xa7e3e5 },
  { id: "operations", label: "Owner workspace", position: [0.2, 0, -0.7], color: 0xd6c7a7 },
];

function box(size: [number, number, number], material: THREE.Material, pos: [number, number, number]) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...pos);
  return mesh;
}

function makeObject(spec: (typeof OBJECTS)[number]) {
  const group = new THREE.Group();
  group.name = `spatial-object-${spec.id}`;
  group.userData.spatialId = spec.id;
  group.position.set(...spec.position);
  const dark = new THREE.MeshStandardMaterial({ color: 0x26363b, roughness: 0.52, metalness: 0.45 });
  const accent = new THREE.MeshStandardMaterial({ color: spec.color, emissive: spec.color, emissiveIntensity: 0.14, roughness: 0.28, metalness: 0.18 });
  const light = new THREE.MeshStandardMaterial({ color: 0xf5f1e6, roughness: 0.42, metalness: 0.28 });
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.88, 0.46, 28), dark); pedestal.position.y = 0.23; group.add(pedestal);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.45, 0.2), accent); frame.position.set(0, 1.0, -0.18); group.add(frame);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 16), accent); glow.position.y = 1.42; group.add(glow);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.05, 8, 36), light); ring.rotation.x = Math.PI / 2; ring.position.y = 1.5; group.add(ring);
  return group;
}

function createEnvironment(scene: THREE.Scene) {
  const root = new THREE.Group(); root.name = "medmap-coastal-apartment"; scene.add(root);
  const stone = new THREE.MeshStandardMaterial({ color: 0xd8d3c7, roughness: 0.84 });
  const wall = new THREE.MeshStandardMaterial({ color: 0xf0efe9, roughness: 0.72 });
  const side = new THREE.MeshStandardMaterial({ color: 0xe4e1da, roughness: 0.78 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x876f54, roughness: 0.66 });
  const frame = new THREE.MeshStandardMaterial({ color: 0x273941, roughness: 0.4, metalness: 0.46 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x9bc9c9, transparent: true, opacity: 0.38, transmission: 0.22, roughness: 0.16, clearcoat: 0.45 });
  const leaf = new THREE.MeshStandardMaterial({ color: 0x5d8b75, roughness: 0.94 });
  const trunk = new THREE.MeshStandardMaterial({ color: 0x6e5b49, roughness: 1 });

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 28), stone); floor.rotation.x = -Math.PI / 2; floor.position.z = -0.6; root.add(floor);
  root.add(box([13, 7.4, 0.24], wall, [0, 3.7, -6.1]));
  root.add(box([0.24, 7.4, 12], side, [-6.35, 3.7, -0.2]));
  root.add(box([0.24, 7.4, 12], side, [6.35, 3.7, -0.2]));
  for (const x of [-4.7, -2.35, 0, 2.35, 4.7]) root.add(box([0.1, 3.2, 0.12], wood, [x, 5.6, -1.4]));
  for (const x of [-3.8, -1.25, 1.25, 3.8]) {
    root.add(box([2.05, 3.15, 0.06], glass, [x, 3.45, -5.94]));
    root.add(box([0.06, 3.4, 0.12], frame, [x - 1.03, 3.45, -5.82]));
    root.add(box([0.06, 3.4, 0.12], frame, [x + 1.03, 3.45, -5.82]));
  }
  for (const x of [-5.15, 5.15]) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 2.6, 10), trunk); t.position.set(x, 1.3, -6.35); root.add(t);
    const c = new THREE.Mesh(new THREE.SphereGeometry(1.25, 14, 12), leaf); c.position.set(x, 3.1, -6.35); root.add(c);
  }
  root.add(box([0.16, 5.6, 0.25], frame, [-1.65, 2.8, 4.8]));
  root.add(box([0.16, 5.6, 0.25], frame, [1.65, 2.8, 4.8]));
  root.add(box([3.45, 0.16, 0.25], frame, [0, 5.55, 4.8]));
  return root;
}

function smoothstep(v: number) { const t = Math.max(0, Math.min(1, v)); return t * t * (3 - 2 * t); }

export function HeroDiorama() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "high-performance" });
    if (!context) { canvas.dataset.webgl = "unavailable"; canvas.dataset.environmentVersion = "4"; return; }

    canvas.dataset.webgl = "active"; canvas.dataset.environmentVersion = "4"; canvas.dataset.cameraPov = "arrival"; canvas.dataset.cameraProgress = "0";
    const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.03;

    const scene = new THREE.Scene(); scene.background = new THREE.Color(0xb6d0cf); scene.fog = new THREE.FogExp2(0xb6d0cf, 0.021);
    const camera = new THREE.PerspectiveCamera(POSES.arrival.fov, 1, 0.1, 100); camera.position.copy(POSES.arrival.position);
    scene.add(new THREE.HemisphereLight(0xf5f2ea, 0x456067, 2.0));
    const sun = new THREE.DirectionalLight(0xffedd4, 3.3); sun.position.set(-5, 9, 8); scene.add(sun);
    const rim = new THREE.DirectionalLight(0x9ddde0, 1.25); rim.position.set(6, 4, -3); scene.add(rim);
    const environment = createEnvironment(scene);
    const spatialGroups = new Map<SpatialId, THREE.Group>(); OBJECTS.forEach((spec) => { const group = makeObject(spec); spatialGroups.set(spec.id, group); scene.add(group); });

    let targetPose: PoseName = "arrival", fromPose: PoseName = "arrival", transition = 1, progress = 0, active: SpatialId | null = null, px = 0, py = 0, raf = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)"), raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
    const setPose = (next: PoseName) => { if (next === targetPose && transition >= 1) return; fromPose = targetPose; targetPose = next; transition = 0; };
    const setObject = (id: SpatialId | null) => { active = id; setPose(id === "discovery" ? "discovery" : id === "clinic" ? "clinic" : id === "operations" ? "overview" : "hall"); window.dispatchEvent(new CustomEvent("medmap-spatial-object-focus", { detail: { id } })); };

    const onPointerMove = (event: PointerEvent) => { const r = canvas.getBoundingClientRect(); px = Math.max(-0.18, Math.min(0.18, ((((event.clientX - r.left) / r.width) * 2) - 1) * 0.14)); py = Math.max(-0.12, Math.min(0.12, -(((((event.clientY - r.top) / r.height) * 2) - 1) * 0.08))); };
    const onClick = (event: MouseEvent) => {
      if (reducedMotion.matches) return;
      const r = canvas.getBoundingClientRect(); pointer.set((((event.clientX - r.left) / r.width) * 2) - 1, -(((((event.clientY - r.top) / r.height) * 2) - 1))); raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects([...spatialGroups.values()], true)[0]; let node: THREE.Object3D | null = hit?.object ?? null; while (node && !node.userData.spatialId) node = node.parent; if (node?.userData.spatialId) setObject(node.userData.spatialId as SpatialId);
    };
    const onPoseRequest = (event: Event) => { const pose = (event as CustomEvent<{ pose?: string }>).detail?.pose; if (pose === "discovery") setObject("discovery"); else if (pose === "clinic") setObject("clinic"); else if (pose === "operations") setObject("operations"); };
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setObject(null); };
    const onScroll = () => {
      if (reducedMotion.matches) return; const hero = canvas.closest(".hero-environment") as HTMLElement | null; if (!hero) return; const rect = hero.getBoundingClientRect(); progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight))); if (progress < 0.08) setPose("arrival"); else if (progress < 0.42) setPose("hall"); else setPose("overview");
    };
    const onResize = () => { const width = Math.max(1, canvas.clientWidth), height = Math.max(1, canvas.clientHeight); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };

    canvas.addEventListener("pointermove", onPointerMove); canvas.addEventListener("click", onClick); window.addEventListener("medmap-spatial-set-pose", onPoseRequest); window.addEventListener("keydown", onKeyDown); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onResize); reducedMotion.addEventListener("change", onScroll); onResize(); onScroll();
    const clock = new THREE.Clock(), desiredPosition = new THREE.Vector3(), desiredTarget = new THREE.Vector3(), scale = new THREE.Vector3();
    const animate = () => {
      const elapsed = clock.getElapsedTime(); transition = reducedMotion.matches ? 1 : Math.min(1, transition + 0.035); const a = POSES[fromPose], b = POSES[targetPose], t = smoothstep(transition);
      desiredPosition.lerpVectors(a.position, b.position, t); desiredTarget.lerpVectors(a.target, b.target, t);
      if (!reducedMotion.matches) { desiredPosition.x += px * 0.45; desiredPosition.y += py * 0.22; desiredTarget.x += px * 0.32; desiredTarget.y += py * 0.12; }
      camera.position.lerp(desiredPosition, 0.24); camera.lookAt(desiredTarget); camera.fov = a.fov + (b.fov - a.fov) * t; camera.updateProjectionMatrix();
      spatialGroups.forEach((group, id) => { const selected = active === id; if (!reducedMotion.matches) group.rotation.y += selected ? 0.002 : 0.0008; const s = selected ? 1.08 : 1; scale.set(s, s, s); group.scale.lerp(scale, 0.08); });
      canvas.dataset.cameraPov = targetPose; canvas.dataset.cameraProgress = progress.toFixed(3); canvas.dataset.cameraDistance = camera.position.distanceTo(desiredTarget).toFixed(3); canvas.dataset.cameraYaw = Math.atan2(desiredTarget.x - camera.position.x, desiredTarget.z - camera.position.z).toFixed(3); canvas.dataset.cameraPitch = Math.atan2(desiredTarget.y - camera.position.y, Math.hypot(desiredTarget.x - camera.position.x, desiredTarget.z - camera.position.z)).toFixed(3); canvas.dataset.spatialObject = active ?? "none";
      renderer.render(scene, camera); raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf); canvas.removeEventListener("pointermove", onPointerMove); canvas.removeEventListener("click", onClick); window.removeEventListener("medmap-spatial-set-pose", onPoseRequest); window.removeEventListener("keydown", onKeyDown); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); reducedMotion.removeEventListener("change", onScroll);
      environment.traverse((child) => { const mesh = child as THREE.Mesh; mesh.geometry?.dispose?.(); if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose()); else mesh.material?.dispose?.(); });
      spatialGroups.forEach((group) => group.traverse((child) => { const mesh = child as THREE.Mesh; mesh.geometry?.dispose?.(); if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose()); else mesh.material?.dispose?.(); })); renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-mesh-canvas" data-testid="hero-mesh-canvas" data-webgl="pending" data-environment-version="4" data-mesh-count="0" data-mesh-triangles="0" data-camera-pov="arrival" data-camera-progress="0" aria-label="MedMap cinematic 3D spatial environment" />;
}
