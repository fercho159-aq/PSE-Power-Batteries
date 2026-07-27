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

/** Registration cross — blueprint corner mark. */
function Cross({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 h-3 w-3 text-[var(--color-accent)] ${className ?? ""}`}
    >
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--color-rule)] bg-[image:var(--grad-hero)]">
      {/* Blueprint grid — fades out toward the edges */}
      <div
        aria-hidden
        className="hm-grid absolute inset-0 -z-10 [mask-image:radial-gradient(100%_85%_at_60%_35%,black,transparent_82%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        {/* Blueprint frame + registration marks around the fold */}
        <div className="pointer-events-none absolute inset-x-6 top-10 bottom-10 border-x border-[var(--color-rule)]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 top-10 hidden items-center justify-between font-mono text-[10px] tracking-[0.2em] text-[var(--color-ink-2)] uppercase sm:flex" aria-hidden>
          <span>PSE · Ficha 001</span>
          <span>Catálogo 2026 · 71 SKU</span>
        </div>

        <div className="relative grid gap-12 pt-20 pb-20 sm:pt-28 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Cross className="top-8 -left-1" />
          <Cross className="top-8 -right-1" />
          <Cross className="bottom-8 -left-1" />
          <Cross className="bottom-8 -right-1" />
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

        {/* Right — navy→royal gradient panel holding the stat card + product */}
        <div className="relative rounded-2xl bg-[image:var(--grad-panel)] p-5 shadow-[0_1px_2px_oklch(24%_0.05_260/0.08),0_30px_60px_-30px_oklch(24%_0.05_260/0.6)] sm:p-6">
          {/* faint blueprint grid inside the dark panel */}
          <div
            aria-hidden
            className="hm-grid pointer-events-none absolute inset-0 rounded-2xl opacity-40 [mask-image:radial-gradient(120%_90%_at_80%_10%,black,transparent_75%)]"
          />
          <div className="relative flex flex-col gap-5">
            <div className="rounded-xl bg-[var(--color-paper)] p-6 shadow-[0_10px_30px_-18px_oklch(24%_0.05_260/0.5)] sm:p-7">
              <div className="flex items-end gap-3">
                <Tick
                  target={30}
                  className="hm-display font-mono text-[clamp(4rem,12vw,6.5rem)] tabular-nums leading-none text-[var(--color-ink)]"
                />
                <span className="hm-display mb-2 font-mono text-4xl text-[var(--color-accent)]">
                  +
                </span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-[var(--color-ink-2)]">
                <span className="text-[var(--color-ink)]">años</span> manteniendo
                encendidos sistemas críticos con proveedores de primera línea.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--color-rule)] pt-5 font-mono text-xs">
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

            {/* Product family — floats on the gradient, no plate */}
            <div className="relative h-40 sm:h-48">
              <Image
                src="/media/ps_group-shot-min.png"
                alt="Familia de baterías selladas Power-Sonic"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-contain drop-shadow-[0_18px_24px_oklch(0%_0_0/0.45)]"
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
