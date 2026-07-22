import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { CarritoProvider } from "@/components/carrito/carrito-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

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

const SITIO = "https://psepowerbatteries.com";
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
        <CarritoProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster position="bottom-right" />
        </CarritoProvider>
      </body>
    </html>
  );
}
