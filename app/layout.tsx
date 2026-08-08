import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trustible MVP",
  description: "Verified contractor marketplace prototype with simulated milestone protected payments.",
  manifest: "/manifest.json"
};

export const viewport: Viewport = {
  themeColor: "#183d3d",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
