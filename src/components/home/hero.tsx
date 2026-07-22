import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";

import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/**
 * Hero a casi pantalla completa: imagen grande, texto mínimo y dos acciones.
 * Copys recortados de legacy/index.html (sección #inicio).
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] items-center overflow-hidden bg-[var(--pse-ink)]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/media/Sin-titulo-1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        {/* Velo para que el texto se lea sobre la foto */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--pse-ink)] via-[var(--pse-ink)]/85 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
        <p className="text-xs tracking-[0.2em] text-[var(--pse-paper)]/60 uppercase">
          Power-Sonic · Kaise · Dynasty · Genesis
        </p>

        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.05] font-semibold text-[var(--pse-paper)] sm:text-6xl lg:text-7xl">
          La batería exacta para el equipo que{" "}
          <em className="text-accent not-italic">no puede apagarse</em>.
        </h1>

        <p className="mt-6 max-w-xl text-base text-[var(--pse-paper)]/75 sm:text-lg">
          Baterías selladas de respaldo y ciclo profundo. Si no la tenemos, la conseguimos.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="h-12 px-6 text-sm">
            <Link href="/baterias">
              Ver catálogo
              <ArrowRightIcon weight="bold" data-icon="inline-end" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="h-12 bg-[var(--pse-green)] px-6 text-sm text-white hover:bg-[var(--pse-green)]/85"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsappLogoIcon weight="fill" data-icon="inline-start" />
              WhatsApp
            </a>
          </Button>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-3 text-xs text-[var(--pse-paper)]/60">
          <li>
            <strong className="text-[var(--pse-paper)]">30+</strong> años en el mercado
          </li>
          <li>
            <strong className="text-[var(--pse-paper)]">24–48 h</strong> de entrega
          </li>
          <li>
            <strong className="text-[var(--pse-paper)]">71</strong> modelos en catálogo
          </li>
        </ul>
      </div>
    </section>
  );
}
