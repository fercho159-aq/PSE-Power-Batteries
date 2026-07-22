import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

import { Aplicaciones } from "@/components/home/aplicaciones";
import { Hero } from "@/components/home/hero";
import { MarcasGrid } from "@/components/home/marcas-grid";
import { Nosotros } from "@/components/home/nosotros";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: {
    absolute:
      "PSE Power Batteries — Baterías selladas para equipo que no puede apagarse",
  },
  description:
    "Distribuidor de baterías selladas VRLA/AGM Power-Sonic, Kaise, Dynasty y Genesis para equipo médico, emergencia, telecomunicaciones y movilidad eléctrica.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <MarcasGrid />
      <Aplicaciones />
      <Nosotros />

      {/* CTA final */}
      <section className="border-t border-border bg-[var(--pse-ink)] py-20 sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="max-w-xl text-2xl font-semibold text-[var(--pse-paper)] sm:text-3xl">
              Mándanos el modelo — o una foto de tu batería
            </h2>
            <p className="mt-3 max-w-lg text-sm text-[var(--pse-paper)]/70">
              Identificamos el reemplazo y te cotizamos sin costo. Entrega en 24–48 horas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-[var(--pse-green)] px-6 text-sm text-white hover:bg-[var(--pse-green)]/85"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsappLogoIcon weight="fill" data-icon="inline-start" />
                Cotizar por WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-sm">
              <Link href="/calculadora">
                Calculadora de respaldo
                <ArrowRightIcon weight="bold" data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
