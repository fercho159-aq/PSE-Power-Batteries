import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

import { BateriaCard } from "@/components/catalogo/bateria-card";
import { ConsultaModelo } from "@/components/catalogo/consulta-modelo";
import { Separator } from "@/components/ui/separator";
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
      <nav
        aria-label="Ruta de navegación"
        className="flex items-center gap-1 font-mono text-xs text-muted-foreground"
      >
        <Link href="/baterias" className="hover:text-foreground">
          Baterías
        </Link>
        <CaretRight className="size-3" aria-hidden />
        <span className="text-foreground">{marca}</span>
      </nav>

      <header className="mt-6 flex flex-col gap-6 border border-border bg-card p-6 sm:flex-row sm:items-center sm:gap-10 sm:p-8">
        <div className="flex h-20 w-48 shrink-0 items-center">
          <Image
            src={info.logo}
            alt={marca}
            width={480}
            height={160}
            priority
            className="h-auto max-h-20 w-auto max-w-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-card-foreground sm:text-4xl">
            Baterías {marca}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">{info.desc}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-accent">
            {info.meta} · {modelos.length} modelos
          </p>
        </div>
      </header>

      <div className="mt-12 space-y-12">
        {series.map(([serie, items]) => (
          <section key={serie} aria-labelledby={`serie-${serie}`}>
            <div className="flex items-baseline gap-3">
              <h2
                id={`serie-${serie}`}
                className="font-mono text-lg font-semibold uppercase tracking-widest text-foreground"
              >
                Serie {serie}
              </h2>
              <span className="font-mono text-xs text-muted-foreground">
                {items.length} {items.length === 1 ? "modelo" : "modelos"}
              </span>
            </div>
            <Separator className="mt-3" />
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((b) => (
                <BateriaCard
                  key={b.id}
                  bateria={b}
                  href={rutaBateria(b)}
                />
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
