import type { Metadata, Viewport } from "next";
import { Theme } from "@astryxdesign/core/theme";
import { trustibleTheme } from "./trustible";
import { DemoProvider } from "./providers";
import { AppShell } from "./components";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://trustible.pages.dev"),
  title: "Trustible — Hire with proof, not luck",
  description: "A verified interior design marketplace prototype for Klang Valley.",
  manifest: "/manifest.json",
  openGraph: { title: "Trustible — Hire with proof, not luck", description: "A verified interior design marketplace prototype for Klang Valley.", images: ["/trustible-architectural-hero.png"] }
};

export const viewport: Viewport = {
  themeColor: "#344e5c",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap" /></head><body><Theme theme={trustibleTheme} mode="light"><DemoProvider><AppShell>{children}</AppShell></DemoProvider></Theme></body></html>;
}





