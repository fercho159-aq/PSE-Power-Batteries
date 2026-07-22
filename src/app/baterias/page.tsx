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
      <header className="mb-10 max-w-3xl space-y-4">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">Catálogo</p>
        <h1 className="text-3xl font-semibold text-balance sm:text-4xl">
          Todas nuestras baterías, sin descargar nada
        </h1>
        <p className="text-base text-muted-foreground">
          {CATALOGO.length} modelos de {MARCAS.length} marcas: {MARCAS.join(", ")}. Busca por modelo
          (PS 1270), por marca o por características (12v 7ah) y agrega al carrito para cotizar por
          WhatsApp.
        </p>
      </header>

      <FiltrosCatalogo />
    </div>
  );
}
