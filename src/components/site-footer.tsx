/* Hallmark · genre: atmospheric · footer: Ft5 statement · design-system: design.md · designed-as-app */
import Image from "next/image";
import Link from "next/link";
import {
  EnvelopeSimpleIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import { CATALOGO, MARCAS, MARCA_SLUG } from "@/lib/catalogo";
import { WHATSAPP_URL } from "@/lib/whatsapp";

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
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--color-paper-2)]">
      {/* Ft5 · the statement */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-10 sm:pt-20">
        <p className="hm-eyebrow">Proyectos y Sistemas en Energía</p>
        <p className="hm-display mt-4 max-w-3xl text-3xl sm:text-4xl">
          La batería correcta llega cuando el equipo{" "}
          <span className="border-b-2 border-[var(--color-accent)] pb-0.5">
            no puede apagarse
          </span>
          .
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 border-t border-[var(--border)] px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold text-[var(--color-ink)]">
            <Image
              src="/media/logo-pse-hex.png"
              alt="PSE Power Batteries"
              width={44}
              height={39}
              className="h-9 w-auto"
            />
            PSE
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-2)]">
              Power Batteries
            </span>
          </Link>
          <p className="max-w-sm text-sm text-[var(--color-ink-2)]">
            Distribuidor de baterías selladas VRLA/AGM para equipo médico,
            sistemas de emergencia, telecomunicaciones y movilidad eléctrica.
            Más de 30 años.
          </p>
          <p className="font-mono text-xs text-[var(--color-ink-2)]">
            Aceptamos tarjetas · Meses sin intereses con tarjetas participantes
          </p>
        </div>

        <nav aria-label="Catálogo por marca" className="flex flex-col gap-3">
          <h2 className="hm-eyebrow text-[var(--color-ink-2)]">Catálogo</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {MARCAS_FOOTER.map(({ marca, href, modelos }) => (
              <li key={marca}>
                <Link
                  href={href}
                  className="flex items-center justify-between gap-4 text-[var(--color-ink)] hover:text-[var(--color-accent)]"
                >
                  <span>{marca}</span>
                  <span className="font-mono text-xs tabular-nums text-[var(--color-ink-2)]">
                    {modelos}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/baterias" className="font-medium text-[var(--color-royal)] hover:underline">
                Ver todo el catálogo
              </Link>
            </li>
            <li>
              <Link href="/calculadora" className="text-[var(--color-ink)] hover:text-[var(--color-accent)]">
                Calculadora de respaldo
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <h2 className="hm-eyebrow text-[var(--color-ink-2)]">Contacto</h2>
          <div className="flex flex-col gap-2 font-mono text-sm">
            <a href={TELEFONO_HREF} className="flex items-center gap-2 text-[var(--color-ink)] hover:text-[var(--color-accent)]">
              <PhoneIcon className="size-4" />
              {TELEFONO}
            </a>
            <a href={`mailto:${CORREO}`} className="flex items-center gap-2 text-[var(--color-ink)] hover:text-[var(--color-accent)]">
              <EnvelopeSimpleIcon className="size-4" />
              {CORREO}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--color-wa)] hover:underline"
            >
              <WhatsappLogoIcon className="size-4" weight="fill" />
              WhatsApp
            </a>
          </div>
          <p className="text-sm text-[var(--color-ink-2)]">
            Los precios se cotizan por WhatsApp: arma tu pedido en el carrito y
            te confirmamos existencia al momento.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-[var(--border)] px-4 py-6">
        <p className="font-mono text-xs text-[var(--color-ink-2)]">
          © {new Date().getFullYear()} PSE Power Batteries · Proyectos y Sistemas en Energía S.A. de C.V.
        </p>
      </div>
    </footer>
  );
}
