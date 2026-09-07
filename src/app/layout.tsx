import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MedMap | Find clinics you can actually book",
  description: "Map-first clinic discovery and booking.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
