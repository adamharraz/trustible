import type { Metadata, Viewport } from "next";
import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import { DemoProvider } from "./providers";
import { AppShell } from "./components";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trustible — Hire with proof, not luck",
  description: "A verified interior design marketplace prototype for Klang Valley.",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  themeColor: "#344e5c",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="light"><body><Theme theme={neutralTheme} mode="light"><DemoProvider><AppShell>{children}</AppShell></DemoProvider></Theme></body></html>;
}
