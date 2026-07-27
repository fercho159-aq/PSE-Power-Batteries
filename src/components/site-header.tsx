/* Hallmark · genre: atmospheric · nav: N5 floating pill · design-system: design.md · designed-as-app */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ListIcon, WhatsappLogoIcon } from "@phosphor-icons/react";

import { ListaMarcas, NavMarcas } from "@/components/nav-marcas";
import { CarritoSheet } from "@/components/carrito/carrito-sheet";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ENLACES = [
  { href: "/", etiqueta: "Inicio" },
  { href: "/calculadora", etiqueta: "Calculadora" },
  { href: "/#nosotros", etiqueta: "Nosotros" },
];

function Marca() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
    >
      <Image
        src="/media/logo-ps-final-1-03.png"
        alt="PSE Power Batteries"
        width={40}
        height={40}
        className="h-8 w-auto"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight text-[var(--color-ink)]">
          PSE
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-2)]">
          Power Batteries
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      {/* N5 · Floating pill — blurred over the dark canvas, blooms show through */}
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 rounded-full border border-[var(--border)] bg-[color-mix(in_oklch,var(--color-paper-2)_80%,transparent)] pl-4 pr-2 backdrop-blur-xl">
        <Marca />

        <nav
          aria-label="Navegación principal"
          className="ml-3 hidden items-center gap-0.5 md:flex"
        >
          <Button variant="ghost" asChild className="h-9 rounded-full text-sm">
            <Link href="/">Inicio</Link>
          </Button>
          <NavMarcas />
          <Button variant="ghost" asChild className="h-9 rounded-full text-sm">
            <Link href="/calculadora">Calculadora</Link>
          </Button>
          <Button variant="ghost" asChild className="h-9 rounded-full text-sm">
            <Link href="/#nosotros">Nosotros</Link>
          </Button>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <CarritoSheet />
          <Button
            asChild
            className="hidden h-9 rounded-full bg-[var(--color-wa)] font-medium text-[var(--color-wa-ink)] hover:brightness-110 sm:inline-flex"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener">
              <WhatsappLogoIcon className="size-4" weight="fill" />
              Cotiza
            </a>
          </Button>

          <Sheet open={menuAbierto} onOpenChange={setMenuAbierto}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
                aria-label="Abrir menú"
              >
                <ListIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm border-[var(--border)] bg-[var(--color-paper)]">
              <SheetHeader>
                <SheetTitle className="hm-eyebrow">Menú</SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Navegación principal"
                className="flex flex-col gap-1 px-4 pb-6"
              >
                <Link
                  href="/"
                  onClick={() => setMenuAbierto(false)}
                  className="rounded-md px-2 py-2 text-sm font-medium hover:bg-[var(--color-paper-2)]"
                >
                  Inicio
                </Link>

                <Accordion type="single" collapsible>
                  <AccordionItem value="baterias">
                    <AccordionTrigger className="px-2 text-sm font-medium">
                      Baterías
                    </AccordionTrigger>
                    <AccordionContent>
                      <ListaMarcas onNavegar={() => setMenuAbierto(false)} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {ENLACES.filter((e) => e.href !== "/").map((enlace) => (
                  <Link
                    key={enlace.href}
                    href={enlace.href}
                    onClick={() => setMenuAbierto(false)}
                    className="rounded-md px-2 py-2 text-sm font-medium hover:bg-[var(--color-paper-2)]"
                  >
                    {enlace.etiqueta}
                  </Link>
                ))}

                <Button
                  asChild
                  className="mt-4 rounded-full bg-[var(--color-wa)] font-medium text-[var(--color-wa-ink)] hover:brightness-110"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                    <WhatsappLogoIcon className="size-4" weight="fill" />
                    Cotiza sin costo por WhatsApp
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
