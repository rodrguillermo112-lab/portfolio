import type { Metadata } from "next";
import { site } from "@/data/site";
import "./globals.css";
import "./upgrade.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    locale: "es_ES",
    alternateLocale: "en_US",
    ...(site.ogImage ? { images: [{ url: site.ogImage }] } : {}),
  },
  twitter: {
    card: site.ogImage ? "summary_large_image" : "summary",
    title: site.title,
    description: site.description,
    ...(site.ogImage ? { images: [site.ogImage] } : {}),
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
