/* Hallmark · genre: atmospheric · macrostructure: Catalogue · design-system: design.md · designed-as-app */
import type { Metadata } from "next";

import { FiltrosCatalogo } from "@/components/catalogo/filtros-catalogo";
import { CATALOGO, MARCAS } from "@/lib/catalogo";

export const metadata: Metadata = {
  title: "Catálogo de baterías",
  description:
    "Catálogo completo de baterías selladas: Power-Sonic, Kaise, Dynasty y Genesis. Filtra por marca, tipo y capacidad, o busca tu modelo directamente.",
};

export default function BateriasPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Catalogue · cabecera de inventario */}
      <header className="mb-10 max-w-3xl">
        <p className="hm-eyebrow">Inventario</p>
        <h1 className="hm-display mt-4 text-[clamp(2.25rem,5vw+0.5rem,3.75rem)]">
          El catálogo completo, sin descargar nada
        </h1>
        <p className="mt-5 font-mono text-sm tracking-wide text-[var(--color-ink-2)] tabular-nums">
          {CATALOGO.length} modelos · {MARCAS.length} marcas ·{" "}
          <span className="text-[var(--color-ink)]">{MARCAS.join(" · ")}</span>
        </p>
        <p className="mt-4 max-w-xl text-base text-[var(--color-ink-2)]">
          Busca por modelo (PS 1270), por marca o por características (12v 7ah) y
          agrega al pedido para cotizar por WhatsApp.
        </p>
      </header>

      <FiltrosCatalogo />
    </div>
  );
}
