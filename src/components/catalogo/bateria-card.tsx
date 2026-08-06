/* Hallmark · genre: atmospheric · macrostructure: Catalogue · design-system: design.md · designed-as-app */
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, BatteryHighIcon } from "@phosphor-icons/react/dist/ssr";

import { BotonAgregar } from "@/components/carrito/boton-agregar";
import { rutaBateria, type Bateria } from "@/lib/catalogo";

export { rutaBateria };

export function BateriaCard({ bateria, href }: { bateria: Bateria; href?: string }) {
  const destino = href ?? rutaBateria(bateria);

  return (
    <article className="hm-card group flex h-full flex-col overflow-hidden">
      <Link
        href={destino}
        className="flex flex-1 flex-col gap-4 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
      >
        {/* The one bright surface — specimen plate */}
        <div className="hm-plate relative flex h-56 items-center justify-center overflow-hidden sm:h-64">
          {bateria.imagen ? (
            <Image
              src={bateria.imagen}
              alt={`Batería ${bateria.marca} ${bateria.modelo}`}
              fill
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <BatteryHighIcon size={40} weight="duotone" className="text-[var(--color-paper-3)]" />
          )}
          <span className="absolute left-2 top-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-[var(--color-ink-2)]">
            {bateria.marca}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <h3 className="hm-display text-lg">{bateria.modelo}</h3>
            <p className="font-mono text-sm tabular-nums text-[var(--color-accent)]">
              {bateria.volt}V · {bateria.ah}Ah
            </p>
          </div>
          <ArrowUpRightIcon
            size={16}
            weight="bold"
            className="mt-1 shrink-0 text-[var(--color-ink-2)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
          />
        </div>

        <dl className="mt-auto space-y-0.5 font-mono text-[0.7rem] text-[var(--color-ink-2)]">
          <div>
            <dt className="sr-only">Tipo</dt>
            <dd className="text-[var(--color-ink)]">{bateria.tipo}</dd>
          </div>
          {bateria.medidas && (
            <div>
              <dt className="sr-only">Medidas</dt>
              <dd className="tabular-nums">{bateria.medidas}</dd>
            </div>
          )}
          {bateria.peso !== null && (
            <div>
              <dt className="sr-only">Peso</dt>
              <dd className="tabular-nums">{bateria.peso} kg</dd>
            </div>
          )}
        </dl>
      </Link>

      <div className="border-t border-[var(--border)] p-3">
        <BotonAgregar bateria={bateria} />
      </div>
    </article>
  );
}
