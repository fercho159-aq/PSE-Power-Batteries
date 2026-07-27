/* Hallmark · genre: atmospheric · macrostructure: Catalogue · design-system: design.md · designed-as-app */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";

import { BateriaCard } from "@/components/catalogo/bateria-card";
import { ConsultaModelo } from "@/components/catalogo/consulta-modelo";
import {
  CATALOGO,
  MARCAS,
  MARCA_SLUG,
  SLUG_MARCA,
  type Bateria,
  type Marca,
  rutaBateria,
} from "@/lib/catalogo";

// Copys tomados de la sección "Marcas" del sitio anterior (legacy/index.html).
const INFO_MARCA: Record<Marca, { desc: string; meta: string; logo: string }> = {
  "Power-Sonic": {
    desc: "Baterías selladas recargables. La línea más amplia del catálogo, de 2V a 12V.",
    meta: "VRLA · AGM · Ciclo profundo",
    logo: "/media/logo-powersonic.png",
  },
  Kaise: {
    desc: "Baterías selladas para seguridad, emergencia y aplicaciones de respaldo.",
    meta: "Respaldo · Seguridad",
    logo: "/media/logo-kaise.png",
  },
  Dynasty: {
    desc: "Alta potencia para sistemas UPS y respaldo de misión crítica.",
    meta: "UPS · Alta potencia",
    logo: "/media/logo-dynasty.png",
  },
  Genesis: {
    desc: "Baterías de alto desempeño para descarga rápida y arranque de equipos.",
    meta: "Alto desempeño",
    logo: "/media/logo-genesis.png",
  },
};

export function generateStaticParams() {
  return MARCAS.map((m) => ({ marca: MARCA_SLUG[m] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ marca: string }>;
}): Promise<Metadata> {
  const { marca: slug } = await params;
  const marca = SLUG_MARCA[slug];
  if (!marca) return { title: "Marca no encontrada" };

  const total = CATALOGO.filter((b) => b.marca === marca).length;
  return {
    title: `Baterías ${marca}`,
    description: `${INFO_MARCA[marca].desc} ${total} modelos disponibles con entrega de 24 a 48 horas.`,
  };
}

/** Agrupa los modelos de la marca por serie, conservando el orden del catálogo. */
function porSerie(baterias: Bateria[]) {
  const grupos = new Map<string, Bateria[]>();
  for (const b of baterias) {
    const actual = grupos.get(b.serie);
    if (actual) actual.push(b);
    else grupos.set(b.serie, [b]);
  }
  return [...grupos.entries()];
}

export default async function MarcaPage({
  params,
}: {
  params: Promise<{ marca: string }>;
}) {
  const { marca: slug } = await params;
  const marca = SLUG_MARCA[slug];
  if (!marca) notFound();

  const info = INFO_MARCA[marca];
  const modelos = CATALOGO.filter((b) => b.marca === marca);
  const series = porSerie(modelos);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      {/* Breadcrumb — phosphor voice */}
      <nav
        aria-label="Ruta de navegación"
        className="flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-2)]"
      >
        <Link href="/baterias" className="hover:text-[var(--color-ink)]">
          Baterías
        </Link>
        <CaretRightIcon className="size-3 text-[var(--color-ink-2)]" aria-hidden />
        <span className="text-[var(--color-ink)]">{marca}</span>
      </nav>

      {/* Hero corto oscuro — logo en la plate (la única superficie clara) */}
      <header className="hm-card mt-6 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-10 sm:p-8">
        <div className="hm-plate flex h-24 w-full shrink-0 items-center justify-center px-6 sm:w-56">
          <Image
            src={info.logo}
            alt={marca}
            width={480}
            height={160}
            priority
            className="h-auto max-h-16 w-auto max-w-full object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="hm-eyebrow">{info.meta}</p>
          <h1 className="hm-display mt-3 text-3xl sm:text-4xl">Baterías {marca}</h1>
          <p className="mt-3 max-w-2xl text-[var(--color-ink-2)]">{info.desc}</p>
          <p className="mt-4 font-mono text-sm tabular-nums text-[var(--color-accent)]">
            {modelos.length} {modelos.length === 1 ? "modelo" : "modelos"} en catálogo
          </p>
        </div>
      </header>

      {/* Índice por serie — eyebrow mono por banda */}
      <div className="mt-14 space-y-14">
        {series.map(([serie, items]) => (
          <section key={serie} aria-labelledby={`serie-${serie}`}>
            <div className="flex items-baseline justify-between gap-3 border-b border-[var(--border)] pb-3">
              <h2 id={`serie-${serie}`} className="hm-eyebrow text-sm">
                Serie {serie}
              </h2>
              <span className="font-mono text-xs tabular-nums text-[var(--color-ink-2)]">
                {items.length} {items.length === 1 ? "modelo" : "modelos"}
              </span>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((b) => (
                <BateriaCard key={b.id} bateria={b} href={rutaBateria(b)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16">
        <ConsultaModelo marca={marca} />
      </div>
    </div>
  );
}
