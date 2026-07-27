/* Hallmark · genre: atmospheric · macrostructure: Stat-Led · design-system: design.md · designed-as-app */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, WhatsappLogoIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "@/lib/whatsapp";

/** Number-tick: cuenta 0 → target en ~500ms. Respeta prefers-reduced-motion. */
function Tick({ target, className }: { target: number; className?: string }) {
  const [value, setValue] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? target
      : 0,
  );
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let start = 0;
    const dur = 520;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return (
    <span ref={ref} className={className} aria-label={String(target)}>
      {value}
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        {/* Left — statement + CTAs */}
        <div>
          <p className="hm-eyebrow">Power-Sonic · Kaise · Dynasty · Genesis</p>

          <h1 className="hm-display mt-5 text-[clamp(2.5rem,6vw+0.5rem,5rem)]">
            La batería exacta para el equipo que{" "}
            <span className="border-b-2 border-[var(--color-accent)] pb-0.5">
              no puede apagarse
            </span>
            .
          </h1>

          <p className="mt-6 max-w-md text-base text-[var(--color-ink-2)] sm:text-lg">
            Baterías selladas de respaldo y ciclo profundo. Si no la tenemos en
            existencia, la conseguimos.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-sm font-semibold">
              <Link href="/baterias">
                Ver catálogo
                <ArrowRightIcon weight="bold" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[var(--color-wa)] px-6 text-sm font-semibold text-[var(--color-wa-ink)] hover:brightness-110"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsappLogoIcon weight="fill" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* Right — the giant number (Stat-Led figure) + specimen */}
        <div className="flex flex-col gap-6">
          <div className="hm-card p-6 sm:p-8">
            <div className="flex items-end gap-3">
              <Tick
                target={30}
                className="hm-display font-mono text-[clamp(4rem,12vw,7rem)] tabular-nums leading-none text-[var(--color-ink)]"
              />
              <span className="hm-display mb-2 font-mono text-4xl text-[var(--color-ink-2)]">
                +
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-[var(--color-ink-2)]">
              <span className="text-[var(--color-ink)]">años</span> manteniendo
              encendidos sistemas críticos con proveedores de primera línea.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-5 font-mono text-xs">
              <div>
                <div className="text-lg tabular-nums text-[var(--color-ink)]">71</div>
                <div className="text-[var(--color-ink-2)]">modelos</div>
              </div>
              <div>
                <div className="text-lg tabular-nums text-[var(--color-ink)]">4</div>
                <div className="text-[var(--color-ink-2)]">marcas</div>
              </div>
              <div>
                <div className="text-lg tabular-nums text-[var(--color-ink)]">24–48h</div>
                <div className="text-[var(--color-ink-2)]">entrega</div>
              </div>
            </div>
          </div>

          <div className="hm-plate relative hidden h-44 overflow-hidden sm:block">
            <Image
              src="/media/ps_group-shot-min.png"
              alt="Familia de baterías selladas Power-Sonic"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 460px"
              className="object-contain p-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
