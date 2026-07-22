"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, WhatsappLogo } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    <section className="border border-border bg-card p-6 sm:p-8">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Consulta directa
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-card-foreground">
        ¿No encuentras la batería que buscas?
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Escribe el modelo o las características (por ejemplo &quot;12v 7ah&quot; o
        &quot;PS 1270&quot;) y te decimos al momento si la tenemos en exhibición.
      </p>

      <div className="mt-5 flex max-w-xl items-center gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder={`Modelo o características de ${marca}`}
            aria-label={`Buscar un modelo de ${marca}`}
            className="pl-8"
          />
        </div>
      </div>

      {hayConsulta && (
        <div className="mt-6 space-y-6">
          {propias.length > 0 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
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
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
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
            <p className="text-sm text-muted-foreground">
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
        className="mt-6 bg-[var(--pse-green)] text-white hover:bg-[var(--pse-green)]/85"
      >
        <a href={linkConsulta(textoWhatsApp)} target="_blank" rel="noopener noreferrer">
          <WhatsappLogo weight="fill" aria-hidden />
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
      className="flex items-center justify-between gap-3 border border-border px-3 py-2 transition-colors hover:bg-muted"
    >
      <span className="font-mono text-sm text-card-foreground">
        {mostrarMarca ? `${bateria.marca} · ` : ""}
        {bateria.modelo}
      </span>
      <span className="flex shrink-0 gap-1.5">
        <Badge variant="outline" className="font-mono">
          {bateria.volt} V
        </Badge>
        <Badge variant="outline" className="font-mono">
          {bateria.ah} Ah
        </Badge>
      </span>
    </Link>
  );
}
