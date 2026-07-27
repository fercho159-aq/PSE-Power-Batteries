/* Hallmark · genre: atmospheric · macrostructure: Split Studio · design-system: design.md · designed-as-app */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowSquareOutIcon,
  BatteryHighIcon,
  CaretRightIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import { BateriaCard } from "@/components/catalogo/bateria-card";
import { BotonAgregar } from "@/components/carrito/boton-agregar";
import { Button } from "@/components/ui/button";
import { equivalentes } from "@/lib/buscar";
import { linkConsulta } from "@/lib/whatsapp";
import {
  CATALOGO,
  MARCA_SLUG,
  SLUG_MARCA,
  rutaBateria,
  slugModelo,
  type Bateria,
} from "@/lib/catalogo";

/** El slug del modelo es el id de la batería sin el prefijo "<slug-marca>-". */
function buscarBateria(slugMarca: string, slug: string): Bateria | undefined {
  const marca = SLUG_MARCA[slugMarca];
  if (!marca) return undefined;
  return CATALOGO.find((b) => b.marca === marca && slugModelo(b) === slug);
}

export function generateStaticParams() {
  return CATALOGO.map((b) => ({
    marca: MARCA_SLUG[b.marca],
    modelo: slugModelo(b),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ marca: string; modelo: string }>;
}): Promise<Metadata> {
  const { marca, modelo } = await params;
  const bateria = buscarBateria(marca, modelo);
  if (!bateria) return { title: "Modelo no encontrado" };

  return {
    title: `${bateria.marca} ${bateria.modelo} — ${bateria.volt}V ${bateria.ah}Ah`,
    description: `Batería ${bateria.marca} ${bateria.modelo}: ${bateria.volt} V, ${bateria.ah} Ah, ${bateria.tipo}. Cotiza por WhatsApp con entrega de 24 a 48 horas.`,
  };
}

export default async function ModeloPage({
  params,
}: {
  params: Promise<{ marca: string; modelo: string }>;
}) {
  const { marca: slugMarca, modelo: slug } = await params;
  const bateria = buscarBateria(slugMarca, slug);
  if (!bateria) notFound();

  // Por si `equivalentes` incluye la propia batería, la descartamos.
  const similares = equivalentes(bateria)
    .filter((b) => b.id !== bateria.id)
    .slice(0, 6);

  const especificaciones: { etiqueta: string; valor: string | null }[] = [
    { etiqueta: "Voltaje", valor: `${bateria.volt} V` },
    { etiqueta: "Capacidad", valor: `${bateria.ah} Ah` },
    { etiqueta: "Tipo", valor: bateria.tipo },
    { etiqueta: "Medidas (L × An × Al)", valor: bateria.medidas },
    { etiqueta: "Peso", valor: bateria.peso !== null ? `${bateria.peso} kg` : null },
    { etiqueta: "Terminal", valor: bateria.terminal },
    { etiqueta: "Serie", valor: bateria.serie },
  ];

  const textoWhatsApp = `Hola, me interesa la batería ${bateria.marca} ${bateria.modelo} (${bateria.volt}V ${bateria.ah}Ah). ¿La tienen disponible?`;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
      {/* Breadcrumb — phosphor voice */}
      <nav
        aria-label="Ruta de navegación"
        className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[var(--color-ink-2)]"
      >
        <Link href="/baterias" className="hover:text-[var(--color-ink)]">
          Baterías
        </Link>
        <CaretRightIcon className="size-3 text-[var(--color-ink-2)]" aria-hidden />
        <Link href={`/baterias/${slugMarca}`} className="hover:text-[var(--color-ink)]">
          {bateria.marca}
        </Link>
        <CaretRightIcon className="size-3 text-[var(--color-ink-2)]" aria-hidden />
        <span className="text-[var(--color-ink)]">{bateria.modelo}</span>
      </nav>

      {/* Split Studio — díptico: imagen / specs */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
        {/* Mitad imagen — la única superficie clara, montada como espécimen */}
        <div className="lg:sticky lg:top-24">
          <div className="hm-plate relative flex aspect-square w-full items-center justify-center overflow-hidden">
            {bateria.imagen ? (
              <Image
                src={bateria.imagen}
                alt={`Batería ${bateria.marca} ${bateria.modelo}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain p-8 sm:p-12"
              />
            ) : (
              <BatteryHighIcon
                size={80}
                weight="duotone"
                className="text-[var(--color-paper-3)]"
              />
            )}
            <span className="absolute left-3 top-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-ink-2)]">
              {bateria.marca}
            </span>
          </div>
        </div>

        {/* Mitad specs — encabezado + tabla + acciones */}
        <div>
          <header>
            <p className="hm-eyebrow">
              {bateria.marca} · Serie {bateria.serie}
            </p>
            <h1 className="hm-display mt-3 text-[clamp(2rem,5vw,3.25rem)]">
              {bateria.modelo}
            </h1>
            <p className="mt-3 text-[var(--color-ink-2)]">{bateria.tipo}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--color-paper-3)] px-3.5 py-1.5 font-mono text-sm tabular-nums text-[var(--color-accent)]">
                {bateria.volt} V
              </span>
              <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--color-paper-3)] px-3.5 py-1.5 font-mono text-sm tabular-nums text-[var(--color-accent)]">
                {bateria.ah} Ah
              </span>
            </div>
          </header>

          {/* Tabla de especificaciones — tarjeta oscura, bordes low-alpha */}
          <section aria-labelledby="especificaciones" className="mt-8">
            <h2 id="especificaciones" className="hm-eyebrow text-sm">
              Especificaciones
            </h2>
            <dl className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--color-paper-2)]">
              {especificaciones.map((fila) => (
                <div
                  key={fila.etiqueta}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-[var(--border)] px-4 py-3 text-sm last:border-b-0"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-ink-2)]">
                    {fila.etiqueta}
                  </dt>
                  <dd className="text-right font-mono tabular-nums text-[var(--color-ink)]">
                    {fila.valor ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Acciones — pedido (royal) + WhatsApp (verde) */}
          <div className="mt-6 flex flex-col gap-3">
            <BotonAgregar bateria={bateria} mostrarCantidad />
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[var(--color-wa)] px-6 text-sm font-semibold text-[var(--color-wa-ink)] hover:brightness-110"
            >
              <a
                href={linkConsulta(textoWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogoIcon weight="fill" aria-hidden />
                Preguntar por WhatsApp
              </a>
            </Button>
          </div>

          <p className="mt-5 text-xs text-[var(--color-ink-2)]">
            La disponibilidad se confirma por WhatsApp. Si no la tenemos en
            existencia, la conseguimos por pedido y te decimos el tiempo de
            entrega.
          </p>
          {bateria.fuente && (
            <a
              href={bateria.fuente}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-ink-2)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            >
              Ficha técnica original
              <ArrowSquareOutIcon className="size-3" aria-hidden />
            </a>
          )}
        </div>
      </div>

      {similares.length > 0 && (
        <section className="mt-20" aria-labelledby="equivalentes">
          <div className="flex items-baseline justify-between gap-3 border-b border-[var(--border)] pb-3">
            <h2 id="equivalentes" className="hm-eyebrow text-sm">
              Modelos equivalentes
            </h2>
            <span className="font-mono text-xs tabular-nums text-[var(--color-ink-2)]">
              {bateria.volt}V · ~{bateria.ah}Ah
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-2)]">
            Mismo voltaje y capacidad parecida, por si buscas una alternativa.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similares.map((b) => (
              <BateriaCard key={b.id} bateria={b} href={rutaBateria(b)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
