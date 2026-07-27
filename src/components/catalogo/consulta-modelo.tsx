/* Hallmark · genre: atmospheric · macrostructure: Catalogue · design-system: design.md · designed-as-app */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  MagnifyingGlassIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buscar } from "@/lib/buscar";
import { linkConsulta } from "@/lib/whatsapp";
import { rutaBateria, type Bateria, type Marca } from "@/lib/catalogo";

/**
 * Bloque "¿No encuentras la batería que buscas?" (pedido explícito del cliente).
 * Sugiere modelos de la marca actual; si no hay coincidencias, ofrece
 * equivalentes de otras marcas. Siempre deja a la mano el botón de WhatsApp.
 */
export function ConsultaModelo({ marca }: { marca: Marca }) {
  const [consulta, setConsulta] = useState("");

  const { propias, otras } = useMemo(() => {
    const q = consulta.trim();
    if (q.length < 2) return { propias: [] as Bateria[], otras: [] as Bateria[] };
    const resultados = buscar(q);
    return {
      propias: resultados.filter((b) => b.marca === marca).slice(0, 6),
      otras: resultados.filter((b) => b.marca !== marca).slice(0, 6),
    };
  }, [consulta, marca]);

  const hayConsulta = consulta.trim().length >= 2;
  const sinCoincidencias = hayConsulta && propias.length === 0 && otras.length === 0;

  const textoWhatsApp = hayConsulta
    ? `Hola, busco la batería ${marca} "${consulta.trim()}". ¿La tienen disponible?`
    : `Hola, busco una batería ${marca} que no veo en el catálogo. ¿Me ayudan?`;

  return (
    <section className="hm-card p-6 sm:p-8">
      <p className="hm-eyebrow">Consulta directa</p>
      <h2 className="hm-display mt-3 text-2xl sm:text-3xl">
        ¿No encuentras la batería que buscas?
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-2)]">
        Escribe el modelo o las características (por ejemplo &quot;12v 7ah&quot; o
        &quot;PS 1270&quot;) y te decimos al momento si la tenemos en exhibición.
      </p>

      <div className="mt-6 max-w-xl">
        <div className="relative">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-ink-2)]"
            aria-hidden
          />
          <Input
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder={`Modelo o características de ${marca}`}
            aria-label={`Buscar un modelo de ${marca}`}
            className="h-12 rounded-full bg-[var(--color-paper-3)] pl-10 font-mono text-sm"
          />
        </div>
      </div>

      {hayConsulta && (
        <div className="mt-6 space-y-6">
          {propias.length > 0 && (
            <div>
              <p className="hm-eyebrow text-[0.7rem] text-[var(--color-ink-2)]">
                Sí lo manejamos en {marca}
              </p>
              <ul className="mt-3 space-y-2">
                {propias.map((b) => (
                  <li key={b.id}>
                    <FilaSugerencia bateria={b} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {propias.length === 0 && otras.length > 0 && (
            <div>
              <p className="hm-eyebrow text-[0.7rem] text-[var(--color-ink-2)]">
                No lo tenemos en {marca}, pero sí en otras marcas
              </p>
              <ul className="mt-3 space-y-2">
                {otras.map((b) => (
                  <li key={b.id}>
                    <FilaSugerencia bateria={b} mostrarMarca />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sinCoincidencias && (
            <p className="text-sm text-[var(--color-ink-2)]">
              No encontramos coincidencias en el catálogo en línea. Muchas veces la
              conseguimos por pedido: mándanos el modelo por WhatsApp y te confirmamos
              disponibilidad y tiempo de entrega.
            </p>
          )}
        </div>
      )}

      <Button
        asChild
        size="lg"
        className="mt-7 h-12 rounded-full bg-[var(--color-wa)] px-6 text-sm font-semibold text-[var(--color-wa-ink)] hover:brightness-110"
      >
        <a href={linkConsulta(textoWhatsApp)} target="_blank" rel="noopener noreferrer">
          <WhatsappLogoIcon weight="fill" aria-hidden />
          Preguntar por WhatsApp
        </a>
      </Button>
    </section>
  );
}

function FilaSugerencia({
  bateria,
  mostrarMarca = false,
}: {
  bateria: Bateria;
  mostrarMarca?: boolean;
}) {
  return (
    <Link
      href={rutaBateria(bateria)}
      className="group flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--color-paper-3)] px-4 py-3 transition-colors hover:border-[oklch(76.2%_0.16_66/0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
    >
      <span className="min-w-0 truncate font-mono text-sm text-[var(--color-ink)]">
        {mostrarMarca ? `${bateria.marca} · ` : ""}
        {bateria.modelo}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <span className="font-mono text-xs tabular-nums text-[var(--color-accent)]">
          {bateria.volt}V · {bateria.ah}Ah
        </span>
        <ArrowUpRightIcon
          size={14}
          weight="bold"
          className="shrink-0 text-[var(--color-ink-2)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
        />
      </span>
    </Link>
  );
}
