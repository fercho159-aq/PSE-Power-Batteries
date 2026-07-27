/* Hallmark · genre: atmospheric · design-system: design.md · designed-as-app */
"use client";

import * as React from "react";
import { MinusIcon, PlusIcon, ShoppingCartSimpleIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Bateria } from "@/lib/catalogo";
import { useCarrito } from "@/components/carrito/carrito-context";

type BotonAgregarProps = {
  bateria: Bateria;
  /** Muestra el selector - / cantidad / + antes del botón (ficha de producto). */
  mostrarCantidad?: boolean;
  className?: string;
};

export function BotonAgregar({
  bateria,
  mostrarCantidad = false,
  className,
}: BotonAgregarProps) {
  const { agregar, abrir } = useCarrito();
  const [cantidad, setCantidad] = React.useState(1);

  function handleAgregar(evento: React.MouseEvent<HTMLButtonElement>) {
    // La tarjeta suele venir envuelta en un <Link>: agregar no debe navegar.
    evento.preventDefault();
    evento.stopPropagation();
    agregar(bateria, cantidad);
    setCantidad(1);
    toast.success("Agregada al pedido", {
      description: `${bateria.marca} ${bateria.modelo} · ${bateria.volt}V ${bateria.ah}Ah`,
      action: { label: "Ver pedido", onClick: abrir },
    });
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {mostrarCantidad && (
        <div className="flex items-center rounded-full border border-[var(--border)] bg-[var(--color-paper-3)]">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full text-[var(--color-ink-2)] hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)] disabled:opacity-40"
            aria-label="Quitar una unidad"
            disabled={cantidad <= 1}
            onClick={(e) => {
              e.preventDefault();
              setCantidad((c) => Math.max(1, c - 1));
            }}
          >
            <MinusIcon />
          </Button>
          <span
            className="w-8 text-center font-mono text-xs tabular-nums text-[var(--color-ink)]"
            aria-live="polite"
          >
            {cantidad}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-full text-[var(--color-ink-2)] hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            aria-label="Agregar una unidad"
            onClick={(e) => {
              e.preventDefault();
              setCantidad((c) => Math.min(99, c + 1));
            }}
          >
            <PlusIcon />
          </Button>
        </div>
      )}

      <Button
        type="button"
        onClick={handleAgregar}
        className="h-10 flex-1 rounded-full px-4 text-sm font-semibold focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
      >
        <ShoppingCartSimpleIcon data-icon="inline-start" />
        Agregar al pedido
      </Button>
    </div>
  );
}
