"use client";

import Link from "next/link";
import { CaretDownIcon } from "@phosphor-icons/react";

import { CATALOGO, MARCAS, MARCA_SLUG, type Marca } from "@/lib/catalogo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/** Modelos por marca, calculado una sola vez al cargar el módulo. */
const CONTEO: Record<Marca, number> = MARCAS.reduce(
  (acc, marca) => {
    acc[marca] = CATALOGO.filter((b) => b.marca === marca).length;
    return acc;
  },
  {} as Record<Marca, number>
);

export type MarcaEnlace = {
  marca: Marca;
  slug: string;
  href: string;
  modelos: number;
};

/** Lista de marcas con su ruta y conteo de modelos. Reutilizable por header y footer. */
export const MARCAS_NAV: MarcaEnlace[] = MARCAS.map((marca) => ({
  marca,
  slug: MARCA_SLUG[marca],
  href: `/baterias/${MARCA_SLUG[marca]}`,
  modelos: CONTEO[marca],
}));

/** Menú desplegable de marcas (pedido explícito del cliente). */
export function NavMarcas({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className={cn("text-sm font-medium", className)}
        >
          Baterías
          <CaretDownIcon className="size-3.5 opacity-70" weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {MARCAS_NAV.map(({ marca, href, modelos }) => (
          <DropdownMenuItem key={marca} asChild>
            <Link href={href} className="flex items-center justify-between gap-4">
              <span>{marca}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {modelos} modelos
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/baterias" className="font-medium text-primary">
            Ver todo el catálogo
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Versión en lista para el menú móvil o el pie de página. */
export function ListaMarcas({
  className,
  onNavegar,
}: {
  className?: string;
  onNavegar?: () => void;
}) {
  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {MARCAS_NAV.map(({ marca, href, modelos }) => (
        <li key={marca}>
          <Link
            href={href}
            onClick={onNavegar}
            className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
          >
            <span>{marca}</span>
            <span className="font-mono text-xs text-muted-foreground">
              {modelos} modelos
            </span>
          </Link>
        </li>
      ))}
      <li>
        <Link
          href="/baterias"
          onClick={onNavegar}
          className="flex rounded-md px-2 py-2 text-sm font-medium text-primary hover:bg-muted"
        >
          Ver todo el catálogo
        </Link>
      </li>
    </ul>
  );
}
