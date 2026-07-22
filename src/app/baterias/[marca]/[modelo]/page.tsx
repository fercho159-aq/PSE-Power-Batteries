import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowSquareOut, CaretRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

import { BateriaCard } from "@/components/catalogo/bateria-card";
import { BotonAgregar } from "@/components/carrito/boton-agregar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
      <nav
        aria-label="Ruta de navegación"
        className="flex flex-wrap items-center gap-1 font-mono text-xs text-muted-foreground"
      >
        <Link href="/baterias" className="hover:text-foreground">
          Baterías
        </Link>
        <CaretRight className="size-3" aria-hidden />
        <Link href={`/baterias/${slugMarca}`} className="hover:text-foreground">
          {bateria.marca}
        </Link>
        <CaretRight className="size-3" aria-hidden />
        <span className="text-foreground">{bateria.modelo}</span>
      </nav>

      <div className="mt-6 grid gap-8 sm:grid-cols-[minmax(0,320px)_1fr] sm:items-center">
        {bateria.imagen && (
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-white">
            <Image
              src={bateria.imagen}
              alt={`Batería ${bateria.marca} ${bateria.modelo}`}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-contain p-6"
            />
          </div>
        )}

      <header>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          {bateria.marca} · Serie {bateria.serie}
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{bateria.modelo}</h1>
        <p className="mt-2 text-muted-foreground">{bateria.tipo}</p>
        <div className="mt-4 flex gap-2">
          <Badge className="font-mono">{bateria.volt} V</Badge>
          <Badge className="font-mono">{bateria.ah} Ah</Badge>
        </div>
      </header>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="especificaciones">
          <h2 id="especificaciones" className="text-xl font-semibold">
            Especificaciones
          </h2>
          <Separator className="mt-3" />
          <dl className="mt-4 divide-y divide-border border border-border">
            {especificaciones.map((fila) => (
              <div
                key={fila.etiqueta}
                className="grid grid-cols-2 gap-4 px-4 py-3 text-sm"
              >
                <dt className="text-muted-foreground">{fila.etiqueta}</dt>
                <dd className="font-mono text-foreground">{fila.valor ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </section>

        <aside className="h-fit border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Agrega la cantidad que necesitas y termina tu pedido por WhatsApp.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <BotonAgregar bateria={bateria} mostrarCantidad />
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[var(--pse-green)] text-[var(--pse-green)] hover:bg-[var(--pse-green)]/10 hover:text-[var(--pse-green)]"
            >
              <a
                href={linkConsulta(textoWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogo weight="fill" aria-hidden />
                Preguntar por WhatsApp
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            La disponibilidad se confirma por WhatsApp. Si no la tenemos en existencia,
            la conseguimos por pedido y te decimos el tiempo de entrega.
          </p>
          {bateria.fuente && (
            <a
              href={bateria.fuente}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Ficha técnica original
              <ArrowSquareOut className="size-3" aria-hidden />
            </a>
          )}
        </aside>
      </div>

      {similares.length > 0 && (
        <section className="mt-16" aria-labelledby="equivalentes">
          <h2 id="equivalentes" className="text-xl font-semibold">
            Modelos equivalentes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Mismo voltaje y capacidad parecida, por si buscas una alternativa.
          </p>
          <Separator className="mt-3" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similares.map((b) => (
              <BateriaCard
                key={b.id}
                bateria={b}
                href={rutaBateria(b)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
