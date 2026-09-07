import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const outDir = resolve("out");
const indexPath = resolve(outDir, "index.html");
const clinicPath = resolve(outDir, "clinics", "northstar.html");

const fail = (message) => {
  console.error(`Pages export verification failed: ${message}`);
  process.exit(1);
};

if (!existsSync(outDir) || !statSync(outDir).isDirectory()) {
  fail("out/ does not exist. Run the static build first.");
}

if (!existsSync(indexPath)) {
  fail("out/index.html is missing.");
}

if (!existsSync(clinicPath)) {
  fail("out/clinics/northstar.html is missing.");
}

const index = readFileSync(indexPath, "utf8");
const clinic = readFileSync(clinicPath, "utf8");

const indexMarkers = [
  '<title>MedMap | Find clinics you can actually book</title>',
  "SPATIAL CLINIC DISCOVERY",
  "Find a clinic that can actually take your appointment.",
  "/MedMap/_next/",
];

for (const marker of indexMarkers) {
  if (!index.includes(marker)) {
    fail(`out/index.html is missing expected MedMap marker: ${marker}`);
  }
}

if (index.includes("Read PRODUCT_LAW.md first")) {
  fail("out/index.html contains README content, which indicates the wrong site payload was packaged.");
}

for (const marker of [
  "Northstar Family Clinic",
  "Profile",
  "Services",
  "Booking",
  "About",
  "Contact",
]) {
  if (!clinic.includes(marker)) {
    fail(`out/clinics/northstar.html is missing expected clinic marker: ${marker}`);
  }
}

console.log("Pages export verification passed: MedMap landing page and clinic route are present in out/.");
