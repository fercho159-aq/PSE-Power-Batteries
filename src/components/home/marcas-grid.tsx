import Image from "next/image";
import Link from "next/link";

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
    desc: "La línea más amplia del catálogo, de 2 V a 12 V.",
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
    <section className="border-t border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Marcas</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Proveedores de primera línea
          </h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FICHAS.map((f) => (
            <Link
              key={f.marca}
              href={`/baterias/${MARCA_SLUG[f.marca]}`}
              className="group flex flex-col justify-between gap-6 border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="flex h-16 items-center">
                <Image
                  src={f.logo}
                  alt={f.marca}
                  width={220}
                  height={64}
                  className="h-auto max-h-16 w-auto object-contain"
                />
              </div>
              <div>
                <p className="text-sm text-card-foreground">{f.desc}</p>
                <p className="mt-3 text-xs text-muted-foreground">{f.meta}</p>
                <p className="mt-4 text-xs text-primary group-hover:underline">
                  {contarModelos(f.marca)} modelos
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
