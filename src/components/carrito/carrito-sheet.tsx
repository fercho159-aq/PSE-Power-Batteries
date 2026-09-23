/* Hallmark · genre: atmospheric · design-system: design.md · designed-as-app */
"use client";

import Link from "next/link";
import {
  MinusIcon,
  PlusIcon,
  ShoppingCartSimpleIcon,
  TrashIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { sendGAEvent } from "@next/third-parties/google";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { linkPedido } from "@/lib/whatsapp";
import { useCarrito } from "@/components/carrito/carrito-context";

export function CarritoSheet() {
  const {
    items,
    total,
    quitar,
    setCantidad,
    limpiar,
    abierto,
    setAbierto,
  } = useCarrito();

  function enviarPorWhatsApp() {
    sendGAEvent("event", "enviar_pedido", {
      productos: items.length,
      piezas: total,
    });
    window.open(linkPedido(items), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative rounded-full text-[var(--color-ink)] hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
        aria-label={`Ver pedido (${total} ${total === 1 ? "batería" : "baterías"})`}
        onClick={() => setAbierto(true)}
      >
        <ShoppingCartSimpleIcon />
        {total > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-accent)] px-1 font-mono text-[10px] leading-none font-medium tabular-nums text-[var(--color-accent-ink)]">
            {total > 99 ? "99+" : total}
          </span>
        )}
      </Button>

      <Sheet open={abierto} onOpenChange={setAbierto}>
        <SheetContent
          side="right"
          className="w-full border-[var(--border)] bg-[var(--color-paper)] sm:max-w-md"
        >
          <SheetHeader>
            <SheetTitle className="hm-display text-xl">Tu pedido</SheetTitle>
            <SheetDescription className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-ink-2)]">
              {total > 0
                ? `${total} ${total === 1 ? "batería" : "baterías"} en la lista`
                : "Todavía no agregas baterías"}
            </SheetDescription>
          </SheetHeader>

          <Separator className="bg-[var(--border)]" />

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <ShoppingCartSimpleIcon className="size-8 text-[var(--color-ink-2)]" />
              <p className="text-xs/relaxed text-[var(--color-ink-2)]">
                Tu pedido está vacío. Arma tu lista desde el catálogo y te
                cotizamos por WhatsApp.
              </p>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-[var(--border)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
              >
                <Link href="/baterias" onClick={() => setAbierto(false)}>
                  Ver catálogo
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="flex-1 divide-y divide-[var(--border)] overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[var(--color-ink)]">
                        {item.modelo}
                      </p>
                      <p className="font-mono text-[11px] tabular-nums text-[var(--color-ink-2)]">
                        {item.marca}
                        {item.volt != null && item.ah != null
                          ? ` · ${item.volt}V ${item.ah}Ah`
                          : ""}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full text-[var(--color-ink-2)] hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                      aria-label={`Eliminar ${item.modelo} del pedido`}
                      onClick={() => quitar(item.id)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>

                  <div className="flex items-center self-start rounded-full border border-[var(--border)] bg-[var(--color-paper-3)]">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full text-[var(--color-ink-2)] hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                      aria-label={`Quitar una unidad de ${item.modelo}`}
                      onClick={() => setCantidad(item.id, item.cantidad - 1)}
                    >
                      <MinusIcon />
                    </Button>
                    <span className="w-8 text-center font-mono text-xs tabular-nums text-[var(--color-ink)]">
                      {item.cantidad}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="rounded-full text-[var(--color-ink-2)] hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                      aria-label={`Agregar una unidad de ${item.modelo}`}
                      onClick={() => setCantidad(item.id, item.cantidad + 1)}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <SheetFooter>
              <Button
                type="button"
                onClick={enviarPorWhatsApp}
                size="lg"
                className="h-11 w-full rounded-full bg-[var(--color-wa)] text-sm font-semibold text-[var(--color-wa-ink)] hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
              >
                <WhatsappLogoIcon data-icon="inline-start" weight="fill" />
                Enviar pedido por WhatsApp
              </Button>
              <p className="text-center font-mono text-[11px] text-[var(--color-ink-2)]">
                Te confirmamos disponibilidad y precio por WhatsApp.
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full rounded-full text-[var(--color-ink-2)] hover:text-[var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
                onClick={limpiar}
              >
                Vaciar
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
