import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { RastreoClics } from "@/components/rastreo-clics";
import { GOOGLE_SITE_VERIFICATION, GOOGLE_TAG_ID, SITIO } from "@/lib/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Mono para datos técnicos (voltaje, Ah, medidas); globals.css la consume vía --font-mono.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const TITULO = "PSE Power Batteries | Baterías selladas VRLA/AGM";
const DESCRIPCION =
  "Distribuidor de baterías selladas VRLA/AGM Power-Sonic, Kaise, Dynasty y Genesis para equipo médico, sistemas de emergencia, telecomunicaciones y movilidad eléctrica. Cotiza sin costo, entrega en 24–48 horas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: TITULO,
    template: "%s | PSE Power Batteries",
  },
  description: DESCRIPCION,
  applicationName: "PSE Power Batteries",
  keywords: [
    "baterías selladas",
    "VRLA",
    "AGM",
    "Power-Sonic",
    "Kaise",
    "Dynasty",
    "Genesis",
    "ciclo profundo",
    "batería de respaldo",
    "México",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITIO,
    siteName: "PSE Power Batteries",
    title: TITULO,
    description: DESCRIPCION,
    images: [
      {
        url: "/media/ps_group-shot-min.png",
        width: 1200,
        height: 630,
        alt: "Baterías selladas PSE Power Batteries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
    images: ["/media/ps_group-shot-min.png"],
  },
  icons: { icon: "/media/logo-ps-final-1-03.png" },
  verification: { google: GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable
      )}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <RastreoClics />
      </body>
      <GoogleAnalytics gaId={GOOGLE_TAG_ID} />
    </html>
  );
}
