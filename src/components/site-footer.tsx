import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import { CATALOGO, MARCAS, MARCA_SLUG } from "@/lib/catalogo";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { Separator } from "@/components/ui/separator";

const TELEFONO = "55 4986 8279";
const TELEFONO_HREF = "tel:+525549868279";
const CORREO = "contacto@psepowerbatteries.com";

const MARCAS_FOOTER = MARCAS.map((marca) => ({
  marca,
  href: `/baterias/${MARCA_SLUG[marca]}`,
  modelos: CATALOGO.filter((b) => b.marca === marca).length,
}));

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/media/logo-ps-final-1-03.png"
              alt="PSE Power Batteries"
              width={36}
              height={36}
              className="size-9 w-auto"
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
          <p className="text-sm text-muted-foreground">
            Proyectos y Sistemas en Energía S.A. de C.V. Baterías selladas
            VRLA/AGM para equipo médico, sistemas de emergencia,
            telecomunicaciones y movilidad eléctrica.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Aceptamos tarjetas · Meses sin intereses con tarjetas participantes
          </p>
        </div>

        <nav aria-label="Catálogo por marca" className="flex flex-col gap-3">
          <h2 className="font-heading text-sm uppercase tracking-[0.16em] text-muted-foreground">
            Catálogo
          </h2>
          <ul className="flex flex-col gap-2 text-sm">
            {MARCAS_FOOTER.map(({ marca, href, modelos }) => (
              <li key={marca}>
                <Link
                  href={href}
                  className="flex items-center justify-between gap-4 hover:text-primary"
                >
                  <span>{marca}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {modelos} modelos
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/baterias" className="font-medium text-primary">
                Ver todo el catálogo
              </Link>
            </li>
            <li>
              <Link href="/calculadora" className="hover:text-primary">
                Calculadora de respaldo
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-sm uppercase tracking-[0.16em] text-muted-foreground">
            Contacto
          </h2>
          <div className="flex flex-col gap-2 font-mono text-sm">
            <a href={TELEFONO_HREF} className="flex items-center gap-2 hover:text-primary">
              <PhoneIcon className="size-4" />
              {TELEFONO}
            </a>
            <a href={`mailto:${CORREO}`} className="flex items-center gap-2 hover:text-primary">
              <EnvelopeSimpleIcon className="size-4" />
              {CORREO}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2 text-[var(--pse-green)] hover:underline"
            >
              <WhatsappLogoIcon className="size-4" weight="fill" />
              WhatsApp
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Los precios se cotizan por WhatsApp: arma tu pedido en el carrito y
            te confirmamos existencia y precio al momento.
          </p>
        </div>
      </div>

      <Separator />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} PSE Power Batteries
        </p>
      </div>
    </footer>
  );
}
