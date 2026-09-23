/* Hallmark · genre: editorial · page: blog índice · design-system: design.md */
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { ARTICULOS, formatearFecha } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guías sobre baterías selladas VRLA/AGM: cómo elegirlas, cuándo reemplazarlas y qué usar en no-break, alarmas, equipo médico y movilidad eléctrica.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <header className="max-w-2xl">
        <p className="hm-eyebrow">Blog</p>
        <h1 className="hm-display mt-3 text-[clamp(2rem,5vw,3.25rem)]">
          Guías de baterías selladas
        </h1>
        <p className="mt-4 text-[var(--color-ink-2)]">
          Cómo elegir, instalar y reemplazar baterías para equipo que no puede
          apagarse.
        </p>
      </header>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICULOS.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/blog/${a.slug}`}
              className="hm-card flex h-full flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            >
              <div className="relative aspect-[16/9] bg-[var(--color-paper-3)]">
                <Image
                  src={a.imagen.src}
                  alt={a.imagen.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="font-mono text-xs text-[var(--color-ink-2)]">
                  {a.categoria} · {formatearFecha(a.fecha)} · {a.minutosLectura} min
                </p>
                <h2 className="text-lg font-semibold leading-snug text-[var(--color-ink)]">
                  {a.titulo}
                </h2>
                <p className="text-sm text-[var(--color-ink-2)]">{a.descripcion}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
