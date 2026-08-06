/* Hallmark · genre: atmospheric · macrostructure: Catalogue · design-system: design.md · designed-as-app */
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { BateriaCard } from "@/components/catalogo/bateria-card";
import { CATALOGO } from "@/lib/catalogo";

// Los KB de 12V que más se mueven, de 4.5 a 26 Ah, en el orden en que se piden.
const DESTACADOS = [
  "kaise-kb-1245",
  "kaise-kb-125",
  "kaise-kb-127s",
  "kaise-kb-1272",
  "kaise-kb-1290",
  "kaise-kb-12120",
  "kaise-kb-12180",
  "kaise-kb-12260",
];

export function Destacados() {
  const baterias = DESTACADOS.map((id) => CATALOGO.find((b) => b.id === id)).filter(
    (b) => b !== undefined
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="hm-eyebrow">01 / Destacados</p>
          <h2 className="hm-display mt-4 text-[clamp(1.9rem,4vw,3rem)]">
            Las que más salen
          </h2>
          <p className="mt-4 text-base text-[var(--color-ink-2)]">
            Kaise KB de 12 V, de 4.5 a 26 Ah. Son el reemplazo típico de alarmas,
            UPS chicos, luminarias de emergencia y equipo médico portátil.
          </p>
        </div>
        <Link
          href="/baterias/kaise"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-accent)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
        >
          Ver toda la serie KB
          <ArrowRightIcon size={14} weight="bold" aria-hidden />
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {baterias.map((b) => (
          <BateriaCard key={b.id} bateria={b} />
        ))}
      </div>
    </section>
  );
}
