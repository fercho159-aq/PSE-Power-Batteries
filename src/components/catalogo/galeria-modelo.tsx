/* Hallmark · genre: atmospheric · macrostructure: Split Studio · design-system: design.md · designed-as-app */
"use client";

import { useState } from "react";
import Image from "next/image";

/** Placa de espécimen con vistas alternas: la foto grande y una tira de miniaturas. */
export function GaleriaModelo({
  imagenes,
  alt,
  marca,
}: {
  imagenes: string[];
  alt: string;
  marca: string;
}) {
  const [activa, setActiva] = useState(0);
  const principal = imagenes[activa] ?? imagenes[0];

  return (
    <div className="space-y-3">
      <div className="hm-plate relative flex aspect-square w-full items-center justify-center overflow-hidden">
        <Image
          key={principal}
          src={principal}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-contain p-8 sm:p-12"
        />
        <span className="absolute left-3 top-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-[var(--color-ink-2)]">
          {marca}
        </span>
        {imagenes.length > 1 && (
          <span className="absolute right-3 top-3 font-mono text-[0.7rem] tabular-nums text-[var(--color-ink-2)]">
            {activa + 1}/{imagenes.length}
          </span>
        )}
      </div>

      {imagenes.length > 1 && (
        <ul className="grid grid-cols-5 gap-2" aria-label="Vistas del producto">
          {imagenes.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActiva(i)}
                aria-label={`Ver vista ${i + 1} de ${imagenes.length}`}
                aria-current={i === activa}
                className={`hm-plate relative block aspect-square w-full overflow-hidden transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] ${
                  i === activa
                    ? "ring-2 ring-[var(--color-accent)]"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain p-1.5"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
