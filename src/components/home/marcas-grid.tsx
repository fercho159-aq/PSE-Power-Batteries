/* Hallmark · genre: atmospheric · macrostructure: Stat-Led · design-system: design.md · designed-as-app */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";

import { CATALOGO, MARCA_SLUG, type Marca } from "@/lib/catalogo";

type Ficha = {
  marca: Marca;
  logo: string;
  desc: string;
  meta: string;
};

// Logos y descripciones tomados de legacy/index.html (sección #marcas), recortados.
const FICHAS: Ficha[] = [
  {
    marca: "Power-Sonic",
    logo: "/media/logo-powersonic.png",
    desc: "La línea más amplia del catálogo, de VRLA a ciclo profundo.",
    meta: "VRLA · AGM · Ciclo profundo",
  },
  {
    marca: "Kaise",
    logo: "/media/logo-kaise.png",
    desc: "Selladas para seguridad, emergencia y respaldo.",
    meta: "Respaldo · Seguridad",
  },
  {
    marca: "Dynasty",
    logo: "/media/logo-dynasty.png",
    desc: "Alta potencia para UPS y misión crítica.",
    meta: "UPS · Alta potencia",
  },
  {
    marca: "Genesis",
    logo: "/media/logo-genesis.png",
    desc: "Alto desempeño para descarga rápida y arranque.",
    meta: "Alto desempeño",
  },
];

function contarModelos(marca: Marca): number {
  return CATALOGO.filter((b) => b.marca === marca).length;
}

export function MarcasGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="hm-eyebrow">02 / Marcas</p>
        <h2 className="hm-display mt-4 text-[clamp(1.9rem,4vw,3rem)]">
          Proveedores de primera línea
        </h2>
        <p className="mt-4 text-base text-[var(--color-ink-2)]">
          Cuatro fabricantes, 71 modelos en catálogo. Cada marca cubre un tramo
          distinto del rango: respaldo, ciclo profundo y alta descarga.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FICHAS.map((f) => (
          <Link
            key={f.marca}
            href={`/baterias/${MARCA_SLUG[f.marca]}`}
            className="hm-card group flex flex-col gap-5 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
          >
            {/* El logo vive en la única superficie clara — la plate especimen */}
            <div className="hm-plate flex h-24 items-center justify-center overflow-hidden px-5">
              <Image
                src={f.logo}
                alt={f.marca}
                width={220}
                height={64}
                className="h-auto max-h-12 w-auto max-w-full object-contain"
              />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="hm-display text-lg">{f.marca}</h3>
                <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  {contarModelos(f.marca)} modelos
                </p>
              </div>
              <ArrowUpRightIcon
                size={16}
                weight="bold"
                className="mt-1 shrink-0 text-[var(--color-ink-2)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
              />
            </div>

            <div className="mt-auto space-y-2">
              <p className="text-sm text-[var(--color-ink-2)]">{f.desc}</p>
              <p className="font-mono text-[0.7rem] text-[var(--color-ink-2)]">
                {f.meta}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
