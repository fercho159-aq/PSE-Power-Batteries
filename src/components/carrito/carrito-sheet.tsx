"use client";

import Link from "next/link";
import {
  MinusIcon,
  PlusIcon,
  ShoppingCartSimpleIcon,
  TrashIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";

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
    window.open(linkPedido(items), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative"
        aria-label={`Ver pedido (${total} ${total === 1 ? "batería" : "baterías"})`}
        onClick={() => setAbierto(true)}
      >
        <ShoppingCartSimpleIcon />
        {total > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center bg-accent px-1 text-[10px] leading-none font-medium tabular-nums text-accent-foreground">
            {total > 99 ? "99+" : total}
          </span>
        )}
      </Button>

      <Sheet open={abierto} onOpenChange={setAbierto}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Tu pedido</SheetTitle>
            <SheetDescription>
              {total > 0
                ? `${total} ${total === 1 ? "batería" : "baterías"} en la lista`
                : "Todavía no agregas baterías"}
            </SheetDescription>
          </SheetHeader>

          <Separator />

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <ShoppingCartSimpleIcon className="size-8 text-muted-foreground" />
              <p className="text-xs/relaxed text-muted-foreground">
                Tu pedido está vacío. Arma tu lista desde el catálogo y te
                cotizamos por WhatsApp.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/baterias" onClick={() => setAbierto(false)}>
                  Ver catálogo
                </Link>
              </Button>
            </div>
          ) : (
            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground">
                        {item.modelo}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
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
                      aria-label={`Eliminar ${item.modelo} del pedido`}
                      onClick={() => quitar(item.id)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>

                  <div className="flex items-center border border-border self-start">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Quitar una unidad de ${item.modelo}`}
                      onClick={() => setCantidad(item.id, item.cantidad - 1)}
                    >
                      <MinusIcon />
                    </Button>
                    <span className="w-8 text-center text-xs tabular-nums">
                      {item.cantidad}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
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
                className="w-full bg-[var(--pse-green)] text-white hover:bg-[var(--pse-green)]/85"
              >
                <WhatsappLogoIcon data-icon="inline-start" weight="fill" />
                Enviar pedido por WhatsApp
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Te confirmamos disponibilidad y precio por WhatsApp.
              </p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full"
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
