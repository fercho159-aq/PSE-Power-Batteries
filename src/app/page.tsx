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

      {/* CTA final — banda oscura elevada */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-4">
        <div className="hm-card flex flex-col items-start gap-8 p-8 sm:p-12 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="hm-eyebrow">04 / Cotiza</p>
            <h2 className="hm-display mt-4 max-w-xl text-[clamp(1.75rem,3.5vw,2.75rem)]">
              Mándanos el modelo o una foto de tu batería
            </h2>
            <p className="mt-4 max-w-lg text-base text-[var(--color-ink-2)]">
              Identificamos el reemplazo y te cotizamos sin costo. Entrega en 24–48 horas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[var(--color-wa)] px-6 text-sm font-semibold text-[var(--color-wa-ink)] hover:brightness-110"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsappLogoIcon weight="fill" data-icon="inline-start" />
                Cotizar por WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-sm font-semibold">
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
