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
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        src="/media/logo-ps-final-1-03.png"
        alt="PSE Power Batteries"
        width={40}
        height={40}
        className="h-9 w-auto"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-base font-semibold tracking-wide">
          PSE
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Power Batteries
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Barra de promoción del sitio anterior */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-1.5">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          <p className="text-center font-mono text-[11px] tracking-wide">
            Aceptamos tarjetas y meses sin intereses con tarjetas participantes
          </p>
        </div>
      </div>

      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          <Marca />

          <nav
            aria-label="Navegación principal"
            className="ml-4 hidden items-center gap-1 md:flex"
          >
            <Button variant="ghost" asChild className="text-sm font-medium">
              <Link href="/">Inicio</Link>
            </Button>
            <NavMarcas />
            <Button variant="ghost" asChild className="text-sm font-medium">
              <Link href="/calculadora">Calculadora</Link>
            </Button>
            <Button variant="ghost" asChild className="text-sm font-medium">
              <Link href="/#nosotros">Nosotros</Link>
            </Button>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <CarritoSheet />
            <Button
              asChild
              className="hidden bg-[var(--pse-green)] text-white hover:bg-[var(--pse-green)]/85 sm:inline-flex"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                <WhatsappLogoIcon className="size-4" weight="fill" />
                Cotiza sin costo
              </a>
            </Button>

            <Sheet open={menuAbierto} onOpenChange={setMenuAbierto}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú">
                  <ListIcon className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[86vw] max-w-sm">
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>
                </SheetHeader>
                <nav
                  aria-label="Navegación principal"
                  className="flex flex-col gap-1 px-4 pb-6"
                >
                  <Link
                    href="/"
                    onClick={() => setMenuAbierto(false)}
                    className="rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
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
                      className="rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
                    >
                      {enlace.etiqueta}
                    </Link>
                  ))}

                  <Button
                    asChild
                    className="mt-4 bg-[var(--pse-green)] text-white hover:bg-[var(--pse-green)]/85"
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
      </div>
    </header>
  );
}
